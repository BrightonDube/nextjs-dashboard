import InvoicesTable from '@/app/ui/invoices/table';
import { fetchFilteredInvoices } from '@/app/lib/data';

export default async function Page() {
  const invoices = await fetchFilteredInvoices('', 1);

  return <InvoicesTable query="" currentPage={1} />;
}
