import { Request, Response } from "express"
import { User } from "../models/userModel"
import { Post } from "../models/postModel"
import { Comment } from "../models/commentModel"
import { Types } from "mongoose"
export const addComment = async (req: Request, res: Response): Promise<any> => {
    try {
        const { id } = req.params;
        const { text } = req.body;
        if (!id) {
            return res.status(400).json({ msg: "id is required !" });
        }
        if (!text) {
            return res.status(400).json({ msg: "No comment is added !" });
        }
        const postExists = await Post.findById(id);
        if (!postExists) {
            return res.status(400).json({ msg: "No such post !" });
        }
        const comment = new Comment({
            text,
            admin: req.user!._id,
            post: postExists._id,
        });
        const newComment = await comment.save();
        await User.findByIdAndUpdate(
            req.user!._id,
            {
                $push: { replies: newComment._id },
            },
            { new: true }
        );
        await Post.findByIdAndUpdate(
            postExists._id,
            {
                $push: { comments: newComment._id },
            },
            { new: true }
        );

        res.status(201).json({ msg: "Commented !" });
    } catch (err) {
        return res.status(500).json({ msg: "Erorr while commenting!", err: err instanceof Error ? err.message : String(err) });
    }

}
export const deleteComment = async (req: any, res: Response): Promise<any> => {
    try {
        const { postId, id } = req.params;
        if (!postId || !id) {
            return res.status(400).json({ msg: "Error in deleteComment !" });
        }
        const postExists = await Post.findById(postId);
        if (!postExists) {
            return res.status(400).json({ msg: "No such post !" });
        }
        const commentExists = await Comment.findById(id);
        if (!commentExists) {
            return res.status(400).json({ msg: "No such comment !" });
        }
        const newId = new Types.ObjectId(id);
        if (postExists.comments.includes(newId)) {
            const id1 = commentExists.admin._id.toString();
            const id2 = req.user._id.toString();
            if (id1 !== id2) {
                return res
                    .status(400)
                    .json({ msg: "You are not authorized to delete the comment !" });
            }
            await Post.findByIdAndUpdate(
                postId,
                {
                    $pull: { comments: id },
                },
                { new: true }
            );
            await User.findByIdAndUpdate(
                req.user._id,
                {
                    $pull: { replies: id },
                },
                { new: true }
            );
            await Comment.findByIdAndDelete(id);
            return res.status(201).json({ msg: "Comment deleted!" });
        }
        res.status(201).json({ msg: "This post does not include the comment !" });
    } catch (err) {
        return res.status(500).json({ msg: "Erorr while deleting comment!", err: err instanceof Error ? err.message : String(err) });
    }

}