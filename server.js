// Configuração de Variáveis de Ambiente, arquivo .env que não envia para o GIT. Usar para informações específicas
require('dotenv').config();
// Inicialização do Express
const express = require('express');
const app = express();
// Inicialização do Mongoose para conexão a base de dados
const mongoose = require('mongoose');
mongoose.connect(process.env.CONNECTIOSTRING, { useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => {
        console.log('Conectado a Base de Dados (MongoDB)');
        app.emit('connOk');
    })
    .catch(e => console.log(e));
// Sessões para salvar os cookies do navegador do cliente e salva as sessões na base de dados
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
// Mensagens que se auto destroem depois de lidas
const flash = require('connect-flash');
// Inicialização das Rotas da aplicação
const routes = require('./routes');
const path = require('path');
const helmet = require('helmet');
// Ferramenta para checar os tokens de formulários
const csrf = require('csurf');
// carrega os Middlewares da aplicação
const { middlewareGlobal, outroMiddleware, checkCsrfError, csrfMiddleware } = require('./src/middlewares/middleware');
const { json } = require('express');

// Ativa recursos da aplicação, postagem de conteudo, json e assim por diante
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(helmet());
app.use(csrf());
// define caminha de arquivos estáticos IMG, CSS, Arquivos...
app.use(express.static(path.resolve(__dirname, 'public')))

//Configuração de Sessões
const sessionOptions = session({
    secret: 'ooeslnndfeuhuehiuiufih iuhiqhriu iuhi ui',
    store: new MongoStore({ mongooseConnection: mongoose.connection}),
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 7,
        httpOnly: true
    }
});
app.use(sessionOptions);
app.use(flash());

// Configurações de Views, páginas de HTML
app.set('views', path.resolve(__dirname, 'src', 'views'));
app.set('view engine', 'ejs');

// Meus middlewares
app.use(checkCsrfError);
app.use(csrfMiddleware);
app.use(middlewareGlobal);
app.use(outroMiddleware);

// Chama as rotas da aplicação
app.use(routes);

// Inicializa a aplicação depois da conexão com banco de dados
app.on('connOk', () => {
    app.listen(3000, () => {
    console.log('Servidor executando na porta 3000');
    console.log('Servidor iniciado')
    });
})