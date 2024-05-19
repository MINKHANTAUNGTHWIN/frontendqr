'use client';

import { CustomerType } from '@/app/api/customer/type';
import { customers } from '@/app/api/customer/type';
import Link from 'next/link';
import { useEffect, useState } from 'react';

const ViewCustomers = () => {
  const [customers, setCustomers] = useState<CustomerType[]>([]);
  const [reload, setReload] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchCustomers = async () => {
      setIsLoading(true);
      {
        const res = await fetch('/api/customer/');
        const customers = await res.json();
        setCustomers(customers);
      }
      setIsLoading(false);
    };
    fetchCustomers();
  }, [reload]);

  const handleReload = () => {
    setReload(!reload);
  };

  return (
    <div className="flex flex-col h-screen w-full items-center justify-center">
      <div className="border p-4 max-w-md max-h-96 rounded-lg overflow-hidden shadow-lg">
        <div className="h-full flex flex-col items-center justify-start">
          <p className="text-center font-bold text-3xl mb-4">
            Supabase: User table
          </p>
          <div className="overflow-y-auto w-full">
            {/* A container for the list of customers */}
            <div className="flex flex-col items-center justify-start whitespace-normal">
              {/* Mapping over the 'customers' array and rendering a Link for each */}
              {customers.map((customer) => (
                <Link
                  key={customer.id}
                  href={`/customer/login/${customer.id}`}
                  className="flex border-2 w-full px-2 py-1 hover:bg-gray-200"
                >
                  {JSON.stringify(customer)}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
      {/* A section for a button to reload data */}
      <div className="flex justify-center mt-4">
        {!isLoading ? (
          <button
            onClick={handleReload}
            type="button"
            className="bg-blue-500 text-white px-4 py-2 rounded-lg mr-2 hover:bg-blue-600"
          >
            Reload
          </button>
        ) : (
          <p>Reloading...</p>
        )}
        <Link
          href="/customer"
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
        >
          [追加]
        </Link>
      </div>
    </div>
  );
};

export default ViewCustomers;
