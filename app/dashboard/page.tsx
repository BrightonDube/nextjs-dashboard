
export const dynamic = 'force-dynamic';

import CardWrapper, { Card } from '@/app/ui/dashboard/cards';
import LatestInvoices from '@/app/ui/dashboard/latest-invoices';
import RevenueChart from '@/app/ui/dashboard/revenue-chart';
import { fetchCardData, fetchLatestInvoices, fetchRevenue } from '@/app/lib/data';

export default async function Page() {
  const cards = await fetchCardData();
  const latestInvoices = await fetchLatestInvoices();
  const revenue = await fetchRevenue();

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
        <Card title="Collected" value={cards.totalPaidInvoices ?? cards.totalPaidInvoices} type="collected" />
        <Card title="Pending" value={cards.totalPendingInvoices ?? cards.totalPendingInvoices} type="pending" />
        <Card title="Total Invoices" value={cards.numberOfInvoices} type="invoices" />
        <Card title="Total Customers" value={cards.numberOfCustomers} type="customers" />
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-6">
        <RevenueChart revenue={revenue} />
        <LatestInvoices latestInvoices={latestInvoices} />
      </div>
    </div>
  );
}
