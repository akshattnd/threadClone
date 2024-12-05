
import { Schema, model, Document, Types } from "mongoose";
interface IComment extends Document {
    admin: Types.ObjectId;
    post: Types.ObjectId;
    text?: string;
}
const commentSchema = new Schema<IComment>({
    admin: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    post: {
        type: Schema.Types.ObjectId,
        ref: "Post"
    },
    text: {
        type: String,

    }

}, { timestamps: true });
export const Comment = model<IComment>("Comment", commentSchema);
export { IComment };