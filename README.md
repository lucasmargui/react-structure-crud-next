
<H1 align="center">Next CRUD Structure </H1>
<p align="center">🚀Creating a crud structure in Next for future references</p>


## Requirements
- next
- heroicons
- clsx
- use-debounce
- zod

 <div align="center">
 <h2>Read/Delete</h2>
 <img src="https://github.com/lucasmargui/React_Estrutura_CRUD/assets/157809964/6de0b53d-8888-48f7-b991-6d63c37863e4" style="width:100%">
 <h2>Create</h2>
 <img src="https://github.com/lucasmargui/React_Estrutura_CRUD/assets/157809964/367ca950-55f8-428c-9fdd-7cadb7bedd05" style="width:100%">
 <h2>Update</h2>
 <img src="https://github.com/lucasmargui/React_Estrutura_CRUD/assets/157809964/5a9f97ed-45e3-46c5-8483-50f5a9d2cfc0" style="width:100%">
 </div>

## Create project Next 

```
npx create-next-app@latest nextjs-crud
```

### Adding packages

```
npm i @heroicons/react
npm i clsx
npm i use-debounce
npm i zod
```

### Changing moduleResolution

Changing module to node resolution in tsconfig.json

```
...
"moduleResolution": "node",
...
```


# src\app directory

## invoices
 Directory where the components related to this page will be stored and the path is https://localhost:3000/invoices



 ### page.tsx - READ/DELETE

 #### CreateInvoice component:
 - will redirect to the /create path, i.e. http://localhost:3000/dashboard/invoices/create, rendering a Creation Form

 #### Table component:

 ```
 const [invoices, setInvoices] = useState<InvoicesTableD[] | null>(null);:
 ```

 Here, we are using the useState hook to define a state called invoices.
 useState returns an array with two elements: the first is the current state and the second is a function to update this state.
 <InvoicesTableD[] | null> indicates that invoices can be an array of objects of type InvoicesTableD or null.
 (null) is the initial value of the invoices state.

 ```
 useEffect(() => { ... }, [query, currentPage]);:
 ```

 This is an effect hook. It is used to perform secondary operations after the component renders, such as fetching data from an API.
 The function inside useEffect will be executed whenever the variables specified in the second argument (an array) change value. In this case, query and currentPage.
 This means that whenever query or currentPage changes, the internal function will be called.

 ```
 async function fetchData() { ... }:
 ```

 It is an asynchronous function called fetchData that will fetch data from the API.
 Uses await to wait for the fetchFilteredInvoices asynchronous call to complete.
 fetchFilteredInvoices is a function that expects to receive query and currentPage as arguments to filter invoices as needed.

 ```
 fetchFilteredInvoices(query,currentPage);:
 ```
 It is a call to a fetchFilteredInvoices function that makes an asynchronous request to an API to fetch filtered invoices based on the query and currentPage parameters.

 ```
 setInvoices(invoicesData);:
 ```

 Updates the invoices state with the data obtained from the API call.

 ![image](https://github.com/lucasmargui/React_Estrutura_CRUD/assets/157809964/f88b15c0-39d8-4431-baa2-a0214c2bb159)


 Each data rendered in the table will generate 2 components of UpdateInvoice and DeleteInvoice buttons.

 - UpdateInvoice will redirect to the path [id]/edit, i.e. http://localhost:3000/dashboard/invoices/5/edit passing an invoice as props in the Form in its rendering
 - DeleteInvoice will invoke the submit function of a form by sending the id through the deleteInvoiceWithId action located in actions, which is the deleteInvoice function with the id's bind.


 ![image](https://github.com/lucasmargui/React_Estrutura_CRUD/assets/157809964/d8aa4fed-fad3-4726-8e39-09e271e8bdb5)

### [id] - UPDATE

```
<Form invoice={invoice} customers={customers} />
```
Rendering the form component by passing invoice in the props as it is an edit

![image](https://github.com/lucasmargui/React_Estrutura_CRUD/assets/157809964/caabb467-8bae-496c-ae8a-e8aef01f9cfb)




![image](https://github.com/lucasmargui/React_Estrutura_CRUD/assets/157809964/c6c7c275-d949-4637-bc10-94afd1eebae1)

- [state, dispatch]: This is a destructuring of an array. Here we are extracting these elements into variables called state and dispatch.
 - useFormState(updateInvoiceWithId, initialState): function that returns an array with two elements. The useFormState function is a custom function that takes care of the state of a form in React. Returns an array with two elements: the current state of the form and a function to update that state. updateInvoiceWithId is an updateInvoice with id bound in the function
 - FormSchema: Here a validation scheme is being defined for the form data. Zod is being used, which is a schema validation library in TypeScript. The FormSchema is an object that defines the fields needed to create an invoice.
 - CreateInvoice: This is a new scheme created from FormSchema, where the id and date fields are omitted, because they are automatically generated when the invoice is created.
 - State: Here a type of state is being defined that can have errors (validation errors) and an optional message.
 - updateInvoice: This is an asynchronous function that receives the id, previous state (prevState), form data (formData). The function validates form data using Zod's safeParse method. If validation fails, it returns validation errors. Otherwise, the data is prepared for insertion into the database. However, the actual insertion into the database is commented out, so the function just simulates the insertion, displaying the data in the console. If there are any errors during the simulated insert, a database-specific error message is returned. After the (simulated) insertion process, the function executes revalidatePath and redirect, which are functions that update the invoice page cache and redirect the user to the invoice page, respectively.


 ### create - CREATE

```
<Form customers={customers} />
```
Rendering of the form component omitting invoice in the props as it is a creation.


![image](https://github.com/lucasmargui/React_Estrutura_CRUD/assets/157809964/46efbd05-4f72-4585-89b5-9d2a71729f7b)


- [state, dispatch]: This is a destructuring of an array. Here we are extracting these elements into variables called state and dispatch.
 - useFormState(createInvoice, initialState): function that returns an array with two elements. The useFormState function is a custom function that takes care of the state of a form in React. Returns an array with two elements: the current state of the form and a function to update that state.
 - FormSchema: Here a validation scheme is being defined for the form data. Zod is being used, which is a schema validation library in TypeScript. The FormSchema is an object that defines the fields needed to create an invoice.
 - CreateInvoice: This is a new scheme created from FormSchema, where the id and date fields are omitted, because they are automatically generated when the invoice is created.
 - State: Here a type of state is being defined that can have errors (validation errors) and an optional message.
 - createInvoice: This is an asynchronous function that receives the previous state (prevState) and form data (formData). The function validates form data using Zod's safeParse method. If validation fails, it returns validation errors. Otherwise, the data is prepared for insertion into the database. However, the actual insertion into the database is commented out, so the function just simulates the insertion, displaying the data in the console. If there are any errors during the simulated insert, a database-specific error message is returned. After the (simulated) insertion process, the function executes revalidatePath and redirect, which are functions that update the invoice page cache and redirect the user to the invoice page, respectively.

## lib
 Directory where you can store utility functions, custom hooks, shared business logic, or anything else that doesn't fit directly into your application's pages or components.


## ui
 Contains reusable user interface (UI) components that are used in various parts of the application. This can include buttons, forms, cards, progress bars, and other common interface elements that are used in different parts of the application.

## globals.css
 Contains global styles that are applied to the entire application. For example, font definitions, CSS reset styles, global color variables, etc.

## layout.tsx
 This is a layout component that defines the basic structure of your application. It usually contains elements that appear on every page, such as header, navigation, footer, etc.

## page.tsx
This is a file that represents a specific page of your application, being the home page (index.tsx), and its path is https://localhost:3000






 







