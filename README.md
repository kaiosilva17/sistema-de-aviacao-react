Sistema de Gestão e Reserva de Passagens Aéreas

É uma aplicação web moderna para a simulação de operações de uma companhia aérea. O sistema possui dois fluxos principais: um painel administrativo (para gestão de frotas, aeroportos e rotas) e uma área de cliente/usuário (destinada à reserva de passagens com validação automatizada e emissão de cartões de embarque dinâmicos).

Este projeto foi construído com o objetivo de consolidar conceitos avançados de arquitetura de componentes, consumo de APIs REST públicas, gerenciamento de formulários complexos e versionamento de código profissional.

 Funcionalidades Principais:

 Área Administrativa (Painel ADM)
- Gestão de Aeronaves: Cadastro de frotas com definição individual de número assentos.
- Gestão de Aeroportos (Integração com API Externa): Cadastro de terminais integrando a API de Localidades do IBGE para a listagem dinâmica de Estados (UF), mitigando erros de digitação e padronizando os registros.
- Gestão de Voos: Criação e listagem de voos contendo horários de embarque/chegada, portão de embarque e companhia responsável.
-Gestão de Classe: Definição das classes do voo, contendo informações de valor e bagagem.

 Área do Usuário
- Reserva de Passagens: Interface intuitiva que filtra os voos disponíveis em tempo real com base na rota selecionada (Origem ➔ Destino).
- Validação de Assentos Inteligente: Validação em tempo real (via Regex e máscaras de entrada) que garante que o assento digitado pelo usuário (Ex: `12A`) é estritamente válido dentro dos limites físicos da aeronave operando aquele voo.
- Cartão de Embarque Dinâmico: Geração automatizada de ticket de viagem utilizando rotas dinâmicas, recuperando os dados específicos da reserva a partir do índice de persistência.

 Tecnologias Utilizadas

- Core: [React](https://react.dev/) & [Next.js](https://nextjs.org/) (Roteamento Dinâmico por Páginas `/pages`)
- Estilização & UI: [React-Bootstrap](https://react-bootstrap.github.io/) & [Material UI (DataGrid)](https://mui.com/x/react-data-grid/)
- Gestão de Formulários: [React Hook Form](https://react-hook-form.com/)
- Utilitários: [Remask](https://github.com/estevanmaito/remask) (Máscaras de Input) & [React Icons](https://react-icons.github.io/react-icons/)
- API Externa: [API de Localidades do IBGE](https://servicodados.ibge.gov.br/api/docs/localidades)
- Persistência de Dados: LocalStorage (Simulação de Estados de Produção)

 Arquitetura do Projeto

A estrutura de pastas reflete as boas práticas de componentização e separação de conceitos no ecossistema React:
├── Components/         # Componentes globais reutilizáveis (Layout, Navbar, etc.)
├── pages/
│   ├── aeroporto/      # Fluxo de cadastro e edição consumindo a API do IBGE
│   ├── passagem/       # Listagem e reserva de passagens aéreas
│   ├── ticket/         # [id].js - Geração de cartão de embarque via rota dinâmica
│   ├── voos/           # Painel de controle e agendamento de voos comerciais
│   ├── aeronave/       # Configuração física da capacidade e frotas de aeronaves
│   ├── classe/         # Definição de precificação e limite de bagagens por classe
│   └── cadastro/       # Gerenciamento de informações cadastrais do passageiro
├── services/           # Camada de requisições HTTP (Instâncias Axios / Integração IBGE)
├── styles/             # Arquivos de estilização global e escopo modular
└── validators/         # Regras de validação isoladas para formulários (React Hook Form)

Como Executar O Projeto Localmante
1.Clone este repositório para sua máquina: git clone https://github.com/kaiosilva17/sistema-de-aviacao-react.git
2. entre na pasta que está o projeto: cd sistema-de-aviacao-react
3. instale as dependências: npm i
4. Inicie o Servidor: npm run dev
5. Abra o servidor no endereço http://localhost:3000 para testar a aplicação

Desenvolvido por Kaio Victor da Silva 🚀
💼 Desenvolvedor Front-end Júnior | React | JavaScript
📬 Contato:
•	E-mail: kvictor1711@gmail.com
•	Telefone/WhatsApp: (61) 99630-8684
•	LinkedIn:[in/kaio-victor-b31621286](https://www.linkedin.com/in/kaio-victor-b31621286)
•	GitHub: @kaiosilva17
