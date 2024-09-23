const mysql = require('mysql2');

const connectDB = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'test',
});

connectDB.connect((error)=>{
    if(error){
        console.log('DB is not connect');
    }
    console.log('Success connect to DB');
})

module.exports = connectDB;