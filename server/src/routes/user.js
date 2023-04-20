const session = require("express-session");
const userRouter = require("express").Router();


const { 
    registerUser, 
    verifyEmail, 
    userProfile, 
    loginUser,
    logoutUser,
    deleteUser,
    updateUser,
    forgetPassword,
    resetPassword} = require("../controllers/user");
const dev = require("../config");
const { isLoggedIn, isLoggedOut } = require("../middleware/auth");
const upload = require("../middleware/fileUpload");

userRouter.use(
    session({
    name: 'user_name',
    secret: dev.app.sessionSecretKey || "jndkjnkjdfo",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false, maxAge: 10 * 60000 }, // for http use secure: true
    }))


userRouter.post("/register" ,upload.single('image'), registerUser);
userRouter.post("/verify-email" , verifyEmail);
userRouter.post("/login" , isLoggedOut, loginUser);
userRouter.get("/logout" , isLoggedIn,logoutUser);
userRouter.get("/" ,isLoggedIn, userProfile);
userRouter.delete("/" ,isLoggedIn, deleteUser);
userRouter.put("/" ,isLoggedIn,upload.single('image'), updateUser);
userRouter.post("/forget-password" ,isLoggedOut,forgetPassword);
userRouter.post("/reset-password" ,isLoggedOut,resetPassword);








module.exports= userRouter;