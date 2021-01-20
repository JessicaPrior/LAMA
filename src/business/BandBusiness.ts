import { BandInputDTO } from "../model/Band";
import { IdGenerator } from "../services/IdGenerator";
import { AuthenticationData, Authenticator } from "../services/Authenticator";
import { BaseError } from "../error/BaseError";
import { BandDatabase } from "../data/BandDatabase";

export class BandBusiness {
    public async createBand(band: BandInputDTO, user: any) {
        try {

            const authenticator = new Authenticator();

            const verifyToken = authenticator.getData(user.token)

            if (!band.name || !band.genre || !band.responsible) {
                throw new BaseError("Missing input", 422);
            }

            if (verifyToken.role === 'NORMAL') {
                throw new BaseError("Not authorized", 401);
            }

            const idGenerator = new IdGenerator();
            const id = idGenerator.generate();

            const bandDatabase = new BandDatabase();
            await bandDatabase.createBand(id, band.name, band.genre, band.responsible);

            const accessToken = authenticator.generateToken({ id, role: verifyToken.role });

            return accessToken;
        } catch (error) {
            if (error.message.includes("for key 'email'")) {
                throw new BaseError("Email already in use", 409)
            }
        }
    }

    public async bandDetails(input: any) {
        try {
            
            const bandDatabase = new BandDatabase();
            const band = await bandDatabase.getBandDetails(input);

            if (!input.id) {
                throw new BaseError("invalid-id", 401)
            }

            if (!band) {
                throw new BaseError("Band not found", 404);
            }

            return {
                id: band.getId(),
                name: band.getName(),
                genre: band.getGenre(),
                responsible: band.getResponsible()
            }
        } catch (error) {
            throw new BaseError(error.statusCode, error.message)
        }
    }
}