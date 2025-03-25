//tabela de Candidato

const mongoose = require("mongoose");

const candidatoSchema = new mongoose.Schema({
    nome: {type: String, required: true},
    email: {type: String, required: true, unique:true},
    senha: {type: String, required:true},
    telefone: {type: String, default: ""},
    endereco: {type: String, default: ""}
})

const Candidato = mongoose.model("Candidato", candidatoSchema);
module.exports = Candidato;