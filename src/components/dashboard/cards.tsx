import {
  BanknotesIcon,
  ClockIcon,
  UserGroupIcon,
  InboxIcon,
} from "@heroicons/react/24/outline";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { CardsSkeleton } from "../skeletons";

const iconMap = {
  collected: BanknotesIcon,
  customers: UserGroupIcon,
  pending: ClockIcon,
  invoices: InboxIcon,
};

export type Stats = {
  numberOfCustomers: number;
  numberOfInvoices: number;
  totalPaidInvoices: number;
  totalPendingInvoices: number;
};

async function fetchStats(): Promise<Stats> {
  const response = await axios.get<{ details: Stats }>(
    "https://nextjs-dashboard-brown-six-60.vercel.app/api/details"
  );

  return response.data.details;
}

export default function CardWrapper() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["stats"],
    queryFn: fetchStats,
  });

  console.log({ data, isLoading, isError });

  if (isLoading) {
    return <CardsSkeleton />;
  }

  if (isError || data === undefined) {
    return null;
  }

  const {
    numberOfCustomers,
    numberOfInvoices,
    totalPaidInvoices,
    totalPendingInvoices,
  } = data;

  return (
    <>
      {/* NOTE: comment in this code when you get to this point in the course */}

      <Card title="Collected" value={totalPaidInvoices} type="collected" />
      <Card title="Pending" value={totalPendingInvoices} type="pending" />
      <Card title="Total Invoices" value={numberOfInvoices} type="invoices" />
      <Card
        title="Total Customers"
        value={numberOfCustomers}
        type="customers"
      />
    </>
  );
}

export function Card({
  title,
  value,
  type,
}: {
  title: string;
  value: number | string;
  type: "invoices" | "customers" | "pending" | "collected";
}) {
  const Icon = iconMap[type];

  return (
    <div className="rounded-xl bg-gray-50 p-2 shadow-sm">
      <div className="flex p-4">
        {Icon ? <Icon className="h-5 w-5 text-gray-700" /> : null}
        <h3 className="ml-2 text-sm font-medium">{title}</h3>
      </div>
      <p
        className={`font-secondary truncate rounded-xl bg-white px-4 py-8 text-center text-2xl`}
      >
        {value}
      </p>
    </div>
  );
}
