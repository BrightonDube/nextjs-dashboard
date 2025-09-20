"use server";

import { z } from 'zod';
import { sql } from '@vercel/postgres';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import bcrypt from 'bcrypt';

const InvoiceSchema = z.object({
  id: z.string().optional(),
  customerId: z.string({ required_error: 'Customer is required' }),
  amount: z
    .string({ required_error: 'Amount is required' })
    .refine((val) => !Number.isNaN(Number(val)), 'Amount must be a number')
    .refine((val) => Number(val) > 0, 'Amount must be greater than 0'),
  status: z.enum(['pending', 'paid']),
});

export type InvoiceFormState = {
  errors?: {
    id?: string[];
    customerId?: string[];
    amount?: string[];
    status?: string[];
  };
  message?: string | null;
};

export async function createInvoice(
  _prevState: InvoiceFormState,
  formData: FormData,
): Promise<InvoiceFormState> {
  const parsed = InvoiceSchema.safeParse({
    customerId: formData.get('customerId'),
    amount: formData.get('amount'),
    status: formData.get('status'),
  });
  if (!parsed.success) {
    return { errors: parsed.error.flatten().fieldErrors } as InvoiceFormState;
  }

  const { customerId, amount, status } = parsed.data;
  // store amounts in cents
  const amountInCents = Math.round(Number(amount) * 100);

  await sql`
    INSERT INTO invoices (customer_id, amount, status, date)
    VALUES (${customerId}, ${amountInCents}, ${status}, NOW())
  `;

  revalidatePath('/dashboard/invoices');
  redirect('/dashboard/invoices');
}

export async function updateInvoice(
  _prevState: InvoiceFormState,
  formData: FormData,
): Promise<InvoiceFormState> {
  const parsed = InvoiceSchema.safeParse({
    id: formData.get('id'),
    customerId: formData.get('customerId'),
    amount: formData.get('amount'),
    status: formData.get('status'),
  });
  if (!parsed.success || !parsed.data.id) {
    if (!parsed.success) {
      return { errors: parsed.error.flatten().fieldErrors } as InvoiceFormState;
    }
    return { errors: { id: ['Missing id'] } } as InvoiceFormState;
  }

  const { id, customerId, amount, status } = parsed.data;
  const amountInCents = Math.round(Number(amount) * 100);

  await sql`
    UPDATE invoices
    SET customer_id = ${customerId}, amount = ${amountInCents}, status = ${status}
    WHERE id = ${id}
  `;

  revalidatePath('/dashboard/invoices');
  redirect('/dashboard/invoices');
}

export async function deleteInvoice(formData: FormData): Promise<void> {
  const id = formData.get('id')?.toString();
  if (!id) {
    throw new Error('Missing id');
  }

  await sql`DELETE FROM invoices WHERE id = ${id}`;

  revalidatePath('/dashboard/invoices');
}

export type AuthState = {
  error: string | null;
};

export async function authenticate(
  _prevState: AuthState,
  formData: FormData,
): Promise<AuthState> {
  const email = String(formData.get('email') ?? '');
  const password = String(formData.get('password') ?? '');
  if (!email || !password) {
    return { error: 'Email and password are required.' };
  }

  const result = await sql<{ id: string; email: string; password: string }>`
    SELECT id, email, password FROM users WHERE email = ${email} LIMIT 1
  `;
  const user = result.rows[0];
  if (!user) {
    return { error: 'Invalid credentials.' };
  }

  const match = await bcrypt.compare(password, user.password);
  if (!match) {
    return { error: 'Invalid credentials.' };
  }

  redirect('/dashboard');
}



