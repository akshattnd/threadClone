import { Request, Response } from "express"
import { User } from "../models/userModel"
import { Post } from "../models/postModel"
import { Comment } from "../models/commentModel"
export const addComment = async (req: Request, res: Response): Promise<any> => {
    try {

        const { id } = req.params;
        const { text } = req.body;
        if (!id) {
            return res.status(400).json({ msg: "Id is required!" });
        }
        if (!text) {
            return res.status(400).json({ msg: "Comment text is required!" });

        }
        const existingPost = await Post.findById(id);
        if (!existingPost) {
            return res.status(400).json({ msg: "No post exist with this id!" });
        }
        // existingPost._id == id
        const comment = new Comment(
            { text, admin: req.user!._id, post: id }
        );
        const newComment = await comment.save();
        await User.findByIdAndUpdate(req.user!._id, { $push: { replies: newComment._id } }, { new: true });
        await Post.findByIdAndUpdate(existingPost._id, { $push: { comments: newComment._id } }, { new: true });
        return res.status(201).json({ msg: "Commented!", newComment });
    } catch (err) {
        return res.status(500).json({ msg: "Erorr while commenting!", err: err instanceof Error ? err.message : String(err) });
    }

}
export const deleteComment = async (req: any, res: Response): Promise<any> => {
    try {
        const { id } = req.params;
        if (!id) {
            return res.status(400).json({ msg: "Id is required!" });
        }
        const existingComment = await Comment.findById(id);
        if (!existingComment) {
            return res.status(400).json({ msg: "No comment exist with this id!" });
        }
        if (!existingComment.post) {
            return res.status(201).json({ msg: "no such post exist to delete!" });
        }
        if (req.user._id != existingComment.admin) {
            res.status(400).json({ msg: "you are not authorized to delete this comment!" });
        }
        await User.findByIdAndUpdate(req.user._id, { $pull: { replies: id } }, { new: true });
        await Post.findByIdAndUpdate(existingComment.post, { $pull: { comments: id } }, { new: true });
        await Comment.findByIdAndDelete(id);
        return res.status(200).json({ msg: "Comment deleted!" });
    } catch (err) {
        return res.status(500).json({ msg: "Erorr while deleting comment!", err: err instanceof Error ? err.message : String(err) });
    }

}