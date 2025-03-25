const express = require("express");
const jwt = require("jsonwebtoken")
const Empresa = require("../models/empresaModel");
const Vagas = require("../models/vagaModel");
const Candidato = require("../models/candidatoModel");
const Candidatura = require("../models/candidaturaModel");
const { request } = require("https-browserify");


const criarVaga = async (request, response)=>{

    const {cargo, descricao, local_vaga, tipo_vaga, turno_vaga, modelo_trabalho, bolsa_auxilio} = request.body

    try{

        //Extrair o token
        const authHeader = request.headers.authorization;
        const token = authHeader && authHeader.split(" ")[1];
        if(!token){
            return response.status(401).json({message: "Token não encontrado"})
        }

        //verificar token
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        const id_empresa = decoded.id;

        const empresaExistente = await Empresa.findById(id_empresa);
        if(!empresaExistente){
            return response.status(400).json({message: "Empresa não encontrada"})
        }


        //verifica se tem uma empresa logada tentando cadastrar a vaga
        // const empresaExistente = await Empresa.findOne({    id_empresa : id_empresa  })
        // if(!empresaExistente){
        //     return response.status(400).json({message: "É necessário ser uma empresa para cadastrar uma vaga."})
        // }
    
        //verifica se os campos estão sendo preenchidos
        if(!cargo || !descricao || !local_vaga || !tipo_vaga || !turno_vaga || !modelo_trabalho || !bolsa_auxilio){
            return response.status(400).json({message: "É necessário preencher todos os campos."});
        }

        const novaVaga = new Vagas({
            cargo,
            descricao,
            local_vaga,
            tipo_vaga,
            turno_vaga,
            modelo_trabalho,
            bolsa_auxilio,
            id_empresa: id_empresa
        })

        await novaVaga.save();
        response.status(201).json({message: "Vaga cadastrada com sucesso!"})

    }catch(error){
        return response.status(400).json({message: "Não foi possível cadastrar uma vaga " + error})
    }
}

const listarVagas = async(request, response)=>{
    try{
        const todasVagas = await Vagas.find().populate("id_empresa", "nomeEmpresa");
        return response.status(200).json(todasVagas)
    }catch(error){
        return response.status(500).json({message: "Erro ao buscar vagas", erro: error.message})
    }
}

const listarVagasEmpresa = async(request, response)=>{
    try{
        const token = request.headers.authorization?.split(" ")[1];
        if(!token){
            return response.status(404).json({message: "Token não encontrado"});
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const empresa = await Empresa.findById(decoded.id);
        if(!empresa){
            return response.status(404).json("É necessário estar logado como empresa")
        }
        const vagasEmpresa = await Vagas.find({id_empresa : decoded.id});
        if(!vagasEmpresa || vagasEmpresa.length === 0){
        return response.status(404).json({message: "Nenhuma vaga da encontrada."})
        }
        return response.status(200).json(vagasEmpresa);
    }catch(error){
        return response.status(500).json({message: "Erro ao buscar vagas", erro: error.message})
    }
}

const excluirVaga = async(request, response)=>{
    try{
        const token = request.headers.authorization?.split(" ")[1];
        if(!token){
            return response.status(404).json({message: "Token não encontrado"});
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        const vaga = await Vagas.findByIdAndDelete({
            _id: request.params.id,
            id_empresa: decoded.id
        })
        if(!vaga){
            return response.status(404).json({message: "Vaga não encontrada"});
        }
    
        return response.status(200).json({message: "Vaga excluída com sucesso"});

    }catch(error){
        return response.status(500).json({ message: "Erro ao excluir vaga", erro: error.message });
    }
}

const buscarVagaId = async (request, response) =>{
    try{
        const {id} = request.params;
        const vaga = await Vagas.findById(id);
        if(!vaga){
            return response.status(404).json({message: "Vaga não encontrada"});
        }
        return response.status(200).json(vaga);
    }catch(error){
        return response.status(500).json({message: "Erro ao buscar vaga", erro: error});
    }
}

const editarVaga = async(request, response) => {
    try{
        const {id} = request.params
        const {cargo, descricao, local_vaga, tipo_vaga, turno_vaga, modelo_trabalho, bolsa_auxilio} = request.body

        const vagaAtualizada = await Vagas.findByIdAndUpdate(
            id,
            {
                cargo,
                descricao,
                local_vaga,
                tipo_vaga,
                turno_vaga,
                modelo_trabalho,
                bolsa_auxilio
            },
            {new: true}
        )

        if(!vagaAtualizada){
            return response.status(404).json({message: "Vaga não encontrada"})
        }
        return response.status(200).json(vagaAtualizada);

    }catch(error){
        return response.status(500).json({ message: "Erro ao editar vaga", erro: error.message });
    }
}

const listarCandidaturas = async(request, response)=>{
    try{
        const token = request.headers.authorization?.split(" ")[1];
        if(!token){
            return response.status(404).json({message: "Token não encontrado"});
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const candidato = await Candidato.findById(decoded.id);
        if(!candidato){
            return response.status(200).json({message: "É necessário estar logado como candidato"})
        }
        const candidatura = await Candidatura.find({id_candidato : decoded.id})
        .populate("id_vaga")
        .populate("id_empresa", "nomeEmpresa");

        if(!candidatura || candidatura.length === 0){
            return response.status(400).json({message: "Nenhuma vaga encontrada"});
        }
        return response.status(200).json(candidatura);

    }catch(error){
        return response.status(500).json({message: "Erro ao buscar vagas", erro: error.message})
    }
}

const excluirCandidatura = async(request, response)=>{
    try{
        const token = request.headers.authorization?.split(" ")[1];
        if(!token){
            return response.status(404).json({message: "Token não encontrado"});
        }
    
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const candidatura = await Candidatura.findOneAndDelete({
            _id: request.params.id,
            id_candidato: decoded.id
        })
    
        if(!candidatura){
            return response.status(404).json({message: "Candidatura não encontrada"});
        }
    
        return response.status(200).json({message: "Candidatura excluída com sucesso"});

    }catch(error){
        return response.status(500).json({ message: "Erro ao excluir candidatura", erro: error.message });
}
}

const verCandidatos = async(request, response) => {
    try{
        const idVaga = request.params.id;
        const candidaturas = await Candidatura.find({id_vaga : idVaga}).populate("id_candidato");
        if(!candidaturas.length){
            return response.status(404).json([]);
        }
        const candidatos = candidaturas.map(candidatura =>({
            nome: candidatura.id_candidato.nome,
            email: candidatura.id_candidato.email,
            curriculo: candidatura.curriculo
        }))
        response.status(200).json(candidatos)

    }catch(error){
        console.error("Erro ao buscar candidatos:", error);
        response.status(500).json({ message: "Erro ao buscar candidatos" });
    }
}


module.exports = {
    criarVaga,
    listarVagas,
    listarVagasEmpresa,
    excluirVaga,
    buscarVagaId,
    editarVaga,
    listarCandidaturas,
    excluirCandidatura,
    verCandidatos
};
