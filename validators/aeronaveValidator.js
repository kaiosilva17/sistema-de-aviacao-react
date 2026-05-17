const aeronaveValidator = {
    nome: {
        required: 'Campo Obrigatório',
    },

    assentos: {
        required: 'Campo Obrigatório',
        min: {
            value: 70,
            message: 'O mínimo de assentos deve ser de 70 lugares'
        },
        max: {
            value: 410,
            message: 'O máximo de assentos deve ser de 410 lugares'
        }
    }
}

export default aeronaveValidator