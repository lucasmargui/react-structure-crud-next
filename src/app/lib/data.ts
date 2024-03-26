// import { sql } from '@vercel/postgres';
import {
  CustomerField,
  CustomersTableType,
  InvoiceForm,
  InvoicesTableD,
  Invoice,
  LatestInvoiceRaw,
  User,
  Revenue,
} from './definitions';

import { unstable_noStore as noStore } from 'next/cache';


import { formatCurrency } from './utils';

import placeholderData from '../../../scripts/placeholder-data';



const ITEMS_PER_PAGE = 6;

function matchesQuery(invoice:InvoicesTableD, query: string) {
  
  return (
      invoice.name.toString().includes(query) ||
      invoice.email.toString().includes(query) ||
      invoice.amount.toString().includes(query) ||
      invoice.date.toString().includes(query) ||
      invoice.status.toLowerCase().includes(query.toLowerCase())
  );
}



export async function fetchFilteredInvoices(
  query: string,
  currentPage: number,
) {

  noStore();

  const offset = (currentPage - 1) * ITEMS_PER_PAGE;
  
  try {
    // const invoices = await sql<InvoicesTable>`
    //   SELECT
    //     invoices.id,
    //     invoices.amount,
    //     invoices.date,
    //     invoices.status,
    //     customers.name,
    //     customers.email,
    //     customers.image_url
    //   FROM invoices
    //   JOIN customers ON invoices.customer_id = customers.id
    //   WHERE
    //     customers.name ILIKE ${`%${query}%`} OR
    //     customers.email ILIKE ${`%${query}%`} OR
    //     invoices.amount::text ILIKE ${`%${query}%`} OR
    //     invoices.date::text ILIKE ${`%${query}%`} OR
    //     invoices.status ILIKE ${`%${query}%`}
    //   ORDER BY invoices.date DESC
    //   LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}
    // `;

    // Função para realizar a busca de acordo com os critérios


  // Filtrar a lista de faturas de acordo com o critério de busca
  const filteredInvoices = placeholderData.invoicesTable.filter(invoice => matchesQuery(invoice, query));

  // Aplicar ordenação e paginação
  const sortedAndPaginatedInvoices = filteredInvoices
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())// Ordenar por data decrescente
      .slice(offset, offset + ITEMS_PER_PAGE); // Paginação

  return sortedAndPaginatedInvoices;


    // return invoices.rows;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch invoices.');
  }
}

export async function fetchInvoicesPages(query: string) {
 
  noStore();
 
  try {
  //   const count = await sql`SELECT COUNT(*)
  //   FROM invoices
  //   JOIN customers ON invoices.customer_id = customers.id
  //   WHERE
  //     customers.name ILIKE ${`%${query}%`} OR
  //     customers.email ILIKE ${`%${query}%`} OR
  //     invoices.amount::text ILIKE ${`%${query}%`} OR
  //     invoices.date::text ILIKE ${`%${query}%`} OR
  //     invoices.status ILIKE ${`%${query}%`}
  // `;

     const totalPages = Math.ceil(Number(placeholderData.invoicesTable.length / ITEMS_PER_PAGE));
    return totalPages;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch total number of invoices.');
  }
}

export async function fetchInvoiceById(id: string) {
  
  noStore();
  
  try {
    // const data = await sql<InvoiceForm>`
    //   SELECT
    //     invoices.id,
    //     invoices.customer_id,
    //     invoices.amount,
    //     invoices.status
    //   FROM invoices
    //   WHERE invoices.id = ${id};
    // `;

    // const invoice = data.rows.map((invoice) => ({
    //   ...invoice,
    //   // Convert amount from cents to dollars
    //   amount: invoice.amount / 100,
    // }));
    //return invoice[0];

    

  
    const invoice = placeholderData.invoicesTable.find(invoice => invoice.id === id);



    
    if (invoice !== undefined) {

      const convertedInvoice: InvoiceForm = {
        id: invoice.id,
        customer_id: invoice.customer_id,
        amount: invoice.amount,
        status: invoice.status, 
        
      };
      return convertedInvoice;
      
    }else{
      const convertedInvoice: InvoiceForm = {
        id: '',
        customer_id: '',
        amount: 0,
        status: '', 
      };
      return convertedInvoice;
    }
     
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch invoice.');
  }
}

export async function fetchCustomers() {
  
  
  
  try {
    // const data = await sql<CustomerField>`
    //   SELECT
    //     id,
    //     name
    //   FROM customers
    //   ORDER BY name ASC
    // `;

     const customers = placeholderData.customers;
     return customers;
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch all customers.');
  }
}

export async function fetchFilteredCustomers(query: string) {
  

  
  try {
    // const data = await sql<CustomersTableType>`
		// SELECT
		//   customers.id,
		//   customers.name,
		//   customers.email,
		//   customers.image_url,
		//   COUNT(invoices.id) AS total_invoices,
		//   SUM(CASE WHEN invoices.status = 'pending' THEN invoices.amount ELSE 0 END) AS total_pending,
		//   SUM(CASE WHEN invoices.status = 'paid' THEN invoices.amount ELSE 0 END) AS total_paid
		// FROM customers
		// LEFT JOIN invoices ON customers.id = invoices.customer_id
		// WHERE
		//   customers.name ILIKE ${`%${query}%`} OR
    //     customers.email ILIKE ${`%${query}%`}
		// GROUP BY customers.id, customers.name, customers.email, customers.image_url
		// ORDER BY customers.name ASC
	  // `;

    // const customers = data.rows.map((customer) => ({
    //   ...customer,
    //   total_pending: formatCurrency(customer.total_pending),
    //   total_paid: formatCurrency(customer.total_paid),
    // }));

    // return customers;
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch customer table.');
  }
}


