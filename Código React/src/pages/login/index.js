import { useState } from 'react';
import Swal from 'sweetalert2'
import './index.css';
import usuarioService from '../../service/usuario-service';
import imagemTea from "../../images/autism.gif"
import logosTea from "../../images/logos.jpg"
import iconeDeCarregamento from "../../images/double-ring-blue.gif"

function Login (){
    const [email, setEmail] = useState('admin@admin.com');
    const [senha, setSenha] = useState('123456');

    const logar = () => {
  
        if(!email || !senha){
            Swal.fire({
                icon: 'error',
                text: 'Os campos de e-mail e senha são obrigatórios!'
            });
            return;
        }
        
            mostrarLoading();

        setTimeout(() => {
            usuarioService.autenticar(email, senha)
        .then(response => {
            usuarioService.salvarToken(response.data.token);
            usuarioService.salvarUsuario(response.data.usuario);
            
            window.location='/';
        })
        .catch(erro =>{
            console.log(erro)
        })
        }, 5000);
    };

    const mostrarLoading = () => {
        const divLoading = document.querySelector('div.icone-carregando');
    divLoading.style.display='block';

    const telaLogin = document.querySelector('div.elementos-tela')
    telaLogin.style.display = 'none';

    const cardLogin = document.querySelector('div.caixa-login')
    cardLogin.style.display = 'none';
    };

    return (
        <div className="tela-login">
        <div className="elementos-tela">
                <h1>Maternidade Atípica<br/>TEA</h1>    
                <img className="imagem-principal" src={imagemTea} alt="Imagem representativa do TEA"/>
         </div>

        <div className="caixa-login">
            <div className="card-login">
                <h1 className="titulo-login">Login</h1>
        
                <div className="grupo">
                    <label for="email">E-mail</label> <br/>
                    <input id="email" type="text" placeholder="Digite seu E-mail..." onChange={(e) => setEmail(e.target.value)} value={email}/>
                </div>
            
                <div className="grupo">
                    <label for="senha">Senha</label> <br/>
                    <input id="senha" type="password" placeholder="Digite sua Senha..." onChange={(e) => setSenha(e.target.value)} value={senha}/>
                </div>
            
                <div className="esqueci-minha-senha">
                    <a id="texto-esqueci-senha" href="#">Esqueci minha senha</a>
                </div>

                <div className="botao-entrar">
                    <button id="btn-entrar" onClick={logar}>Entrar</button>
                </div>
            </div>
            
            <div className="logos">
                <img src={logosTea} alt="Logos do TEA e do grupo 'Materninade Atípica', respectivamente"/>
            </div>    
        </div>

        <div className='icone-carregando'>
            <img src={iconeDeCarregamento} alt='Ícone de carregamento da página, com 4 linhas azuis, sendo 2 foscas e 2 escuras, girando em formato circular.'/>
        </div>
    </div>
    )
}

export default Login;