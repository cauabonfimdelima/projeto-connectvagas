//tabela de Vagas
//ele vai pegar o id_empresa para saber que empresa a publicou

const mongoose = require("mongoose");

const vagaSchema = new mongoose.Schema({
    cargo: {type: String, required: true},
    descricao: {type: String, required:true},
    local_vaga: {type: String, required:true},
    tipo_vaga: {type: String, required:true},
    turno_vaga:{type:String, required:true},
    modelo_trabalho:{type:String, required:true},
    bolsa_auxilio: {type: Number, required: true},
    id_empresa:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Empresa",
        required:true
    },
})

const Vagas = mongoose.model("Vagas", vagaSchema);
module.exports = Vagas;