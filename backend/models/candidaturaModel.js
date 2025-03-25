//tabela de Candidatura
//ele vai pegar o id_candidato para saber quem se candidatou
//ele vai pegar o id_vaga para saber a vaga

const mongoose = require("mongoose");

const candidaturaSchema = new mongoose.Schema({
    id_candidato:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Candidato",
        required: true
    },
    id_vaga:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Vagas",
        required:true
    },
    id_empresa:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Empresa",
        required: true
    },
    data_candidatura: {type: Date, default: Date.now},
    curriculo:{type: String, required: true}
})

const Candidatura = mongoose.model("Candidatura", candidaturaSchema);
module.exports = Candidatura;