# Desafio Front-End - Bexs

## Execução

Para executar o projeto, é necessário ter yarn/npm, instalar as dependências e executar:

        yarn start

Para as requisições funcionarem, subir o servidor com:

        yarn server

### Detalhes

Estou usando json-server para simular uma API. Os dados da aplicação ficam no arquivo **db.json**.

Criei alguns dados aleatórios só pra mostrar o envio dos dados através de uma requisição. Não considerar como exemplos espelhados na realidade.

Optei por usar React Hooks por achar uma abordagem mais moderna e mais simples, embora usar classes ainda tenha uma abrangênica maior no mercado.

Deixei organizado num componente/page principal a maior parte do código, embora a ideia fosse fragmentar posteriormente. Isso é devido ao tempo curto pra realização do teste.

**Disclaimer:**

- A fonte Verdana na minha máquina é ligeiramente diferente da Verdana no XD, mesmo instalando novamente. Acredito que essa diferença não irá aparecer quando forem testar, mas como poderão observar no css, a fonte padrão definida é Verdana.

- Devido ao prazo, optei por:
  - Usar Create React App

  - Não usar Redux

  - Não criar uma página a mais pra representar Carrinho ou Resumo e poder usar Router

  - Não criar a rotina de testes (usaria JEST pra fazer), mas deixei as requisições AJAX, por ser mais rápido
