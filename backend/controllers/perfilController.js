const express = require("express");
const jwt = require("jsonwebtoken")
const Candidato = require("../models/candidatoModel");
const Empresa = require("../models/empresaModel");
const Vagas = require("../models/vagaModel");

const InfoCandidato = async(request, response)=>{
    try{
        const token = request.headers.authorization?.split(" ")[1];
        if(!token){
            return response.status(404).json({message: "É necessário estar logado."})
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log("Token decodificado:", decoded);
        const candidato = await Candidato.findById(decoded.id);
        
        if(!candidato){
            return response.status(404).json({message: "É necessário estar logado."})
        }
        return response.status(200).json(candidato);
    }catch(error){
        return response.status(500).json({message: "Erro ao buscar informações", erro: error.message})
    }
}

const atualizarCandidato = async (request, response)=>{
    
    try{
        const token = request.headers.authorization?.split(" ")[1];
        if(!token){
            return response.status(401).json({message: "Não autorizado"});
        }
    
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const {telefone, endereco } = request.body;
    
        const candidato = await Candidato.findByIdAndUpdate(
            decoded.id,
            {telefone, endereco},
            {new: true}
        );
    
        if(!candidato){
            return response.status(404).json({message: "Candidato não encontrado"});
        }
    
        return response.status(200).json(candidato);
    }

    catch (error){
        console.error("Erro ao atualizar perfil", error);
        return response.status(500).json({message: "Erro ao atualizar perfil"})
    }
}

const InfoEmpresa = async (request, response) =>{
    try{
        const token = request.headers.authorization?.split(" ")[1];
        if(!token){
            return response.status(401).json({message: "Não autorizado"});
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const empresa = await Empresa.findById(decoded.id);

        if(!empresa){
            return response.status(404).json({message: "É necessário estar logado."})
        }
        return response.status(200).json(empresa);
    }
    catch(error){
        return response.status(500).json({message: "Erro ao buscar informações", erro: error.message})
    }
}

module.exports = { InfoCandidato, atualizarCandidato, InfoEmpresa };