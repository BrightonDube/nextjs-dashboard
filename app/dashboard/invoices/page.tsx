export const dynamic = 'force-dynamic';

import InvoicesTable from '@/app/ui/invoices/table';
import { fetchInvoicesPages } from '@/app/lib/data';
import Search from '@/app/ui/search';
import Pagination from '@/app/ui/invoices/pagination';

export default async function Page({ searchParams }: { searchParams?: Promise<{ query?: string; page?: string }> }) {
  const { query = '', page = '1' } = (await searchParams) ?? {};
  const currentPage = Number(page);
  const totalPages = await fetchInvoicesPages(query);

  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <Search placeholder="Search invoices..." />
      </div>
      <InvoicesTable query={query} currentPage={currentPage} />
      <div className="mt-5 flex w-full justify-center">
        <Pagination totalPages={totalPages} />
      </div>
    </div>
  );
}
