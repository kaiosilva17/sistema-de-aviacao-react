const cadastroValidator = {
    nome: {
        required: 'Campo Obrigatório',
    },

    cpf: {
        required: 'Campo Obrigatório',
        minLength: {
            value: 14,
            message: 'insira um cpf valido'
        },
        
       
    },
    
    email: {
        required: 'Campo Obrigatório',
        pattern: {
            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
            message: "email invalido, exemplo: iesb@gmail.com"
        }
    },

    telefone: {
        required: 'Campo Obrigatório',
        minLength: {
            value: 15,
            message: 'insira um número de telefone válido valido'
        },
        
    },

    data_de_nascimento: {
        required: 'Campo Obrigatório',
        minLength: {
            value: 10,
            message: 'insira uma data de nascimento valida'
        },
    }

}

export default cadastroValidator