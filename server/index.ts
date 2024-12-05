import express from 'express';
import dotenv from 'dotenv';
import { dbConnect } from './config/db';
import router from './router/routes';
import bodyParser from 'body-parser';
import cookieParser, { signedCookies } from 'cookie-parser';
import { IUser } from "./models/userModel";
import { ICookies } from './middleware/isAuth';
import cors from "cors";
dotenv.config();
declare global {
    namespace Express {
        export interface Request {
            user?: IUser,
            cookie?: ICookies,
        }
    }
}
const app = express();

const port = process.env.PORT || 3000;
// app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
}))
app.use(bodyParser.json());

app.use(cookieParser());
app.use("/api", router);
app.get('/', (req, res) => {
    res.send('checking World');
});
dbConnect().then(() => {
    app.listen(port, () => {
        console.log(`Server is running on http://localhost:${port}`);
    });
})

