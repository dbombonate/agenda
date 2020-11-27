const mongoose = require('mongoose');
const validator = require('validator');

const contatoSchema = new mongoose.Schema({
    nome: {type: String, required: true},
    sobrenome: {type: String, required: false, default: ''},
    email: {type: String, required: false, default:''},
    telefone: {type: String, required: false, default: ''},
    criadoEm: {type: Date, default: Date.now}
});

const contatoModel = mongoose.model('Contato', contatoSchema);

class Contato {
    constructor(body){
        this.body = body;
        this.errors = [];
        this.contato = null;
    }

    static async buscaPorId(id) {
        if (typeof id !== 'string') return;
        const contato = await contatoModel.findById(id);
        return contato
    }

    //Metodo de validação do usuario
    async register() {
        //recebe os dados puros do form. Se tiver erros para a execução
        this.valida();
        if(this.errors.length > 0) return;
        //verifica se usuário informado já existe na base de dados. Se existir, retorna erro e para a execução
        await this.userExists();

        if(this.errors.length > 0) return;

        //Criação do contato na base de dados      
        this.contato = await contatoModel.create(this.body);
    }
    //Metodo de validação de contato ja existente
    async userExists(){
        const userExist = await contatoModel.findOne({ email: this.body.email });
        if (userExist) this.errors.push('Este contato já existe, use a função Editar.');
    }
    //Metodo de validação de campos do form
    valida(){
        //trata os dados enviados no form para receber somente Strings
        this.cleanUp();

        //Validações
        //Valida o nome se foi digitado
        if (!this.body.nome) this.errors.push('Nome é um campo obrigatório.');
        //Valida o Email se é válido
        if (this.body.email && !validator.isEmail(this.body.email)) this.errors.push('Email inválido.');
        //Valida o telefone
        if (!this.body.email && !this.body.telefone){
            this.errors.push('Informar ou email ou telefone.');
        }
    }

    cleanUp(){
        //Itera nos dados do body verificando se o tipo é string. Caso contrário retorna campo como String vazia
        for (let key in this.body){
            if(typeof this.body[key] !== 'string'){
                this.body[key]='';
            }
        }
        //Determina a estrutura do que será considerado o body
        this.body = {
            nome: this.body.nome,
            sobrenome: this.body.sobrenome,
            email: this.body.email,
            telefone: this.body.telefone
        }
    }

}

module.exports = Contato;