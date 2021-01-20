// import { UserBusiness } from "../src/business/UserBusiness"

// describe("Signup", () => {
//     const idGenerator = { generate: jest.fn() } as any
//     const hashGenerator = { hash: jest.fn() } as any
//     const tokenGenerator = { generate: jest.fn() } as any
//     const userDatabase = { createUser: jest.fn() } as any

//     const userBusiness: UserBusiness = new UserBusiness.(
//         idGenerator,
//         hashGenerator,
//         Authenticator,
//         userDatabase
//     )

//     test("Error when 'name' is empty", async () => {
//         expect.assertions(2)

//         try {
//             await userBusiness.createUser(
//                 "Alice",
//                 "alice@lbn.com",
//                 "123456",
//                 "ADMIN"
//             )
//         } catch (error) {
//             expect(error.statusCode).toBe(422)
//             expect(error.message).toBe("Missing input")
//         }
//     })

//     test("Error when 'email' is empty", async () => {
//         expect.assertions(2)

//         try {
//             await userBusiness.signup(
//                 "Alice",
//                 "",
//                 "123456",
//                 "ADMIN"
//             )
//         } catch (error) {
//             expect(error.statusCode).toBe(422)
//             expect(error.message).toBe("Missing input")
//         }
//     })

//     test("Error when 'password' is empty", async () => {
//         expect.assertions(2)

//         try {
//             await userBusiness.signup(
//                 "Alice",
//                 "alice@lbn.com",
//                 "",
//                 "ADMIN"
//             )
//         } catch (error) {
//             expect(error.statusCode).toBe(422)
//             expect(error.message).toBe("Missing input")
//         }
//     })

//     test("Error when 'role' is empty", async () => {
//         expect.assertions(2)

//         try {
//             await userBusiness.signup(
//                 "Alice",
//                 "alice@lbn.com",
//                 "123456",
//                 ""
//             )
//         } catch (error) {
//             expect(error.statusCode).toBe(422)
//             expect(error.message).toBe("Missing input")
//         }
//     })

//     test("Error when 'email' is invalid", async () => {
//         expect.assertions(2)

//         try {
//             await userBusiness.signup(
//                 "Alice",
//                 "alicelbn.com",
//                 "123456",
//                 "ADMIN"
//             )
//         } catch (error) {
//             expect(error.statusCode).toBe(422)
//             expect(error.message).toBe("Invalid email")
//         }
//     })

//     test("Error when 'password' is invalid", async () => {
//         expect.assertions(2)

//         try {
//             await userBusiness.signup(
//                 "Alice",
//                 "alice@lbn.com",
//                 "123",
//                 "ADMIN"
//             )
//         } catch (error) {
//             expect(error.statusCode).toBe(422)
//             expect(error.message).toBe("Invalid password")
//         }
//     })

//     test("Error when 'role' is invalid", async () => {
//         expect.assertions(2)

//         try {
//             await userBusiness.signup(
//                 "Alice",
//                 "alice@lbn.com",
//                 "123456",
//                 "ADMINISTRADOR"
//             )
//     } catch (error) {
//             expect(error.message).toBe("Invalid user role")
//             expect(error.statusCode).toBe(422)
//         }
//     })

//     test("Success case", async () => {
//         expect.assertions(0)

//         try {
//             const result = await userBusiness.signup(
//                 "Alices",
//                 "alice@lbn.com",
//                 "123456",
//                 "ADMIN"
//             )

//             expect(result.accessToken).toBeDefined()
//         } catch (error) {

//         }
//     })
// })