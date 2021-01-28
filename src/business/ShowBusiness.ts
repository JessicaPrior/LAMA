import { BaseError } from "../error/BaseError";
import { ShowInputDTO, SHOW_DAYS } from '../model/Show';
import { Authenticator } from "../services/Authenticator";
import { UserRole } from '../model/User';
import { BandDatabase } from '../data/BandDatabase';
import { ShowDataBase } from "../data/ShowDatabase";
import { IdGenerator } from '../services/IdGenerator';

export class ShowBusiness {
    public createShow = async (input: ShowInputDTO, token: string): Promise<any> => {
        try {

            const bandDatabase = new BandDatabase();
            const showDatabase = new ShowDataBase();
            const authenticator = new Authenticator();


            const verifyToken = authenticator.getData(token)
           
            const band = await bandDatabase.getBandDetails(input.bandId)
            
            if (verifyToken.role !== UserRole.ADMIN) {
                throw new BaseError("Not authorized", 401);
            }

            if (!input.bandId || !input.weekDay || !input.startTime || !input.endTime) {
                throw new BaseError("Missing show input", 422);
            }

            if (!band) {
                throw new BaseError("Band not found", 404);
            }

            if (input.startTime < 8 || input.endTime > 23 || input.startTime >= input.endTime) {
                throw new BaseError("Invalid times input", 422);
            }

            if (!Number.isInteger(input.startTime) || !Number.isInteger(input.endTime)) {
                throw new BaseError("Invalid times format", 422);
            }

            const createdShows = await showDatabase.getShowsByTimes(input.startTime, input.endTime, input.weekDay)

            if (createdShows.length) {
                throw new BaseError("There are no more times to join", 400);
            }

            const idGenerator = new IdGenerator();
            const id = idGenerator.generate();

            await showDatabase.createShow(id, input.weekDay, input.startTime, input.endTime, input.bandId)

        } catch (error) {
            throw new BaseError(error.message, error.statusCode);

        }
    }

    public getShowsByDay = async (weekDay: SHOW_DAYS) => {

        if (!weekDay) {
            throw new BaseError("Invalid week day input", 422);
        }
        const showDatabase = new ShowDataBase();

        const shows = await showDatabase.getShowsByDay(weekDay)

        return { result: shows }
    }
}

export const showBusiness: ShowBusiness = new ShowBusiness()