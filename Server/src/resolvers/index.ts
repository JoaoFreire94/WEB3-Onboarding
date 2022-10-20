import { allUsers, getUser, insertUser, tokenFromUser, userExist } from "../controlers";
import { Arg, Mutation, Query, Resolver } from "type-graphql";
import { v4 as uuidv4 } from 'uuid';

@Resolver()
export class Resolvers {


    @Query(() => String)
    async me(
        @Arg("token") token: string,
    ) {
        const user = await getUser(token).catch((err) => { console.log(err) });
        if (user && user.name) {
            return user.name
        }
        else {
            throw new Error("User not found!")
        }
    }

    @Query(() => String)
    async login(
        @Arg("ethSignature") ethSignature: string,
    ) {
        const user = await tokenFromUser(ethSignature).catch((err) => { console.log(err) });
        if (user && user.token) {
            return user.token
        }
        else {
            throw new Error("User not found!")
        }

    }

    @Query(() => String)
    async getAllUsers() {
        const test = await allUsers().catch((err) => console.log(err))
        return test;
    }


    @Mutation(() => String)
    async createUser(
        @Arg("name") name: string,
        @Arg("email") email: string,
        @Arg("ethSignature") ethSignature: string,
    ) {

        const user = await userExist(email);
        if (user) {
            throw new Error("Adress taken!")
        } else {
            const token = uuidv4()
            insertUser({ name, email, ethSignature, token })
            return (token)
        }

    }
}



