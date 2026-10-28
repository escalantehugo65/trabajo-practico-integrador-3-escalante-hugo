import express from 'express';
import "dotenv/config";
import { StartDB } from './src/config/db.js';

const app = express();

const PORT = process.env.PORT || 3000;


app.use(express.json())

await StartDB();

app.listen(PORT, ()=>{
    try{
        console.log("El servidor arranco correctamente en PUERTO", PORT)
    }catch(error){
        console.error("Error interno, no fue posible conectar el servidor", error)
    }
})