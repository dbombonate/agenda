exports.middlewareGlobal = (req,res,next) => {
    console.log('Passei no Middleware Global');

    if (req.body.cliente) {
        req.body.cliente = req.body.cliente.replace('Comora', 'NAO USE COMORA');
        console.log(`Vi que você postou: ${req.body.cliente}`);
    }

    next();
}

exports.outroMiddleware = (req,res,next) => {
    console.log('Verificando ID do user');
    if(req.body.cliente === 'Daniel'){
        const id = Number(1);
        console.log(`MIDDLEWARE: ID do Usuário: ${id}`);
    } else{
        console.log(`MIDDLEWARE: ID do Usuário não reconhecida`);
    }

    next();
}

exports.checkCsrfError = (err, req, res, next) => {
    if (err && 'EBADCSRFTOKEN' === err.code) {
        res.render('404');
    }
    next();
}

exports.csrfMiddleware = (req, res, next) => {
    res.locals.csrfToken = req.csrfToken();

    next();
}