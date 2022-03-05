const Pool = require("pg").Pool;

const pool = new Pool({
    user:"postgres",
    password:"",//your password here
    host:"localhost",
    port:5432,
    database:"postgrestodo"

});
module.exports= pool;