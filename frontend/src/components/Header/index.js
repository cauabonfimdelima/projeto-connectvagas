import "./header.css"
import RegisterCandidato from "../../pages/AuthCandidato/Register";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";


function Header(){
    const navigate = useNavigate();
    const [logado, setLogado] = useState(false);
    const [tipoUsuario, setTipoUsuario] = useState("");
    const [menuAberto, setMenuAberto] = useState(false);

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

    const toggleMenu = () => {
        setMenuAberto(!menuAberto);
    };

    return(
        <>
        <header>
            <div>
                <a href="/"><h2>Connect Vagas</h2></a>
            </div>
            

         <button className="hamburguer" onClick={toggleMenu}>
                ☰
            </button>

            <nav>
                <ul className="desktop-menu">   
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
            
            {menuAberto && (
                <div className="mobile-menu">
                    <ul>
                        {logado ? (
                            <>
                            {tipoUsuario === "candidato" && (
                                <>
                                <li onClick={handleCandidatoArea}>Área do Candidato</li>
                                <li onClick={handleLogout}>Sair</li>
                                </>
                            )}
                            {tipoUsuario === "empresa" && (
                                <>
                                <li onClick={handleAnunciarVaga}>Anunciar Vaga</li>
                                <li onClick={handleEmpresaArea}>Área da Empresa</li>
                                <li onClick={handleLogout}>Sair</li>
                                </>
                            )}
                            </>
                        ) : (
                            <>
                            <li><a href="/register/candidato">Registrar Candidato</a></li>
                            <li><a href="/login/candidato">Login Candidato</a></li>
                            <li><a href="/register/empresa">Registrar Empresa</a></li>
                            <li><a href="/login/empresa">Login Empresa</a></li>
                            </>
                        )}
                    </ul>
                </div>
            )}
        </header>
        </>
    )
}
export default Header;