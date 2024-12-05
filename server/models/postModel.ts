import { Schema, model, Document, Types } from "mongoose";
interface IPost extends Document {
    admin: Types.ObjectId;
    text?: string;
    media?: string;
    public_id?: string;
    likes: Types.ObjectId[];
    comments: Types.ObjectId[];
}

const postSchema = new Schema<IPost>({
    admin: {

        type: Schema.Types.ObjectId, ref: "User",
        require: true,
    },
    text: {
        type: String,
        trim: true
    },
    media: {
        type: String,
        default: "",
    },
    public_id: {
        type: String
    },
    likes: { type: [{ type: Schema.Types.ObjectId, ref: "User" }], default: [] },
    comments: { type: [{ type: Schema.Types.ObjectId, ref: "Comment" }], default: [] }


}, { timestamps: true });
export const Post = model<IPost>("Post", postSchema);
export { IPost };
