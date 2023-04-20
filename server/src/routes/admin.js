const formidable = require("express-formidable");
const session = require("express-session")
const adminRouter = require("express").Router();


const dev = require("../config");
const { isLoggedIn, isLoggedOut } = require("../middleware/auth");
const { logoutAdmin, loginAdmin, getUsersNotAdmin } = require("../controllers/admin");

adminRouter.use(
    session({
    name: 'admin_name',
    secret: dev.app.sessionSecretKey || "jndkjnkjdfo",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false, maxAge: 10 * 60000 }, // for http use secure: true
    }))


    adminRouter.post("/login" , isLoggedOut, loginAdmin);
    adminRouter.get("/logout" , isLoggedIn,logoutAdmin);
    adminRouter.get("/dashboard" , isLoggedIn,getUsersNotAdmin);







module.exports= adminRouter;