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

//Faz o check do recaptcha e realiza a liberação para o form
exports.captcha = (req, res, next) => {
   
    if(req.body['g-recaptcha-response'] === undefined || 
       req.body['g-recaptcha-response'] === '' || 
       req.body['g-recaptcha-response'] === null)
    {
      //return res.json({"responseError" : "Algo deu errado"});
      return res.render('404');
    }
    console.log(req.body['g-recaptcha-response']);
    const secretKey = process.env.secretKeyCaptcha;
   
    const verificationURL = "https://www.google.com/recaptcha/api/siteverify?secret=" + secretKey + "&response=" + 
        req.body['g-recaptcha-response'] + "&remoteip=" + req.connection.remoteAddress;

    console.log(verificationURL);
   
    request(verificationURL,function(error,response,body) {
      body = JSON.parse(body);
   
      if(body.success !== undefined && !body.success) {
        return res.json({"responseError" : "Failed captcha verification"});
      }
    });
    next();
};