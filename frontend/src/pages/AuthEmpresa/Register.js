import './register.css';
import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import api from '../../services/api';


function RegisterEmpresa(){

    const navigate = useNavigate();

    const [nomeEmpresa, setNomeEmpresa] = useState("");
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [cnpj, setCnpj] = useState("");
    const [cep, setCep] = useState("");
    // const [confirmSenha, setConfirmSenha] = useState("");

    const addEmpresa = async () =>{
        try{
            const response = await api.post("/register/empresa", {
                nomeEmpresa,
                email,
                senha,
                cnpj,
                cep
            }, {
                headers: {
                    "Content-Type": "application/json"
                }
            });
    
            if(response.status === 201){
                alert("Empresa registrada com sucesso!");
                setNomeEmpresa("");
                setEmail("");
                setSenha("");
                setCnpj("");
                setCep("");
                navigate("/login/empresa");
            }else{
                alert("Ocorreu um erro ao tentar logar", response.data.message)
            }
        } catch(error){
            console.error("Erro ao cadastrar empresa:", error);
             alert("Erro ao cadastrar empresa.");
        }
    }

    function handleAddEmpresa(e){
        e.preventDefault();
        addEmpresa();
    }


    return(
        <>

        <div className="container">

            <div className='container-register'>
            <div className='container-infos'>
                <h2>Pronto para encontrar um candidato?</h2>
                <span>Crie sua conta para contratar!</span>
            </div>

            <div><hr></hr></div>

            {/* <div className='option-register'>
                <div><button>Crie com Google</button></div>
            </div> */}


            <div className='container-form-register'>
            
            <form className='form-register' onSubmit={handleAddEmpresa}>

            <label>Nome da Empresa:</label>
            <input className='input-nome' 
            placeholder='digite seu nome'
            required
            value={nomeEmpresa}
            onChange={(e) => setNomeEmpresa(e.target.value)}
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

            <label>CNPJ:</label>
            <input type="number"  
            className='input-senha' 
            placeholder='00.000.000/0000-00'
            required
            value={cnpj}
            onChange={(e) => setCnpj(e.target.value)}
            />

            <label>CEP:</label>
            <input type="number"  
            className='input-senha' 
            placeholder='00000-000'
            required
            value={cep}
            onChange={(e) => setCep(e.target.value)}
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
                <span>Já tem login?<a href="/login/empresa">Faça Login</a></span>
            </div>

        </div>
        </div>

        </>
    )
}

export default RegisterEmpresa;