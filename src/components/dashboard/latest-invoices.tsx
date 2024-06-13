import { ArrowPathIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";
import { Invoice } from "@/pages/dashboard";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { LatestInvoicesSkeleton } from "../skeletons";

async function fetchInvoices(): Promise<Invoice[]> {
  const invoicesResponse = await axios.get<{ invoices: Invoice[] }>(
    "https://nextjs-dashboard-brown-six-60.vercel.app/api/invoices"
  );

  return invoicesResponse.data.invoices;
}

export default function LatestInvoices() {
  const {
    data: invoices,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["invoices"],
    queryFn: fetchInvoices,
  });

  console.log({ invoices });

  if (isLoading) {
    return <LatestInvoicesSkeleton />;
  }

  if (isError || invoices === undefined) {
    return null;
  }

  return (
    <div className="flex w-full flex-col md:col-span-4">
      <h2 className={`font-secondary mb-4 text-xl md:text-2xl`}>
        Latest Invoices
      </h2>
      <div className="flex grow flex-col justify-between rounded-xl bg-gray-50 p-4">
        {/* NOTE: comment in this code when you get to this point in the course */}

        <div className="bg-white px-6">
          {invoices.map((invoice, i) => {
            return (
              <div
                key={invoice.id}
                className={clsx(
                  "flex flex-row items-center justify-between py-4",
                  {
                    "border-t": i !== 0,
                  }
                )}
              >
                <div className="flex items-center">
                  <img
                    src={invoice.image_url}
                    alt={`${invoice.name}'s profile picture`}
                    className="mr-4 rounded-full"
                    width={32}
                    height={32}
                  />
                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold md:text-base">
                      {invoice.name}
                    </p>
                    <p className="hidden text-sm text-gray-500 sm:block">
                      {invoice.email}
                    </p>
                  </div>
                </div>
                <p
                  className={`font-secondary truncate text-sm font-medium md:text-base`}
                >
                  {invoice.amount}
                </p>
              </div>
            );
          })}
        </div>
        <div className="flex items-center pb-2 pt-6">
          <ArrowPathIcon className="h-5 w-5 text-gray-500" />
          <h3 className="ml-2 text-sm text-gray-500 ">Updated just now</h3>
        </div>
      </div>
    </div>
  );
}
