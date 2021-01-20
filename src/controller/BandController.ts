import { BandInputDTO } from "../model/Band";
import { Request, Response } from "express";
import { BandBusiness } from "../business/BandBusiness";
import  BaseDatabase  from "../data/BaseDatabase";
import { BaseError } from "../error/BaseError";

export class BandController {
    async createBand(req: Request, res: Response) {
        try {

            const band: BandInputDTO = {
                name: req.body.name,
                genre: req.body.genre,
                responsible: req.body.responsible
            }

            const user: any  = {
                token: req.headers.authorization as string
            }

            const bandBusiness = new BandBusiness();
            const token = await bandBusiness.createBand(band, user);

            res.status(200).send({ token });

        } catch (error) {
            res.status(400).send({ error: error.message });
        }

        await BaseDatabase.destroyConnection();
    }

    public async bandDetails(req: Request, res: Response){
        try {

            const input = {
                id: req.params.id,
                name: req.body.name
            }

           const bandBusiness = new BandBusiness();
           const result = await bandBusiness.bandDetails(input)
  
           res.status(200).send(result);
           
        } catch (error) {
           throw new BaseError(error.statusCode, error.message)
        }
     }
}