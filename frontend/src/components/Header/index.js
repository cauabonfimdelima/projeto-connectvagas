import "./header.css"
import RegisterCandidato from "../../pages/AuthCandidato/Register";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";


function Header(){
    const navigate = useNavigate();
    const [logado, setLogado] = useState(false);
    const [tipoUsuario, setTipoUsuario] = useState("");

    useEffect(()=>{
        const token = localStorage.getItem('token');
        const tipoUsuario = localStorage.getItem("tipoUsuario")
        if(token && tipoUsuario){
            setLogado(true)
            setTipoUsuario(tipoUsuario)
        }else{
            setLogado(false);
        }
    }, [])

    const handleLogout = () =>{
            localStorage.removeItem('token');
            localStorage.removeItem('tipoUsuario')
            setLogado(false);
            setTipoUsuario("");
            navigate("/");
    }

    const handleCandidatoArea = () =>{
        navigate("/candidato/profile");
    }

    const handleEmpresaArea = () =>{
        navigate("/empresa/profile");
    }

    const handleAnunciarVaga = () =>{
        navigate("/empresa/publicarVaga");
    }

    return(
        <>
        <header>
            <div>
                <a href="/"><h2>Connect Vagas</h2></a>
            </div>
            
            <nav>
                <ul>   
                    {logado ? (
                    <>
                        {tipoUsuario === "candidato" ? (
                            <>
                            {/* href="/candidato/profile" */}
                            <li><button className="btnCandidato" onClick={handleCandidatoArea}>Área do Candidato</button></li>
                            <li><button className="btnSair" onClick={handleLogout}>Sair</button></li>
                            </>
                        ): tipoUsuario === "empresa" ? (
                           <>
                              <li><button className="btnAnunciarVaga" onClick={handleAnunciarVaga} >Anunciar Vaga</button></li>
                              <li><button className="btnEmpresa" onClick={handleEmpresaArea}>Área da Empresa</button></li>
                              <li><button className="btnSair" onClick={handleLogout}>Sair</button></li>
                           </>
                        ) : null}    
                    </>
                    ) : (
                    <>
                    <li className="menu-item">
                        Candidato
                        <div className="menu">
                            <a href="/register/candidato">Registrar</a>
                            <a href="/login/candidato">Logar</a>
                        </div>
                    </li>
                    <li className="menu-item">  
                        Minha Empresa
                          <div className="menu">
                          <a href="/register/empresa">Registrar</a>
                          <a href="/login/empresa">Logar</a>
                          </div>
                    </li>
                    </>
                    )}
                </ul>
            </nav>
        </header>
        </>
    )
}
export default Header;