import { User } from "../model/User";
import BaseDataBase from "./BaseDatabase";

export class UserDatabase extends BaseDataBase {

  public async createUser(
    id: string,
    email: string,
    name: string,
    password: string,
    role: string
  ): Promise<void> {
    try {
      await BaseDataBase.connection
        .insert({
          id,
          email,
          name,
          password,
          role
        })
        .into(this.tableNames.users);
    } catch (error) {
      throw new Error(error.sqlMessage || error.message);
    }
  }

  public async getUserByEmail(email: string): Promise<any> {
    try {
      const result = await BaseDataBase.connection
        .select("*")
        .from(this.tableNames.users)
        .where({ email });



      return User.toUserModel(result[0]);
    } catch (error) {

    }
  }
}
