
<H1 align="center">Estrutura Next CRUD </H1>
<p align="center">🚀Criação de uma estrutura de crud em Next para referências futuras</p>


## Criação de projeto Next

```
npx create-next-app@latest nextjs-crud
```

### Adicionando pacotes 

```
npm i @heroicons/react
npm i clsx
npm i use-debounce
npm i zod
```

### Alterando moduleResolution

Alteração da resolução de módulo para node em tsconfig.json

```
...
"moduleResolution": "node",
...
```


# Diretório src\app

## invoices
  Diretório onde armazenará os componentes relacionados a está página e tem como caminho https://localhost:3000/invoices

  ### [id]
  ### create

  ![image](https://github.com/lucasmargui/React_Estrutura_CRUD/assets/157809964/ec63729a-f422-43c9-9923-3ebdf55407f2)

  
  ### page.tsx
  
```
  const [invoices, setInvoices] = useState<InvoicesTableD[] | null>(null);:
```

Aqui, estamos utilizando o hook useState para definir um estado chamado invoices.
useState retorna um array com dois elementos: o primeiro é o estado atual e o segundo é uma função para atualizar esse estado.
<InvoicesTableD[] | null> indica que invoices pode ser um array de objetos do tipo InvoicesTableD ou null.
(null) é o valor inicial do estado invoices.

```
useEffect(() => { ... }, [query, currentPage]);:
```

Este é um hook de efeito. Ele é usado para realizar operações secundárias após a renderização do componente, como buscar dados de uma API.
A função dentro de useEffect será executada sempre que as variáveis especificadas no segundo argumento (um array) mudarem de valor. No caso, query e currentPage.
Isso significa que sempre que query ou currentPage mudar, a função interna será chamada.

```
async function fetchData() { ... }:
```

É uma função assíncrona chamada fetchData que irá buscar os dados da API.
Utiliza await para aguardar a conclusão da chamada assíncrona fetchFilteredInvoices.
fetchFilteredInvoices é uma função que espera receber query e currentPage como argumentos para filtrar as faturas conforme necessário.

```
fetchFilteredInvoices(query,currentPage);:
```
É uma chamada a uma função fetchFilteredInvoices que provavelmente faz uma solicitação assíncrona a uma API para buscar faturas filtradas com base nos parâmetros query e currentPage.

```
setInvoices(invoicesData);:
```

Atualiza o estado invoices com os dados obtidos da chamada à API.
  
![image](https://github.com/lucasmargui/React_Estrutura_CRUD/assets/157809964/f88b15c0-39d8-4431-baa2-a0214c2bb159)

  


   
## lib
  Diretório onde você pode armazenar funções utilitárias, hooks customizados, lógica de negócios compartilhada ou qualquer outra coisa que não se encaixe  diretamente nas páginas ou componentes da sua aplicação.


## ui
  Contém componentes reutilizáveis de interface do usuário (UI) que são usados em várias partes da aplicação. Isso pode incluir botões, formulários, cartões, barras de progresso e outros elementos de interface comuns que são usados em diferentes partes da aplicação.
  
## globals.css
  Contém estilos globais que são aplicados a toda a aplicação. Por exemplo, definições de fonte, estilos de reset CSS, variáveis de cores globais, etc.

## layout.tsx
   Este é um componente de layout que define a estrutura básica da sua aplicação. Ele geralmente contém elementos que aparecem em todas as páginas, como cabeçalho, navegação, rodapé, etc. 

## page.tsx
Este é um arquivo que representa uma página específica da sua aplicação sendo a página inicial (index.tsx), e tem como caminho https://localhost:3000


