import { UserInputDTO, LoginInputDTO } from "../model/User";
import { UserDatabase } from "../data/UserDatabase";
import { IdGenerator } from "../services/IdGenerator";
import { HashManager } from "../services/HashManager";
import { Authenticator } from "../services/Authenticator";
import { BaseError } from "../error/BaseError";

export class UserBusiness {

    public async createUser(user: UserInputDTO) {
        try {
            if (!user.name || !user.email || !user.password || !user.role) {
                throw new BaseError("Missing input", 422);
            }

            if (user.email.indexOf("@") === -1) {
                throw new BaseError("Invalid email", 422);
            }

            if (user.password.length < 6) {
                throw new BaseError("Invalid password", 422);
            }

            const idGenerator = new IdGenerator();
            const id = idGenerator.generate();

            const hashManager = new HashManager();
            const hashPassword = await hashManager.hash(user.password);

            const userDatabase = new UserDatabase();
            await userDatabase.createUser(id, user.email, user.name, hashPassword, user.role);

            const authenticator = new Authenticator();
            const accessToken = authenticator.generateToken({ id, role: user.role });

            return accessToken;
        } catch (error) {
            if (error.message.includes("for key 'email'")) {
                throw new BaseError("Email already in use", 409)
            }
        }
    }

    public async getUserByEmail(user: LoginInputDTO) {
        try {
            if (!user.email || !user.password) {
                throw new BaseError("Missing input",422);
             }

             if (!user) {
                throw new BaseError("Invalid credentials", 401);
             }

            const userDatabase = new UserDatabase();
            const userFromDB = await userDatabase.getUserByEmail(user.email);

            const hashManager = new HashManager();
            const hashCompare = await hashManager.compare(user.password, userFromDB.getPassword());

            if (!hashCompare) {
                throw new BaseError("Invalid credentials", 401);
             }

            const authenticator = new Authenticator();
            const accessToken = authenticator.generateToken({ id: userFromDB.getId(), role: userFromDB.getRole() });

            if (!hashCompare) {
                throw new BaseError("Invalid Password!", 422);
            }

            return accessToken;
        } catch (error) {
            throw new BaseError(error.statusCode, error.message)
        }
    }
}