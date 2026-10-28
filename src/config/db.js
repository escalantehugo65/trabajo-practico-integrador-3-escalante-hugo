import mongoose from 'mongoose';
import "dotenv/config";


export const StartDB = async()=>{

    try{

        await mongoose.connect(process.env.MONGO_URL)

        console.log("Se ha conectado con éxito a la Base de Datos")
    }catch(error){
        console.error("No se ha podido conectar a la Base de Datos")

        throw error;
    }
}