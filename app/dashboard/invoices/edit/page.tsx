import Breadcrumbs from '@/app/ui/invoices/breadcrumbs';
import EditInvoiceForm from '@/app/ui/invoices/edit-form';
import { fetchCustomers, fetchInvoiceById } from '@/app/lib/data';
import { notFound } from 'next/navigation';

export default async function Page({ searchParams }: { searchParams?: Promise<{ id?: string }> }) {
  const { id } = (await searchParams) ?? {};
  if (!id) {
    notFound();
  }

  const [invoice, customers] = await Promise.all([
    fetchInvoiceById(id!),
    fetchCustomers(),
  ]);

  if (!invoice) {
    notFound();
  }

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Invoices', href: '/dashboard/invoices' },
          {
            label: 'Edit Invoice',
            href: `/dashboard/invoices/edit?id=${id}`,
            active: true,
          },
        ]}
      />
      <EditInvoiceForm invoice={invoice} customers={customers} />
    </main>
  );
}


