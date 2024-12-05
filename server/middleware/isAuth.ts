
import { NextFunction, Request, Response } from "express";
import { User, IUser } from "../models/userModel";
import { verify } from "jsonwebtoken";
export interface ICookies {
    token?: string,
}
export const auth = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req.cookies.token;
        if (!token) {
            res.status(400).json({ msg: "no token in auth!" });
            return;
        }
        const jwtSecret = process.env.JWT_SECRET;
        if (!jwtSecret) {
            res.status(500).json({
                msg: "jwt secret is missing in .env file",
            })
            return;
        }
        const decodedToken = verify(token, jwtSecret) as { token: string };
        if (!decodedToken) {
            res.status(500).json({ msg: "error while decoding token in auth!" })
            return;
        }

        const user = await User.findById(decodedToken.token).select("+password").populate("followers").populate("threads")
            .populate("replies")
            .populate("reposts") as IUser;
        if (!user) {
            res.status(500).json({ msg: "error fetching data from db" })
            return;
        }
        req.user = user;

        next();

    } catch (err) {
        res.status(500).json({
            msg: "erorr whilie  authenticating",
            err: err instanceof Error ? err.message : String(err),
        });
        return;

    }
}