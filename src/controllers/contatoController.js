const Contato = require("../models/contatoModel");

exports.index = (req,res) => {
    res.render('contato', {
        contato: {}
    })
}

exports.register = async (req,res) => {
    try {
        const contato = new Contato(req.body);
        await contato.register();
        //Se tiver erros, exibe em tela
        if (contato.errors.length > 0){
            req.flash('errors', contato.errors);
            req.session.save(function(){
                console.log(contato.errors);
                return res.redirect('back');
            });
            return;
        };
        //caso não registre erros, informa mensagem de sucesso na tela e acessa a agenda
        req.flash('success', 'Contato adicionado com sucesso.');
        req.session.save(function(){
            return res.redirect(`/contato/index/${contato.contato._id}`);
        });
        
        } catch (e) {
            //Caso encontre erro na chamada, lança erro em console e carrega página 404
            console.log(e);
            return res.render('404');
        }
}

exports.editIndex = async (req, res) => {
    if (!req.params.id) return res.render('404');

    const contato = await Contato.buscaPorId(req.params.id);
    if (!contato) return res.render('404');

    res.render('contato', { contato });
}

exports.delete = async (req, res) => {
    if (!req.params.id) return res.render('404');

    const contato = await Contato.delete(req.params.id);
    if (!contato) return res.render('404');

    req.flash('success', 'Contato apagado com sucesso.');
    req.session.save(function(){
        return res.redirect('back');
    });
    return;
}

exports.edit = async (req,res) => {
    if (!req.params.id) return res.render('404');
    try {
        const contato = new Contato(req.body);
        await contato.edit(req.params.id);
        //Se tiver erros, exibe em tela
        if (contato.errors.length > 0){
            req.flash('errors', contato.errors);
            req.session.save(function(){
                console.log(contato.errors);
                return res.redirect(`/contato/index/${req.params.id}`);
            });
            return;
        };
        //caso não registre erros, informa mensagem de sucesso na tela e acessa a agenda
        req.flash('success', 'Contato atualizado com sucesso.');
        req.session.save(function(){
            return res.redirect(`/contato/index/${contato.contato._id}`);
        });

    } catch (error) {
        console.log(error);
        return res.render('404');
    }
}