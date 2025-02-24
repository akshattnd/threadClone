import { Request, Response } from "express";
import { User } from "../models/userModel";
import bcrypt from "bcrypt";
import { sign } from "jsonwebtoken"
import formidable from "formidable";
import { cloudinary } from '../config/cloudinary'


export const signin = async (req: Request, res: Response): Promise<any> => {
    try {

        const { username, email, password } = req.body;
        if (!username || !email || !password) {
            return res.status(400).json({ msg: "Username, email, and password are required!" });

        }


        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ msg: "User is already registered! Please log in." });

        }
        const hashedPassword = await bcrypt.hash(password, 11);
        if (!hashedPassword) {
            return res.status(500).json({ msg: "Error hashing password!" });

        }

        const newUser = new User({
            username,
            email,
            password: hashedPassword,
        });

        const savedUser = await newUser.save();
        const jwtSecret = process.env.JWT_SECRET;
        if (!jwtSecret) {
            return res.status(500).json({ msg: "JWT secret is missing in environment variables!" });

        }

        const token = sign({ token: savedUser._id }, jwtSecret, {
            expiresIn: "15d"
        });
        if (!token) {
            return res.send(500).json({ msg: "error genrationg token" });
        }
        res.cookie("token", token, {
            maxAge: 1000 * 3600 * 24 * 3,
            httpOnly: true,
            sameSite: "none",
            secure: true,
            partitioned: true,
        })
        res.status(201).json({ msg: "User sign in successfully!" })
    } catch (err) {

        res.status(500).json({
            msg: "Internal server error during sign-up!",
            error: err instanceof Error ? err.message : String(err),
        });
    }
}

export const login = async (req: Request, res: Response): Promise<any> => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ msg: "email and password are required" });

        }
        const existingUser = await User.findOne({ email }).select("+password");
        if (!existingUser) {
            return res.status(400).json({ msg: "please sign in first!" });

        }
        const comparePassword = await bcrypt.compare(password, existingUser.password);
        if (!comparePassword) {

            return res.status(400).json({ msg: "incorrect password!" });

        }
        const jwtSecret = process.env.JWT_SECRET;
        if (!jwtSecret) {
            return res.status(500).json({ msg: "JWT secret is missing in environment variables!" });

        }
        const token = sign({ token: existingUser._id }, jwtSecret, {
            expiresIn: "15d"
        });
        if (!token) {
            return res.send(500).json("error creating token");

        }
        res.cookie("token", token, {
            maxAge: 1000 * 3600 * 24, // 1 day
            httpOnly: true, // ✅ Prevents XSS attacks
            secure: process.env.NODE_ENV === "production", // ✅ Only true in production (HTTPS)
            sameSite: "lax", // ✅ Ensures cookies work properly

        });
        res.status(201).json({ msg: "Login successfull!" });

    } catch (err) {
        res.status(500).json({
            msg: "Internal server error during login!",
            error: err instanceof Error ? err.message : String(err),
        });
    }

}

export const userDetails = async (req: Request, res: Response): Promise<any> => {
    try {

        const { id } = req.params;
        if (!id) {
            return res.status(400).json({ msg: "id is required!" })

        }
        const user = await User.findById(id).populate("followers").populate('replies').populate({
            path: "threads",
            populate: [{ path: "likes" }, { path: "comments" }, { path: "admin" }]
        }).populate({
            path: "replies", populate: { path: "admin" }
        }).populate(
            {
                path: "reposts", populate: [{ path: "likes" }, { path: "comments" }, { path: "admin" },]
            }
        );
        res.status(201).json({ msg: "user details fetched", user });

    } catch (err) {
        res.status(500).json({
            msg: " Error in fetching details user details!",
            error: err instanceof Error ? err.message : String(err),
        });
    }

}

export const followUser = async (req: Request, res: Response): Promise<any> => {
    try {
        const { id } = req.params;
        if (!id) {
            return res.status(400).json({ msg: "Id is required! " });

        }
        const existingUser = await User.findById(id);
        if (!existingUser) {
            return res.status(400).json({ msg: "User doesn't exist!" });

        }
        if (!req.user) {

            return res.status(500).json({
                msg: "Error while following user",
            })

        }
        const userId = req.user!._id;
        if (existingUser.followers.includes(userId)) {
            await User.findByIdAndUpdate(existingUser._id, {
                $pull: { followers: userId }
            },
                { new: true },
            );
            res.status(201).json({ msg: `unfollwed ${existingUser.username}` });
        } else {
            await User.findByIdAndUpdate(existingUser._id, {
                $push: { followers: userId }
            },
                { new: true },
            );
            res.status(201).json({ msg: `following ${existingUser.username}` });
        }

    } catch (err) {
        res.status(500).json({
            msg: "Error while following user",
            err: err instanceof Error ? err.message : String(err),
        })
    }
}
export const updateProfile = async (req: Request, res: Response): Promise<any> => {
    try {
        const existingUser = await User.findById(req.user!._id);
        if (!existingUser) {
            return res.status(400).json({ msg: "No such user !" });

        }
        const form = formidable({});
        form.parse(req, async (err, fields, files: any) => {
            if (err) {
                return res.status(400).json({ msg: "Error in formidable !", err: err });


            }
            if (fields.text) {
                await User.findByIdAndUpdate(
                    req.user!._id,
                    { bio: fields.text },
                    { new: true }
                );
            }
            if (files.media) {
                if (existingUser.public_id) {
                    await cloudinary.uploader.destroy(
                        existingUser.public_id,
                        (error, result) => {
                            console.log({ error, result });
                        }
                    );
                }

                if (files.media!.filepath) {
                    const uploadedImage = await cloudinary.uploader.upload(
                        files.media.filepath,
                        { folder: "threads/profiles" }
                    );
                    if (!uploadedImage) {
                        return res.status(400).json({ msg: "Error while uploading pic !" });
                    }

                    await User.findByIdAndUpdate(
                        req.user!._id,
                        {
                            profilePic: uploadedImage.secure_url,
                            public_id: uploadedImage.public_id,
                        },
                        { new: true }
                    );
                }

            }
        });
        res.status(201).json({ msg: "Profile updated successfully !" });
    } catch (err) {
        res.status(400).json({ msg: "Error in updateProfile !", err: err instanceof Error ? err.message : String(err) });
    }
};
export const searchUser = async (req: Request, res: Response): Promise<any> => {
    try {
        const { query } = req.params;
        const user = await User.find({
            $or: [{ username: { $regex: query, $options: "i", } }, { email: { $regex: query, $options: "i", } }],
        }).select("-password");
        res.status(200).json({
            msg: "Successfull search!", user
        });
    } catch (err) {
        res.status(500).json({ msg: "Error while searching user!", err: err instanceof Error ? err.message : String(err), });
    }
};
export const logout = async (req: Request, res: Response): Promise<any> => {
    try {
        res.cookie("token", "", {
            maxAge: 0,
            httpOnly: true,
            sameSite: "none",
            secure: true,
            partitioned: true,
        });
        res.status(200).json({ msg: "logout successful" });

    } catch (err) {
        res.status(500).json({ msg: "Unable to logout!", err: err instanceof Error ? err.message : String(err), });
    }
};
export const myProfile = async (req: Request, res: Response): Promise<any> => {
    try {
        const user = req.user!;
        res.status(200).json({ msg: "successfull!", user });
    } catch (err) {
        res.status(500).json({ msg: "Unable to fetch user info!", err: err instanceof Error ? err.message : String(err), });
    }
};
