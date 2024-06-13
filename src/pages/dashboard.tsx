import Layout from "@/components/Layout";
import CardWrapper from "@/components/dashboard/cards";
import LatestInvoices from "@/components/dashboard/latest-invoices";
import RevenueChart from "@/components/dashboard/revenue-chart";

export type Invoice = {
  amount: string;
  id: string;
  name: string;
  image_url: string;
  email: string;
};

export const Dashboard = () => {
  return (
    <Layout>
      <main>
        <h1 className={`font-secondary mb-4 text-xl md:text-2xl`}>Dashboard</h1>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <CardWrapper />
        </div>
        <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-4 lg:grid-cols-8">
          <RevenueChart />
          <LatestInvoices />
        </div>
      </main>
    </Layout>
  );
};
