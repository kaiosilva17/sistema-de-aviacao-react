const vooValidator = {
    companhia_aerea: {
        required: 'Campo Obrigatório',
    },

    nome_id: {
        required: 'Campo Obrigatório',
    },

    origem: {
        required: 'Campo Obrigatório',

    },

    sigla_origem: {
        required: 'Campo Obrigatório',
    },

    destino: {
        required: 'Campo Obrigatório',
    },

    sigla_destino: {
        required: 'Campo Obrigatório',
    },

    classe: {
        required: 'Campo Obrigatório'
    },

    horario_embarque: {
        required: 'Campo Obrigatório'
    },

    horario_chegada: {
        required: 'Campo Obrigatório'
    },

    portao: {
        required: 'Campo Obrigatório'
    },

    data: {
        required: 'Campo Obrigatório'
    }
}

export default vooValidator