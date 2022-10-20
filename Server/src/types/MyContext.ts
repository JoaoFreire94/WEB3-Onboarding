import { Request, Response } from "express"
import { User } from "../entity/User"

export interface MyContext {
    readonly req: Request
    readonly res: Response
    user?: User
}
