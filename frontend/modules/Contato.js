import validator from 'validator';

export default class Contato {
    constructor(formClass) {
        this.form = document.querySelector(formClass);
    };

    init() {
        this.events();
    }

    events() {
        if (!this.form) return;
        //Monitora se um submit está sendo enviado, previne o resultado padrão, e chama a validação
        this.form.addEventListener('submit', e => {
            e.preventDefault();
            this.validate(e);
        });
    }

    validate(event) {
        const el = event.target;
        //Campos do Form
        const nomeInput = el.querySelector('input[name="nome"]');
        const telInput = el.querySelector('input[name="telefone"]');
        const emailInput = el.querySelector('input[name="email"]');
        const endInput = el.querySelector('input[name="endereco"]');

        let error = false;

        if (nomeInput.value.length < 2) {
            this.criaErro(nomeInput, 'Insira um nome.')
            error = true;
        }

        if (telInput.value.length === 0 && emailInput.value.length === 0){
            this.criaErro(telInput, 'Informe um telefone ou email válido.');
            this.criaErro(emailInput, 'Informe um telefone ou email válido.');
            error = true;
        }

        if (emailInput.value.length > 0){
            if (!validator.isEmail(emailInput.value)) {
                this.criaErro(emailInput, 'Email Inválido!');
                error = true;
            }
        }

        if (endInput.value.length > 0 && endInput.value.length < 5) {
            this.criaErro(endInput, 'Informar endereço completo.');
            error = true;
        }

        if (!error) el.submit();

    };

    criaErro(campo, msg) {
        const divErro = document.createElement('div');
        divErro.innerHTML = msg;
        divErro.classList.add('alert-danger');
        campo.insertAdjacentElement('afterEnd', divErro);
    }

}