import 'core-js/stable';
import 'regenerator-runtime/runtime';

import Login from './modules/Login';
import Contato from './modules/Contato';
import honeyPot from './modules/honeyPot';

//import './assets/css/style.css';

// Filtro de Campos na Agenda
window.onload = function () {
    const qtdContatos = document.getElementById('qtdContatos');

    if (qtdContatos.value > 10) {
        //para nomes
        const filtroNome = document.getElementById('filtro-nome');
        const tabelaNome = document.getElementById('listaContatos');
        filtroNome.onkeyup = function () {
            let nomeFiltro = filtroNome.value;
            for (let i = 1; i < tabelaNome.rows.length; i++) {
                let conteudoCelula = tabelaNome.rows[i].cells[0].innerText;
                let corresponde = conteudoCelula.toLowerCase().indexOf(nomeFiltro) >= 0;
                tabelaNome.rows[i].style.display = corresponde ? '' : 'none';
            }
        };

        //para sobrenomes
        const filtroSobrenome = document.getElementById('filtro-sobrenome');
        const tabelaSobrenome = document.getElementById('listaContatos');
        filtroSobrenome.onkeyup = function () {
            let nomeFiltro = filtroSobrenome.value;
            for (let i = 1; i < tabelaSobrenome.rows.length; i++) {
                let conteudoCelula = tabelaSobrenome.rows[i].cells[1].innerText;
                let corresponde = conteudoCelula.toLowerCase().indexOf(nomeFiltro) >= 0;
                tabelaSobrenome.rows[i].style.display = corresponde ? '' : 'none';
            }
        };

        //para email
        const filtroEmail = document.getElementById('filtro-email');
        const tabelaEmail = document.getElementById('listaContatos');
        filtroEmail.onkeyup = function () {
            let nomeFiltro = filtroEmail.value;
            for (let i = 1; i < tabelaEmail.rows.length; i++) {
                let conteudoCelula = tabelaEmail.rows[i].cells[3].innerText;
                let corresponde = conteudoCelula.toLowerCase().indexOf(nomeFiltro) >= 0;
                tabelaEmail.rows[i].style.display = corresponde ? '' : 'none';
            }
        };

    }


};


honeyPot();
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