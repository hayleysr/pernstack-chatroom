const Pool = require("pg").Pool;
const pool = new Pool({
    user: "postgres",
    password: "njmts11fb",
    host: "localhost",
    port: "5432",
    database: "pernchat"
});

module.exports = pool;