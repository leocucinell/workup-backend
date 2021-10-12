/* SECTION: External modules */
const express = require("express");
const cors = require("cors");
const routes = require("./routes");

/* SECTION: Internal modules */


/* SECTION: Instanced module */
const app = express();


/* SECTION: Server configuration */
app.use(cors());

/* SECTION: Middleware */
app.use(express.json());

/* SECTION: Routes */
app.use("/auth", routes.auth);
app.use("/job", routes.job);

/* SECTION: Server bind */
app.listen(3000, () => {
    console.log("App listening on port 3K");
});