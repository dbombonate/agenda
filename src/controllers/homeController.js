exports.paginaInicial = (req,res) => {
    res.render('index', {
        title: 'Teste EJS'
    })
}

exports.enviaPost = (req,res) => {
    console.log(req.body);
    res.send(`Recebi do form: ${req.body.cliente}`);
}