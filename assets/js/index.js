class ValidaFormulario {
    constructor() {
        this.formulario = document.querySelector('.formulario');
        this.eventos();

    };

    eventos() {
        this.formulario.addEventListener('submit', e => {
            this.handleSubmit(e);
        });
    };

    handleSubmit(e) {
        e.preventDefault();
        const filds = this.checkfilds();
        const passwdTrue = this.passwdTrue();

        if(filds && passwdTrue){
            alert('Formulario enviado')
            this.formulario.submit();
        }
    };

    passwdTrue(){
        let valid = true

        const senha = this.formulario.querySelector('.senha');
        const Repetirsenha = this.formulario.querySelector('.repetir-senha');

        if(senha.value !== Repetirsenha.value){
            valid = false;
            this.criaError(senha, 'As senhas precisam estar iguais');
            this.criaError(Repetirsenha, 'As senhas precisam estar iguais');
        }

        if(senha.value.length < 6 || senha.value.length > 12){
            this.criaError(senha, 'A senha precisa ter entre 6 a 12 caracteres')
        }

        return valid

    }
    checkfilds() {
        let valid = true;

        for (let errorText of this.formulario.querySelectorAll('.error-text')) {
            errorText.remove();
        }

        for (let campo of this.formulario.querySelectorAll('.validar')) {
            const label = campo.previousElementSibling.innerHTML;

            if (!campo.value) {
                this.criaError(campo, `Campo "${label}" não pode estar em branco.`);
                valid = false;
            };
            if (campo.classList.contains('cpf')) {
                if (!this.validacpf(campo)) valid = false;
            }
            if (campo.classList.contains('usuario')) {
                if (!this.validaUser(campo)) valid = false;
            }
        };
        return valid;
    };

    validacpf(campo) {
        const cpf = new ValidaCPF(campo.value);

        if (!cpf.valida()) {
            this.criaError(campo, 'Cpf invalido');
            return false;
        }
        return true;
    }

    validaUser(campo) {
        const user = campo.value;
        let valid = true;

        if (user.length < 3 || user.length > 12) {
            this.criaError(campo, 'Usuario precisa ter entre 3 a 12 caracteres')
            valid = false;
        }
        if (!user.match(/^[a-zA-Z0-9]+$/g)) {
            this.criaError(campo, 'Usuario precisa conter apenas letras ou numeros')
            valid = false;
        }


        return valid;
    }
    criaError(campo, msg) {
        const div = document.createElement('div');
        div.innerHTML = msg;
        div.classList.add('error-text');
        campo.insertAdjacentElement('afterend', div);
    };
};


const valida = new ValidaFormulario()