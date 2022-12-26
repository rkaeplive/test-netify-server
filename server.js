const express = require("express");

const app = new express();

app.use(express.json({ limit: "500mb" }));
app.use(express.urlencoded({ limit: "500mb" }));

const connectionString =
    "postgres://rkaeplive@ep-morning-bush-173522.eu-central-1.aws.neon.tech/velesstroy";
const Pool = require("pg").Pool;

const pool = new Pool({
    connectionString,
});

const allowCrossDomain = function (req, res, next) {
    res.header("Access-Control-Allow-Origin", config.CLIENT);
    res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
    res.header("Access-Control-Allow-Credentials: true");
    res.header(
        "Access-Control-Allow-Headers",
        "Content-Type, Authorization, *"
    );
    next();
};
app.use(allowCrossDomain);
app.use(express.static(__dirname + "/UserModels"));
app.use("/api/test", (req, res) => {
    // pool.query(
    //     `SELECT * FROM ${config.DB_SCHEMA}.projects`
    // );
    res.status(200).json([1, 2, 3, 4, 5]);
});

try {
    app.listen(process.env.PORT || 8000, () => {
        console.log(`Server started on port:${config.PORT}`);
    });
} catch (e) {
    console.log(e);
}
