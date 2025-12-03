//server.js

const express = require("express");
const app = express();
const path = require("path");

//views
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "hbs");

//static files (CSS)
app.use(express.static("public"));

//load custom router module
const router = require(path.join(__dirname, "routes", "router.js"));
app.use("/", router);


//start server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Express server running on port ${PORT}`);
});
