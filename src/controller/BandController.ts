import { bandDetails, BandInputDTO } from "../model/Band";
import { Request, Response } from "express";
import { BandBusiness } from "../business/BandBusiness";
import { BaseError } from "../error/BaseError";

export class BandController {
    async createBand(req: Request, res: Response) {
        try {
            
            const band: BandInputDTO = {
                name: req.body.name,
                music_genre: req.body.music_genre
            }
            
            const user: any  = {
                token: req.headers.authorization as string
            }

            const bandBusiness = new BandBusiness();
            await bandBusiness.createBand(band, user);

            res.status(200).send({ message: "Successful band creation" });

        } catch (error) {
            res.status(400).send({ error: error.message });
        }
    }

    public async bandDetails(req: Request, res: Response){
        try {

            const input: bandDetails = {
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