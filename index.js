const express = require("express");
const dotenv = require("dotenv");
dotenv.config({ path: "./configuration/.env" });

require("../nodeapi/db/config");

const auth = require("./router/user/authRouter");
const userPublic = require("./router/user/publicRouter");
const commen= require("./router/commenRouter");
const adminRouter = require("./router/admin/adminauth");
const test= require("./router/testRouter");

//Admin side
// const admin = require("./router/admin/AdminCreate");
// const projectManager = require("./router/admin/projectManager");
// const forget_password = require("../nodeapi/router/forget_password");
// const reset_password = require("../nodeapi/router/reset_password");

const cors = require("cors");

const app = express();
const PORT = process.env.PORT;

app.use(cors({ Origin: "*" }));
app.use(express.json());

console.log("=== Appllication Started. ===");

app.use("/", auth); // Singin and Login Router...
app.use("/", userPublic);
app.use("/",commen);
app.use("/admin", adminRouter);
app.use("/",test);

// app.use("/",  forget_password);
// app.use("/",  reset_password);

// //admin side
// app.use("/", middleware, projectManager);

app.listen(PORT, () => {
  console.log(`${PORT} Connected`);
});
