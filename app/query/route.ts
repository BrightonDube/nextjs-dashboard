import postgres from 'postgres';

const databaseUrl = process.env.POSTGRES_URL;
const sql = databaseUrl ? postgres(databaseUrl, { ssl: 'require' }) : null;

async function listInvoices() {
  if (!sql) throw new Error('POSTGRES_URL is not configured');

  const data = await sql`
    SELECT invoices.amount, customers.name
    FROM invoices
    JOIN customers ON invoices.customer_id = customers.id
    WHERE invoices.amount = 666;
  `;

  return data;
}

export async function GET() {
  if (!databaseUrl) {
    return Response.json({ error: 'POSTGRES_URL is not set' }, { status: 500 });
  }

  try {
    const rows = await listInvoices();
    return Response.json(rows);
  } catch (error) {
    return Response.json({ error: String(error) }, { status: 500 });
  }
}
