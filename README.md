# Árvore de Testes

A Árvore de Testes se apresenta como uma ferramenta interessante e eficaz ao ser adicionada ao fluxo de trabalho do controle de qualidade de uma empresa de desenvolvimento de software. Desenvolvida com tecnologias atuais, no entanto consolidadas como React, NodeJS e MongoDB, otimizada para instalação em nuvem e com foco em instalações mais baratas ou até de graça, torna-se uma ferramenta com um baixíssimo impacto financeiro para seu uso. Com extrema capacidade e facilidade para melhorias na implementação e customizações, por ser de código-aberto pode ser incrementada de uma forma que toda a comunidade de usuários beneficiará das melhorias.

#### Comandos

Para iniciar com o projeto

Rode esse comando para instalar as dependências.
```sh

yarn bootstrap

```

#### Testando

Rode esse comando para testar.

```sh

yarn run test

```
Para rodar a aplicação localmente
```
cd packages/client && yarn dev
```

E

```
cd packages/api && yarn dev
```

Não se esqueça de adicionar o as suas credenciais MongoDB no arquivo .env.

### Instalação

É recomendado a instalação do front-end na ferramenta de hosting do Firebase.
O deploy automático já está configurado nas GitHub Actions.
(Qualquer hosting de front-end estático irá funcionar)

O back-end recomenda-se instalar no Heroku, também há deploy automático configurado com as Actions.
(Qualquer hosting de back-end com Docker funcionará)

O MongoDB recomenda-se o uso do MongoDB Atlas.
(Qualquer MongoDB deve funcionar)
