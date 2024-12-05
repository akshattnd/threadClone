import { Schema, model, Document, Types } from "mongoose";


export interface IUser extends Document {
    _id: Types.ObjectId;
    username: string;
    email: string;
    password: string;
    bio?: string;
    profileImg?: string;
    public_id?: string;
    followers: Types.ObjectId[];
    threads: Types.ObjectId[];
    replies: Types.ObjectId[];
    reposts: Types.ObjectId[];
}

const userSchema = new Schema<IUser>({
    username: {
        type: String,
        required: true,
        trim: true,

    }, email: {
        type: String,
        required: true,
        trim: true,
        unique: true,

    }, password: {
        type: String,
        required: true,
        select: false,
    },
    bio: {
        type: String,
    },
    profileImg: {
        type: String,
        default: "",
    },
    public_id: {
        type: String,
    },
    followers: {
        type: [{ type: Schema.Types.ObjectId, ref: "User" }],
        default: [],
    },
    threads: {
        type: [{ type: Schema.Types.ObjectId, ref: "Post" }],
        default: [],
    },
    replies: {
        type: [{ type: Schema.Types.ObjectId, ref: "Comment" }], default: [],
    },
    reposts: {
        type: [{ type: Schema.Types.ObjectId, ref: "Post" }],
        default: [],
    }
},
    { timestamps: true });
export const User = model<IUser>('User', userSchema);
