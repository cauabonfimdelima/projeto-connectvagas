//tabela de Empresa

const mongoose = require("mongoose");

const empresaSchema = new mongoose.Schema({
    nomeEmpresa: {type: String, required: true},
    email: {type: String, required:true, unique:true},
    senha: {type: String, required:true},
    cnpj: {type: Number, required: true, unique:true },
    cep: {type: Number, required:true},
})

const Empresa = mongoose.model("Empresa", empresaSchema);
module.exports = Empresa;