Projeto de consulta de CEP utilizando a API ViaCEP.

O objetivo deste projeto foi implementar a mesma solução em diferentes linguagens para praticar consumo de APIs REST, tratamento de erros, organização de código e entrada de dados via terminal.

## Sobre mim

GitHub: [https://github.com/dvsous](https://github.com/dvsous)

LinkedIn: [https://linkedin.com/in/hnrsous](https://linkedin.com/in/hnrsous)

---

## Implementações

### Python

Pasta:

```text
address-lookup-py
```

Arquivo:

```text
addressLookup.py
```

Tecnologias:

* Python
* Requests
* ViaCEP API

Execução:

```bash
cd address-lookup-py

python addressLookup.py
```

---

### JavaScript (Node.js)

Implementação modularizada utilizando Node.js, com separação de responsabilidades entre validação, consumo da API e persistência de dados.

## Estrutura do Projeto

```text
address-lookup/
│
├── src/
│   ├── services/
│   │   └── viaCepService.js
│   ├── utils/
│   │   └── validator.js
│   ├── storage/
│   │   └── historyRepository.js
│   └── index.js
│
├── package.json
├── history.json
└── .gitignore
```

### Organização

* **services/**: Responsável pela comunicação com APIs externas.

  * `viaCepService.js`: Realiza as requisições para a API ViaCEP.

* **utils/**: Funções utilitárias e validações.

  * `validator.js`: Valida e formata o CEP informado pelo usuário.

* **storage/**: Persistência de dados.

  * `historyRepository.js`: Gerencia o histórico de consultas em arquivo JSON.

* **index.js**: Ponto de entrada da aplicação e interface de interação via terminal.

* **history.json**: Armazena o histórico das consultas realizadas.

* **package.json**: Configuração do projeto Node.js e scripts de execução.

## Como Executar

### Pré-requisitos

* Node.js 18 ou superior

Verifique a instalação:

```bash
node -v
```

### Executando o Projeto

Pasta:

```bash
cd address-lookup-py
```

Rodar:

```bash
npm start 
```

ou

```bash
npm.cmd start 
```

## Funcionalidades

* Consulta de CEP utilizando a API ViaCEP
* Validação de CEP
* Histórico de consultas
* Cache em memória para consultas repetidas
* Tratamento de erros de requisição
* Organização do código em módulos

## API Utilizada

ViaCEP

Endpoint:

```http
GET https://viacep.com.br/ws/{cep}/json/
```

---

## Conceitos Praticados

* Programação assíncrona com async/await
* Consumo de APIs REST
* Manipulação de JSON
* Tratamento de exceções
* Entrada e saída pelo terminal
* Modularização de código
* Separação de responsabilidades
* Persistência de dados em arquivo
* Cache em memória
* Comparação entre implementações Python e JavaScript