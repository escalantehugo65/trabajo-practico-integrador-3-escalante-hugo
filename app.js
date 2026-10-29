import express from 'express';
import "dotenv/config";
import { StartDB } from './src/config/db.js';
import cookieParser from 'cookie-parser';
import cors from "cors"

const app = express();

const PORT = process.env.PORT || 3000;


app.use(express.json(), cors(), cookieParser());

await StartDB();

app.listen(PORT, ()=>{
    try{
        console.log("El servidor arranco correctamente en PUERTO", PORT)
    }catch(error){
        console.error("Error interno, no fue posible conectar el servidor", error)
    }
})