const express = require("express");
const jwt = require("jsonwebtoken")
const Candidato = require("../models/candidatoModel");
const Empresa = require("../models/empresaModel");
const Vagas = require("../models/vagaModel");

const tipoUser = async (request, response) =>{
    try{
        const token = request.headers.authorization?.split(" ")[1];
        if(!token){
            return response.status(404).json({erro: "Token não fornecido"})
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const id_usuario = decoded.id
        
        const empresa = await Empresa.findById(id_usuario);
        if(empresa){
            return response.status(200).json({tipo: "empresa"});
        }

        const candidato = await Candidato.findById(id_usuario);
        if(!candidato){
            return response.status(404).json({erro: "É necessário estar logado com candidato"});
         }
        
         return response.status(200).json({tipo: "candidato"});

    }catch{
        console.error("Erro ao processar candidatura:", error);
        return res.status(500).json({ error: "Erro interno do servidor" });

    }
}

module.exports = tipoUser;