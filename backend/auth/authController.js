const express = require("express");
const bcrypt = require("bcrypt");
const Candidato = require("../models/candidatoModel");
const Empresa = require("../models/empresaModel");
const Candidatura = require("../models/candidaturaModel");
const jwt = require("jsonwebtoken");
const Vagas = require("../models/vagaModel");
const multer = require("multer");
const upload = multer({dest: 'uploads/'});

//Registro do Candidato
const registerCandidato = async (request, response) =>{
    const {nome, email, senha} = request.body;

    try{
        const candidatoExistente = await Candidato.findOne({    email : email    })
    
        if(candidatoExistente){
            return response.status(400).json({message: "Este email já está cadastrado"})
        }

        //deixar a senha segura
        const passwordCriptografada = await bcrypt.hash(senha, 10)

        const novoCandidato = new Candidato({
            nome,
            email,
            senha: passwordCriptografada,
        })

        //salvar o usuário cadastrado no banco de dados
        await novoCandidato.save();
        //sucesso no cadastro
        return response.status(201).json({message: "Usuário Cadastrado com Sucesso"})
    }

    catch(error){
        //erro no cadastro
        return response.status(500).json({message: "Erro ao registrar Usuário", erro: error.message});
    }
}

//Login do Candidato
const loginCandidato = async (request, response)=>{

    const {email, senha} = request.body;

    try{
        //verificando se o candidato existe no banco de dados
        const candidato = await Candidato.findOne({ email : email })
        if(!candidato){
            return response.status(400).json({message: "Usuário não encontrado"});
        }
         //verificando se a senha pertence a essa empresa
        const senhaValida = await bcrypt.compare(senha, candidato.senha)
        if(!senhaValida){
            return response.status(400).json({message: "Email ou senha incorretos"})
        }
        //gerar token para usuário
        const token = jwt.sign({id: candidato._id, nome: candidato.nome}, process.env.JWT_SECRET, {expiresIn: '1h'});
        //logar e retornar token
        return response.status(201).json({message: `Login bem sucedido! Bem vindo(a) ${candidato.nome}`, token,
        tipoUsuario: "candidato",
        nome: candidato.nome});

    }catch(error){
        return response.status(500).json({message: "Erro ao realizar login", erro: error.message})
    }


}

//register empresa
const registerEmpresa = async (request, response) =>{

    const {nomeEmpresa, email, senha, cnpj, cep} = request.body;

    try{
        //se empresa já existe
        const emailTrimmed = email.trim();
        const empresaExistente = await Empresa.findOne({ email : emailTrimmed })
    
        if(empresaExistente){
        return response.status(400).json({message: "Esta Empresa já existe"})
        }
    
        const passwordCriptografada = await bcrypt.hash(senha, 10)

        const novaEmpresa = new Empresa({
            nomeEmpresa,
            email,
            senha: passwordCriptografada,
            cnpj,
            cep,
        })

        await novaEmpresa.save();
        return response.status(201).json({message: "Empresa cadastrada com sucesso!"})

    }catch(error){
        return response.status(400).json({message: "Não foi possível Registrar a Empresa", erro: error.message})
    }

}

const loginEmpresa = async (request, response) =>{
    
    const {email, senha} = request.body

    try{
        //verificando se a empresa existe no banco de dados
        const empresa = await Empresa.findOne({ email : email });
        if(!empresa){
        return response.status(400).json({message: "email ou senha inválidos"});
        }

        //verificando se a senha pertence a essa empresa
        const senhaValida = await bcrypt.compare(senha, empresa.senha);
        if(!senhaValida){
        return response.status(400).json({message: "email ou senha inválidos"});
        }

        //gerar token para usuário
        const token = jwt.sign({id : empresa._id, nome: empresa.nomeEmpresa}, process.env.JWT_SECRET, {expiresIn: '1h'})
        //logar e retornar token
        return response.status(201).json({message:  `Login bem sucedido! Bem vindo(a) ${empresa.nomeEmpresa}`, token, 
        tipoUsuario: "empresa",
        nome: empresa.nomeEmpresa})

    }catch(error){
        return response.status(400).json({message: "Não foi possível logar"})
    }

}

const vagaCandidatura = async (request, response)=>{
    try{
        const {id} = request.params;
        const vaga = await Vagas.findById(id);
        if(!vaga){
            return response.status(404).json({error: "Vaga não encontrada"});
        }
        response.status(200).json(vaga);
    }catch(error){
        console.error("Erro ao buscar vaga", error);
        response.status(500).json({error: "Erro no servidor"});
    }
}

const candidatura = async (request, response)=>{

    try{

    const authHeader = request.headers.authorization;
    const token = authHeader && authHeader.split(" ")[1];
    if(!token){
        return response.status(401).json({message: "É necessário estar logado para se candidatar."})
    }

    console.log("Token recebido:", token);

    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    const id_candidato = decoded.id;
    const {id} = request.params;
    const curriculo = request.file;

    console.log("Candidato ID:", id_candidato, "Vaga ID:", id);

    const candidatoExistente = await Candidato.findById(id_candidato);
    if(!candidatoExistente){
        return response.status(404).json({message: "É necessário estar logado para se candidatar"})
    }

    const vagaExistente = await Vagas.findById(id).populate("id_empresa");
    if(!vagaExistente){
        return response.status(404).json({message: "Vaga não encontrada!"})
    }

    const candidaturaExistente = await Candidatura.findOne({id_candidato, id_vaga: id});

    if(candidaturaExistente){
        return response.status(400).json({message: "Você já se candidatou a essa vaga."})
    }

    if (!curriculo) {
        return response.status(400).json({ message: "Envie um currículo para concluir a candidatura." });
    }
    console.log("Currículo recebido:", curriculo.filename);

    const novaCandidatura = new Candidatura({
        id_candidato: id_candidato,
        id_vaga: id,
        id_empresa: vagaExistente.id_empresa._id,
        curriculo: curriculo.filename,
    })

    await novaCandidatura.save();
    return response.status(201).json({message: "Candidatura feita com sucesso!"});

    }
    catch(error){
        return response.status(500).json({message: "Erro ao se candidatar", erro: error.message})
    }


}

module.exports = {
    registerCandidato,
    loginCandidato,
    registerEmpresa,
    loginEmpresa,
    vagaCandidatura,
    candidatura,
};