import mongoose from "mongoose";
import dotenv from 'dotenv';

dotenv.config();
//pegando o meu ip de conexao nas minhas variaveis de ambiente
const mongoip=process.env.MONGO_IP

mongoose.connect(mongoip)
//fazendo a conexao 


const mod=mongoose.model("Treino",({

    filme:String,
    data:String
}))
//criando o nome do modelo e o SCHEMA dele e exportando para ser usado no server.js
export default mod