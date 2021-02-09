# LAMA

Projeto Back-end Labenu Musical Awards, desenvolvido no curso Full Stack da Labenu. <br/>
Estrutura elaborada para receber as seguintes funcionalidades:

- Signup / Login
- Create Band
- Band Details by ID or name
- Create Show
- Search shows by day

Pode ser executado pelo terminal do VS Code ou pelo deploys feito. Sendo ele:
- https://lama-jess.herokuapp.com/ <br/>
(Colocando a referencia que deseja usar após a / no final do link. Ex: https://lama-jess.herokuapp.com/user/signup)

### Bibliotecas utilizadas

- Ambiente de execução: Node.js
- Framework para servidor: Express
- Compartilhamento de recursos: Cors
- Token criptografado: JWT

## Comandos utilizados para executar corretamente o código no VS Code:

Após clonado este repositório em um diretório de sua escolha, execute o seguinte comando:
```
npm install
```
Instale as dependencias: node.js, express, cors:
```
npm install @types/node --save-dev
npm install @types/express --save-dev
npm install @types/cors --save-dev
```

Existe um arquivo chamado *.env.example*, que tem as variáveis para configurar o banco de dados local. <br/>

Por fim, pode ser executado com url local *http://localhost:3003/* (contém um arquivo *.rest* que pode ser utilizado para rodar, não precisando utilizar Postman) ou pela que foi feito deploy na plataforma Heroku.