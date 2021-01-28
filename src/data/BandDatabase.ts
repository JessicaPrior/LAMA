import { Band } from "../model/Band";
import BaseDataBase from "./BaseDatabase";

export class BandDatabase extends BaseDataBase {

  public async createBand(
    id: string,
    name: string,
    music_genre: string,
    responsible: string
  ): Promise<void> {
    try {
      await BaseDataBase.connection
        .insert({
          id,
          name,
          music_genre,
          responsible
        })
        .into(this.tableNames.bands);
    } catch (error) {
      throw new Error(error.sqlMessage || error.message);
    }
  }

  public async getBandDetails(input: any): Promise<Band | undefined> {
    try {
      const result = await BaseDataBase.connection.raw(`
          SELECT * from ${this.tableNames.bands} WHERE id = '${input}' OR name = '${input.name}'
       `);
      return (result[0][0]);
    } catch (error) {
      throw new Error(error.sqlMessage || error.message)
    }
  }
}