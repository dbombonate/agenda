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

    async register() {
        this.valida();
        
        if(this.errors.length > 0) return;
        
        await this.userExists();

        if(this.errors.length > 0) return;

        const salt = bcryptjs.genSaltSync();
        this.body.password = bcryptjs.hashSync(this.body.password, salt);

        try {
            this.user = await loginModel.create(this.body);    
        } catch (error) {
            console.log(error);
        };
        
    }

    async userExists(){
        const userExist = await loginModel.findOne({ email: this.body.email });
        if (userExist) this.errors.push('Este usuário já existe.');
    }

    valida(){
        this.cleanUp();

        //Validações
        //Valida o Email se é válido
        if (!validator.isEmail(this.body.email)) this.errors.push('Email inválido.');
        //Valida a senha entre 3 e 50 caracteres
        if (this.body.password.length < 3 || this.body.password.length > 10){
            this.errors.push('A senha precisa ter entre 3 e 10 caracteres.');
        }
    }

    cleanUp(){
        for (let key in this.body){
            if(typeof this.body[key] !== 'string'){
                this.body[key]='';
            }
        }
        this.body = {
            email: this.body.email,
            password: this.body.password
        }
    }

};

module.exports = Login;