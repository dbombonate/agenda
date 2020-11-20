const Login = require('../models/loginModel');

exports.index = (req,res) => {
    if (req.session.user){
        res.render('welcome');
    } else {
        res.render('login');
    }
}

//Controller de registro do user
exports.register = async (req,res) => {
    //chama a classe login e instancia o objeto req.body nela
    try {
        const login = new Login(req.body);
    await login.register();
    //no caso de verificação de erros, lança os mesmos em variáveis locais para exibição na tela de login
    if (login.errors.length > 0){
        req.flash('errors', login.errors);
        req.session.save(function(){
            console.log(login.errors);
            return res.redirect('index');
        });
        return;
    };
    //caso não registre erros, informa mensagem de sucesso na tela e acessa a agenda
    req.flash('success', 'Seu usuário foi criado com sucesso.');
    req.session.save(function(){
        return res.redirect('indexAgenda');
    });
    
    } catch (e) {
        //Caso encontre erro na chamada, lança erro em console e carrega página 404
        console.log(e);
        return res.render('404');
    }
}

//Controller de login do usuário
exports.login = async (req,res) => {
    //chama a classe login e instancia o objeto req.body nela
    try {
        const login = new Login(req.body);
    await login.login();
    //no caso de verificação de erros, lança os mesmos em variáveis locais para exibição na tela de login
    if (login.errors.length > 0){
        req.flash('errors', login.errors);
        req.session.save(function(){
            console.log(login.errors);
            return res.redirect('index');
        });
        return;
    };
    //caso não registre erros, informa mensagem de sucesso na tela
    req.flash('success', 'Login efetuado com sucesso.');
    req.session.user = login.user;
    req.session.save(function(){
        return res.redirect('index');
    });
    
    } catch (e) {
        //Caso encontre erro na chamada, lança erro em console e carrega página 404
        console.log(e);
        return res.render('404');
    }
}

//Controller de logout
exports.logout = (req, res) => {
    req.session.destroy();
    res.redirect('index');
}