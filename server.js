/* SECTION: External modules */
const express = require("express");
const session = require("express-session");
const MongoStore = require("connect-mongo");


/* SECTION: Internal modules */


/* SECTION: Instanced module */
const app = express();


/* SECTION: Server configuration */

app.use(
    session({
      store: MongoStore.create({ mongoUrl: process.env.MONGO_URI || 'mongodb://localhost:27017/projectly' }),
      secret: process.env.SECRET,
      resave: false,
      saveUninitialized: false,
      cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 7 * 2, // two weeks
      },
    })
);

/* SECTION: Middleware */


/* SECTION: Routes */


/* SECTION: Server bind */
app.listen(3000, () => {
    console.log("App listening on port 3K");
});