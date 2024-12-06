import { Router } from "express";
import { signin, login, userDetails, followUser, updateProfile, searchUser, logout, myProfile } from "../controllers/userController";
import { auth } from "../middleware/isAuth";
import { addPost, allPost, DeletePost, likePost, repost, singlePost } from "../controllers/postController";
import { addComment, deleteComment } from "../controllers/commentController";
const router = Router();
router.post("/signin", signin);
router.post("/login", login);
// user routes
router.post("/logout", auth, logout);
router.put("/update", auth, updateProfile);
router.get("/user/search/:query", auth, searchUser);
router.put("/user/follow/:id", auth, followUser);
router.get("/user/:id", auth, userDetails);
router.get("/profile", auth, myProfile);
// post routes
router.post("/post", auth, addPost);
router.delete("/post/:id", auth, DeletePost);
router.put("/post/like/:id", auth, likePost);
router.put("/repost/:id", auth, repost);
router.get("/post", auth, allPost);
router.get("/post/:id", auth, singlePost);
// comment routes
router.post("/comment/:id", auth, addComment);
router.delete("/comment/:postId/:id", auth, deleteComment);

export default router;