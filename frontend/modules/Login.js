import validator from 'validator';

export default class Login {
    constructor(formClass){
        this.form = document.querySelector(formClass);
        this.errors = [];
    };

    init(){
        this.events();
    }

    events(){
        if (!this.form) return;
        //Monitora se um submit está sendo enviado, previne o resultado padrão, e chama a validação
        this.form.addEventListener('submit', e => {
            e.preventDefault();
            this.validate(e);
        });
    }

    validate(event){
        const el = event.target;
        const emailInput = el.querySelector('input[name="email"]');
        const passwordInput = el.querySelector('input[name="password"]');
        let error = false;
        
        if (!validator.isEmail(emailInput.value)){
            this.criaErro(emailInput, 'Email Inválido!');
            error = true;
        }
        
        if (passwordInput.value.length < 3 || passwordInput.value.length > 10){
            this.criaErro(passwordInput, 'Senha deve conter entre 3 e 10 caracteres.');
            error = true;
        }
        
        if(!error) el.submit();
        
    };

    criaErro(campo, msg) {
        const divErro = document.createElement('div');
        divErro.innerHTML = msg;
        divErro.classList.add('alert-danger');
        campo.insertAdjacentElement('afterEnd', divErro);  
    }

}