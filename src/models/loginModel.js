const mongoose = require('mongoose');
const validator = require('validator');
const bcryptjs = require('bcryptjs');

const loginSchema = new mongoose.Schema({
    email: {type: String, required: true},
    password: {type: String, required: true}
});

const loginModel = mongoose.model('Login', loginSchema);

class Login {
    constructor(body){
        this.body = body;
        this.errors = [];
        this.user = null;
    }
    //Metodo de validação do usuario
    async register() {
        //recebe os dados puros do form. Se tiver erros para a execução
        this.valida();
        if(this.errors.length > 0) return;
        //verifica se usuário informado já existe na base de dados. Se existir, retorna erro e para a execução
        await this.userExists();

        if(this.errors.length > 0) return;
        //Criação do hash de senha
        const salt = bcryptjs.genSaltSync();
        this.body.password = bcryptjs.hashSync(this.body.password, salt);
        //Criação do usuario na base de dados
        try {
            this.user = await loginModel.create(this.body);    
        } catch (error) {
            console.log(error);
        };
        
    }
    //Metodo de validação de usuario ja existente
    async userExists(){
        const userExist = await loginModel.findOne({ email: this.body.email });
        if (userExist) this.errors.push('Este usuário já existe.');
    }
    //Metodo de validação de campos do form
    valida(){
        //trata os dados enviados no form para receber somente Strings
        this.cleanUp();

        //Validações
        //Valida o Email se é válido
        if (!validator.isEmail(this.body.email)) this.errors.push('Email inválido.');
        //Valida a senha entre 3 e 50 caracteres
        if (this.body.password.length < 3 || this.body.password.length > 10){
            this.errors.push('A senha precisa ter entre 3 e 10 caracteres.');
        }
    }
    //Metodo de tratamento de dados do form
    cleanUp(){
        //Itera nos dados do body verificando se o tipo é string. Caso contrário retorna campo como String vazia
        for (let key in this.body){
            if(typeof this.body[key] !== 'string'){
                this.body[key]='';
            }
        }
        //Determina a estrutura do que será considerado o body
        this.body = {
            email: this.body.email,
            password: this.body.password
        }
    }

};

module.exports = Login;