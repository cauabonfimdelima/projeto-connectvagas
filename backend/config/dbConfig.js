const mongoose = require("mongoose")
require("dotenv").config();

const dbConfig = process.env.MONGO_URI;

const connectDB = async ()=>{
    try{
        await mongoose.connect(dbConfig, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("Conectado ao MongoDB")
    }
    catch(error){
        console.log("Fala na conexão: " + error)
        process.exit(1);
    }
}

module.exports = connectDB;
