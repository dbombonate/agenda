exports.middlewareGlobal = (req,res,next) => {
    //carrega dados nas variáveis locais da aplicação.
    res.locals.errors = req.flash('errors');
    res.locals.success = req.flash('success');
    res.locals.user = req.session.user;
    next();
}

exports.checkCsrfError = (err, req, res, next) => {
    if (err){
        res.render('404');
    }
    next();
}

exports.csrfMiddleware = (req, res, next) => {
    res.locals.csrfToken = req.csrfToken();

    next();
}

//Checa se usuário está logado para acessar determinada página
exports.loginRequired = (req, res, next) => {
    if (!req.session.user) {
        req.flash('errors', 'Voce precisa fazer login.');
        req.session.save(() => res.redirect('/'));
        return;
    }
    next();
}