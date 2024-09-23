const connectDB = require('../db/connect_db');
const bcrypt = require('bcrypt');

class InfoController{
    getInfo(req, res){
        const getAllUserFromDB = 'SELECT * FROM User';
        
        connectDB.query(getAllUserFromDB, (err, result)=>{
            if(err){
                console.log(err);
                res.status(501).json({error: error.message});
            }
            res.status(200).json({message: result});
        });
    };

    async postInfo(req, res) {
        const { name, pass, describtion } = req.body;
        if ( !name || !pass) {
            return res.status(400).json({ error: 'Name and password are required' });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(pass, salt);
        console.log(hashedPassword);

        try{
            const addUserQUERY = "INSERT INTO User (name, password, describtion) VALUES (?, ?, ?)";
            connectDB.query(addUserQUERY, [name, hashedPassword, describtion], (error, result)=>{
                if(error){
                    console.log(error);
                }
                res.status(200).json({message: result});
            })
        }catch(error){
            console.log(error);
            res.status(500).json({error: error.message});
        }
    }

    getUserFromName(req, res){
        const {password} = req.body;
        const findUserFromNameQuery = 'SELECT name, describtion FROM User WHERE password = ?';
        connectDB.query(findUserFromNameQuery, [password], (error, find)=>{
            if(error){
                console.log(error);
                res.status(500).json({error: error.message});
            }
            res.status(200).json({data: find});
        })
    }
    
}

module.exports = InfoController;
