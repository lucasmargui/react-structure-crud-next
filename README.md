
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

![image](https://github.com/lucasmargui/React_Estrutura_CRUD/assets/157809964/caabb467-8bae-496c-ae8a-e8aef01f9cfb)
```
<Form invoice={invoice} customers={customers} />
```
Renderização do componente de formulário passando invoice nas props pois se trata de uma edição



 

  
  ### create

```
<Form customers={customers} />
```
Renderização do componente de formulário omitindo invoice nas props pois se trata de uma criação.


![image](https://github.com/lucasmargui/React_Estrutura_CRUD/assets/157809964/46efbd05-4f72-4585-89b5-9d2a71729f7b)

 - [state, dispatch]: Isso é uma desestruturação de um array. Aqui estamos extraindo esses elementos em variáveis chamadas state e dispatch.
 - useFormState(createInvoice, initialState): função que retorna um array com dois elementos. A função useFormState é uma função personalizada que cuida do estado de um formulário no React. Presumivelmente, ela retorna um array com dois elementos: o estado atual do formulário e uma função para atualizar esse estado.
 - FormSchema: Aqui está sendo definido um esquema de validação para os dados do formulário. Está sendo utilizado o Zod, que é uma biblioteca de validação de esquema em TypeScript. O FormSchema é um objeto que define os campos necessários para criar uma fatura.
 - CreateInvoice: Este é um novo esquema criado a partir do FormSchema, onde se omite o campo id e date, porque eles são gerados automaticamente no momento da criação da fatura.
 - State: Aqui está sendo definido um tipo de estado que pode ter errors (erros de validação) e uma message opcional.
 - createInvoice: Esta é uma função assíncrona que recebe o estado anterior (prevState) e os dados do formulário (formData). A função faz a validação dos dados do formulário usando o método safeParse do Zod. Se a validação falhar, ela retorna os erros de validação. Caso contrário, os dados são preparados para inserção no banco de dados. No entanto, a inserção real no banco de dados está comentada, então a função apenas simula a inserção, exibindo os dados no console. Se houver algum erro durante a inserção simulada, uma mensagem de erro específica do banco de dados é retornada. Após o processo de inserção (simulado), a função executa revalidatePath e redirect, que são funções que atualizam o cache da página de faturas e redirecionam o usuário para a página de faturas, respectivamente.
   




  
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


