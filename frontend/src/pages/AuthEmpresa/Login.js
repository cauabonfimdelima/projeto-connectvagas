import './login.css';
import { useState } from 'react'
import {useNavigate} from 'react-router-dom'
import api from '../../services/api';


function LoginEmpresa(){

    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");

   const logarEmpresa = async ()=>{
    try{

        const response  = await api.post("/login/empresa", {
            email,
            senha
        })

        if(response.status === 201){
            alert("Logado com sucesso")
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('tipoUsuario', response.data.tipoUsuario);
            setEmail("");
            setSenha("");
            navigate("/");
        }else{
            alert("Email ou senha inválidos!")
        }

    }catch(error){
        console.log("Erro ao logar:", error);
        alert("Erro ao tentar fazer login. Verifique suas credenciais.");
    }

   }

    function login(e){
        e.preventDefault();
        logarEmpresa();
    }

    return(
        <>

        <div className="container">

            <div className='container-register'>
            <div className='container-infos'>
                <h2>Faça Login para anunciar vagas</h2>
                <span>Entre e recrute!</span>
            </div>

            <div className='option-register'>
                <div><button>Entre com Google</button></div>
            </div>
            <div className='divisor'><hr></hr></div>


            <div className='container-form-login'>
            
            <form className='form-login' onSubmit={login}>

            <label>Email:</label>
            <input type="email" 
            className='input-email' 
            placeholder='digite seu email'
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            />

            <label>Senha:</label>
            <input type="password" 
            className='input-senha' 
            placeholder='digite sua senha'
            required
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            />

            <button type="submit">Entrar</button>
            </form>

            </div>

                <div><hr></hr></div>

            <div className='option-login'>
                <span>Não tem login?<a href="/register/empresa">Cadastre-se</a></span>
            </div>

        </div>
        </div>

        </>
    )
}

export default LoginEmpresa;