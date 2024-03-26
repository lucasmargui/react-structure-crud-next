'use server';
 
import { z } from 'zod';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

const FormSchema = z.object({
  id: z.string(),
  customerId: z.string({
    invalid_type_error: 'Please select a customer.',// adicionar uma mensagem amigável ao lançar um erro
  }),
  amount: z.coerce
    .number()
    .gt(0, { message: 'Please enter an amount greater than $0.' }), //Como você está coercing (convertendo) o tipo de amount de string para número, ele será padrão para zero se a string estiver vazia. Vamos dizer ao Zod que sempre queremos que o amount seja maior que 0 com a função .gt().
  status: z.enum(['pending', 'paid'], {
    invalid_type_error: 'Please select an invoice status.', // adicionar uma mensagem amigável ao lançar um erro
  }),
  date: z.string(),
});
   
const CreateInvoice = FormSchema.omit({ id: true, date: true });

export type State = {
  errors?: {
    customerId?: string[];
    amount?: string[];
    status?: string[];
  };
  message?: string | null;
};
 
export async function createInvoice(prevState: State, formData: FormData) {
  // Validate form using Zod
  const validatedFields = CreateInvoice.safeParse({
    customerId: formData.get('customerId'),
    amount: formData.get('amount'),
    status: formData.get('status'),
  });
 
  // If form validation fails, return errors early. Otherwise, continue.
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Create Invoice.',
    };
  }
 
  // Prepare data for insertion into the database
  const { customerId, amount, status } = validatedFields.data;
  const amountInCents = amount * 100;
  const date = new Date().toISOString().split('T')[0];
 
  // Insert data into the database
  try {
    // await sql`
    //   INSERT INTO invoices (customer_id, amount, status, date)
    //   VALUES (${customerId}, ${amountInCents}, ${status}, ${date})
    // `;

    console.log("Inserindo no banco de dados.. " + customerId +"-"+ amountInCents +"-"+ status +"-");
  } catch (error) {
    // If a database error occurs, return a more specific error.
    return {
      message: 'Database Error: Failed to Create Invoice.',
    };
  }
 
  // Revalidate the cache for the invoices page and redirect the user.
  revalidatePath('/invoices');
  redirect('/invoices');
}

// Use Zod to update the expected types
const UpdateInvoice = FormSchema.omit({ id: true, date: true });
 
// ...
 


export async function updateInvoice(
  id: string,
  prevState: State,
  formData: FormData,
) {
  const validatedFields = UpdateInvoice.safeParse({
    customerId: formData.get('customerId'),
    amount: formData.get('amount'),
    status: formData.get('status'),
  });
 
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Update Invoice.',
    };
  }
 
  const { customerId, amount, status } = validatedFields.data;
  const amountInCents = amount * 100;
 
  try {
    // await sql`
    //   UPDATE invoices
    //   SET customer_id = ${customerId}, amount = ${amountInCents}, status = ${status}
    //   WHERE id = ${id}
    // `;

    console.log("Update no banco de dados.. " + customerId +"-"+ amountInCents +"-"+ status +"-");
  } catch (error) {
    return { message: 'Database Error: Failed to Update Invoice.' };
  }
 
  revalidatePath('/invoices');
  redirect('/invoices');
}

export async function deleteInvoice(id: string) {

  // throw new Error('Failed to Delete Invoice');

  try {
    // await sql`DELETE FROM invoices WHERE id = ${id}`;
    console.log("Delete no banco de dados.. " + id );
    revalidatePath('/invoices');
    return { message: 'Deleted Invoice.' };
  } catch (error) {
    return { message: 'Database Error: Failed to Delete Invoice.' };
  }
}