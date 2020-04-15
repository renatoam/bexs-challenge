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

Deixei organizado num componente/page principal a maior parte do código, embora a ideia seja fragmentar o máximo possível posteriormente. Isso é devido ao tempo curto pra realização do teste.

Ainda falta implementar:

- Redux: pra melhorar o gerenciamento dos estados.
- Router: pra criar páginas "fakes" de *Carrinho* e *Confirmação/Resumo* da compra.
- Testes: a ideia é usar Jest e testar principalmente as funções (que estão num arquivo à parte) e as requisições.
- Webpack: a ideia é deixar de usar o Create React App e usar no ambiente próprio. Optei pelo CRA devido ao prazo curto.