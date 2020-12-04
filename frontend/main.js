import 'core-js/stable';
import 'regenerator-runtime/runtime';

import Login from './modules/Login';
import Contato from './modules/Contato';

//import './assets/css/style.css';

//Validação de Campos
//Página de Login de User
const login = new Login('.form-login');
login.init();
//Página de Cadastro de User
const cadastro = new Login('.form-cadastro');
cadastro.init();
//Página de Cadastro de Contatos
const contato = new Contato('.form-contato');
contato.init();