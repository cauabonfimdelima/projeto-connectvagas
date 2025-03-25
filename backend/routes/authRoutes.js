const express = require("express");
const routes = express.Router();

//pegando controle da  autenticação
const {
    registerCandidato,
    loginCandidato,
    registerEmpresa,
    loginEmpresa,
    vagaCandidatura,
    candidatura,
} = require("../auth/authController")

const vagasController = require("../controllers/vagaController");
const perfilController = require("../controllers/perfilController");
const verificarToken = require("../controllers/tokenController");
const upload = require("../middlewares/uploadMiddleware");
const tipoUser = require("../controllers/tipoUserController");

//rota candidato
routes.post("/register/candidato",  registerCandidato);
routes.post("/login/candidato", loginCandidato);
routes.get("/candidato/profile", perfilController.InfoCandidato);
routes.put("/candidato/profile", perfilController.atualizarCandidato);

//rota empresas
routes.post("/register/empresa", registerEmpresa);
routes.post("/login/empresa", loginEmpresa);
routes.get("/empresa/profile", perfilController.InfoEmpresa);


//rota vagas
routes.get("/", vagasController.listarVagas)
routes.post("/empresa/publicarVaga", vagasController.criarVaga)
//rota vagas empresa / candidato candidaturas
routes.get("/empresa/vagas", verificarToken, vagasController.listarVagasEmpresa);
routes.get("/candidato/candidaturas", verificarToken, vagasController.listarCandidaturas);
routes.delete("/candidato/candidaturas/:id", verificarToken, vagasController.excluirCandidatura);
routes.delete("/empresa/vagas/:id", verificarToken, vagasController.excluirVaga);
routes.get("/empresa/vagas/:id", verificarToken, vagasController.buscarVagaId)
routes.put("/empresa/vagas/editar/:id", verificarToken, vagasController.editarVaga);
//rota ver candidatos
routes.get("/empresa/vagas/:id/candidatos", verificarToken, vagasController.verCandidatos);

//rota candidatura
routes.get("/candidatura/:id",vagaCandidatura)
routes.post("/candidatura/:id", verificarToken, upload.single("curriculo"),candidatura)


//rota tipo user
routes.get("/usuario/tipo", tipoUser)


module.exports = routes;

