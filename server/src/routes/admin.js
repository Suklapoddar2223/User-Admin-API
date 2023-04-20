
const session = require("express-session")
const adminRouter = require("express").Router();


const dev = require("../config");
const { isLoggedIn, isLoggedOut } = require("../middleware/auth");
const { logoutAdmin, loginAdmin, getUsersNotAdmin, updateUserByAdmin, deleteUserByAdmin, usersExportedByAdmin } = require("../controllers/admin");
const upload = require("../middleware/fileUpload");
const { registerUser } = require("../controllers/user");
const { isAdmin } = require("../middleware/isAdmin");

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
    adminRouter.post("/register" ,upload.single('image'), registerUser);
    adminRouter.get("/dashboard" , isLoggedIn,getUsersNotAdmin);
    adminRouter.put("/dashboard/:id" , isLoggedIn,isAdmin,updateUserByAdmin);
    adminRouter.delete("/dashboard/:id" , isLoggedIn,isAdmin,deleteUserByAdmin);
    adminRouter.delete("/dashboard/export-data" , isLoggedIn,isAdmin,usersExportedByAdmin);









module.exports= adminRouter;