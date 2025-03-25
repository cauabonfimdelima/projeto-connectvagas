const jwt = require("jsonwebtoken");

const verificarToken = (request, response, next) =>{
    const authHeader = request.headers['authorization'];
    if(!authHeader){
        return response.status(403).json({message: "Token não fornecido."});
    }

    const token = authHeader.split(" ")[1];

    console.log("Token recebido: ", token); // Verifique o token aqui

    jwt.verify(token, process.env.JWT_SECRET, (erro, decoded)=>{
        if(erro){
            console.error("Erro ao verificar token:", erro.message)
            return response.status(401).json({message: "Token expirado ou inválido."});
        }
        request.user = decoded;
        console.log("Usuário autenticado:", decoded);
        next();
    })

}

module.exports = verificarToken;