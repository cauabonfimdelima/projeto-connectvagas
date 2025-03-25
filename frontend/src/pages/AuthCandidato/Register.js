
import './register.css';
import { useState } from 'react'
import api from '../../services/api';

function RegisterCandidato(){

    const [nome, SetNome] = useState("");
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    // const [confirmSenha, setConfirmSenha] = useState("");

    const addCandidato = async() =>{
        try{
            const response = await api.post("/register/candidato",{
                nome,
                email,
                senha
            });

            if(response === 201){
                alert("Usuário Cadastrado com sucesso");
                SetNome("");
                setEmail("");
                setSenha("");
            }else{
                alert(response.data.message);
            }   
         }catch(error){
            console.error("Erro ao cadastrar candidato:", error);
             alert("Erro ao cadastrar candidato.");
        }
    }
    

    function handleAddCandidato(e){
        e.preventDefault();
        addCandidato();
    }


    return(
        <>

        <div className="container">

            <div className='container-register'>
            <div className='container-infos'>
                <h2>Pronto para encontrar sua vaga?</h2>
                <span>Crie sua conta para realizar este sonho!</span>
            </div>

            <div className='option-register'>
                <div><button>Crie com Google</button></div>
            </div>

            <div className='divisor'><hr></hr></div>


            <div className='container-form-register'>
            
            <form className='form-register' onSubmit={handleAddCandidato}>

            <label>Nome:</label>
            <input className='input-nome' 
            placeholder='digite seu nome'
            required
            value={nome}
            onChange={(e) => SetNome(e.target.value)}
            />
            
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

            {/* <label>Confirme sua senha:</label>
            <input className='input-confirmSenha' 
            placeholder='Confirme sua senha'
            value={confirmSenha}
            onChange={(e) => setConfirmSenha(e.target.value)}
            /> */}

            <button type="submit">Cadastrar-se</button>
            </form>

            </div>

                <div><hr></hr></div>

            <div className='option-login'>
                <span>Já tem login?<a href="/login/candidato">Faça Login</a></span>
            </div>

        </div>
        </div>

        </>
    )
}

export default RegisterCandidato;