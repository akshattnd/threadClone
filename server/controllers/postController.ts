import { Request, Response } from "express"
import { User } from "../models/userModel"
import { Post } from "../models/postModel"
import { Comment } from "../models/commentModel"
import { cloudinary } from '../config/cloudinary'
import formidable from "formidable"
import mongoose from "mongoose"

export const addPost = async (req: any, res: Response): Promise<void> => {
    try {
        const form = formidable({});
        form.parse(req, async (err, fields, files: any) => {
            if (err) {
                return res.status(400).json({ msg: "Error while form parsing" });
            }
            const post = new Post();
            if (fields.text) {
                post.text = fields.text?.[0];
            }
            if (files.media) {

                if (files.media.filepath) {
                    const uploadedImg = await cloudinary.uploader.upload(files.media.filepath, { folder: "threads/posts", });
                    if (!uploadedImg) {
                        return res.status(500).json({ msg: "error while uploading pic" });
                    }
                    post.media = (uploadedImg).secure_url;
                    post.public_id = (uploadedImg).public_id
                }
            }

            post.admin = req.user._id;
            const newPost = await post.save();
            await User.findByIdAndUpdate(req.user._id, {
                $push: { threads: newPost._id },
            }, {
                new: true
            })
            res.status(201).json({ msg: "post created!", newPost })
        })

    } catch (err) {
        res.status(400).json({ msg: "Error while adding post!", err: err instanceof Error ? err.message : String(err) });
    }
}
export const allPost = async (req: Request, res: Response): Promise<void> => {
    try {
        const { page } = req.query;
        let pageNumber: any = page;
        if (!page || page == undefined) {
            pageNumber = 1;
        }
        const posts = await Post.find({}).sort({ createdAt: -1 }).skip((pageNumber - 1) * 3).limit(3).populate("admin").populate("likes").populate({
            path: "comments", populate: {
                path: "admin",
                model: "User",
            }
        });
        res.status(200).json({ msg: "success in getting post", posts });
    } catch (err) {
        res.status(400).json({ msg: "Error while getting posts!", err: err instanceof Error ? err.message : String(err) });
    }
}
export const DeletePost = async (req: any, res: Response): Promise<any> => {
    try {
        const { id } = req.params;
        if (!id) {
            return res.status(400).json({ msg: "Id is required!" });
        }
        const existingPost = await Post.findById(id);
        if (!existingPost) {
            return res.status(400).json({ msg: "Post not found!" });
        }
        const userId = req.user._id.toString();
        const adminId = (existingPost.admin).toString();

        if (userId != adminId) {
            return res.status(400).json({ msg: "You are not authorized to delete this post" });
        }
        if (existingPost.media && existingPost.public_id) {

            await cloudinary.uploader.destroy(existingPost.public_id, (err, result) => {
                console.log({ err, result });
            });
        }
        await Comment.deleteMany({ _id: { $in: existingPost.comments } });
        await User.updateMany({ $or: [{ threads: id }, { reposts: id }, { replies: id }] }, {
            $pull: {
                threads: id,
                reposts: id,
                replies: id
            }
        }, { new: true });
        await Post.findByIdAndDelete(id);
        res.status(200).json({ msg: "post deleted" });

    } catch (err) {
        res.status(400).json({ msg: "Error while deleting posts!", err: err instanceof Error ? err.message : String(err) });
    }
}
export const likePost = async (req: any, res: Response): Promise<any> => {
    try {
        const { id } = req.params;
        if (!id) {
            return res.status(400).json({ msg: "post id is required" });

        }
        const post = await Post.findById(id);
        if (!post) {
            return res.status(400).json({ msg: "post doesnot exist!" });
        }
        if (post.likes.includes(req.user._id)) {
            await Post.findByIdAndUpdate(id, { $pull: { likes: req.user._id } }, { new: true });
            res.status(200).json({ msg: "unliked posts!" });
        } else {
            await Post.findByIdAndUpdate(id, { $push: { likes: req.user._id } }, { new: true });
            res.status(200).json({ msg: "liked posts!" });
        }
    } catch (err) {
        res.status(400).json({ msg: "Error while liking posts!", err: err instanceof Error ? err.message : String(err) });
    }
}
export const repost = async (req: any, res: Response): Promise<any> => {
    try {
        const { id } = req.params;
        if (id) {
            const post = await Post.findById(id);
            if (!post) {
                return res.status(400).json({ msg: "no post exist" });
            }
            const newId = new mongoose.Types.ObjectId(id);
            if (req.user.reposts.includes(newId)) {
                return res.status(400).json({ msg: "post is already been reposted!" });
            }
            await User.findByIdAndUpdate(req.user._id, {
                $push: {
                    reposts: post._id,
                }
            }, { new: true });
            return res.status(200).json({ msg: "reposted" });
        } else {
            return res.status(400).json({ msg: "post id is required" });
        }
    } catch (err) {
        res.status(400).json({ msg: "Error while reposting!", err: err instanceof Error ? err.message : String(err) });
    }
}
export const singlePost = async (req: Request, res: Response): Promise<any> => {
    try {
        const { id } = req.params;

        if (!id) {
            res.status(400).json({ msg: "id is required" });
        }
        const post = await Post.findById(id).populate("admin").populate("likes").populate({ path: "comments", populate: [{ path: "admin" }, "text", { path: "post" }] });
        if (!post) {
            return res.status(400).json({ msg: "post with this id doesn't exist!" });
        }
        res.status(200).json({ msg: "post fetched!", post });

    } catch (err) {
        res.status(500).json({ msg: "Unable to fetch post!", err: err instanceof Error ? err.message : String(err) });
    }
}