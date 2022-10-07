# rivi-backend-node

## Instalação

Instalando o NVM:

```sh
# instala de nvm
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.38.0/install.sh | bash
```

Instalando o node 18:

```sh
# instala node 18
nvm install 18
```

Instalando o yarn:

```sh
#instala o yarn
npm i -g yarn
```

Instalando dependências de projeto:

```sh
yarn
```

Iniciando o servidor de desenvolvimento:

```sh
yarn dev
# ou
npm run dev
```

Entre em [http://localhost:4000](http://localhost:4000) para visualizar a aplicação.


## Ferramentas

Iniciando o projeto, é importante notar que foram aplicadas regras de

- Prettier
- Commit
- Prisma _(falta descrição)_

e não será possível realizar um commit bem sucedido caso o código adicionado fuja dos padrões especificados nas regras.

### **1. Prettier**

O Prettier é uma ferramenta de formatação de código que padroniza coisas como identação, espaçamento, etc.
As configurações do Prettier já estão definidas no projeto, porém é preciso adicioná-lo em seu editor de prefêrencia.

Caso esteja usando o VSCode, basta abrir o painel de _Extenções_ com <kbd>Ctrl</kbd> + <kbd>Shift</kbd> + <kbd>x</kbd> , pesquisar por "Prettier" e instalar.

As configurações do Prettier no VSCode também estão no repositório em [settings.json](.vscode/settings.json), portanto basta usar <kbd>Ctrl</kbd> + <kbd>s</kbd> que o editor salva e realiza as formatações.

Códigos que fojem dos padrões de formatação do Prettier serão rejeitados automaticamente.

Configurações definidas:

```
"semi": true         --> Adiciona ponto e vírgula no final
"singleQuote": true  --> Garante o uso de aspas simples sempre
"tabWidth": 2        --> Identa usando 2 espaços
"printWidth": 100    --> Define tamanho máximo de uma linha do código
```
### **2. Conventional Commits**

O Conventional Commits é um padrão de commit vastamente utilizado na indústria, inicialmente concebido pelo Google Angular, [veja mais sobre aqui!](https://www.conventionalcommits.org/en/v1.0.0/)

Nesse projeto, existem ferramentas para facilitar os commits de acordo com as regras estipuladas, basta escrever:

```sh
yarn commit
```

e um menu irá guiar o usuário para realizar o commit da maneira adequada.

É importante notar que o processo de commit também pode ser feito normalmente da maneira tradicional.

Commits que fojem dos padrões de commit do Conventional Commits serão rejeitados automaticamente.

### **3. Prisma**

...

## Banco de dados

Para realizar a conexão com o MongoDB, é necessário adicionar o URI na variável ``` MONGO_URI ``` no arquivo [.env](.env)
