import { Request, Response } from "express";
import { ShowBusiness } from "../business/ShowBusiness";
import { Show, ShowInputDTO } from '../model/Show';

export class ShowController {
    async createShow(req: Request, res: Response) {
        try {
            const weekDay = Show.toShowDaysEnum(req.body.weekDay)

            const input: ShowInputDTO = {
                weekDay,
                bandId: req.body.bandId,
                startTime: req.body.startTime,
                endTime: req.body.endTime
            }

            const showBusiness = new ShowBusiness()

            await showBusiness.createShow(input, req.headers.authorization as string)

            res.status(200).send({ message: "Successful show creation" });

        } catch (error) {
            res.status(400).send({ error: error.message });
        }
    }

    async getShowsByDay(req: Request, res: Response) {
        try {
            const weekDay = Show.toShowDaysEnum(req.query.weekDay as string)

            const showBusiness = new ShowBusiness()

            const shows = await showBusiness.getShowsByDay(weekDay)

            res.status(200).send({ shows });
        } catch (error) {
            res.status(400).send({ error: error.message });
        }
    }
}