"use client";

import { useEffect, useState } from 'react';
import { CustomerType } from '@/app/api/customer/type';

const OneCustomer = () => {
  const [customer, setCustomer] = useState<CustomerType | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const id = window.location.pathname.split('/').pop(); // Get id from URL path

  useEffect(() => {
    const fetchCustomer = async () => {
      if (id) {
        setIsLoading(true);
        try {
          const res = await fetch(`/api/customer/${id}`);
          const customerData = await res.json();
          setCustomer(customerData);
        } catch (error) {
          console.error('Error fetching customer data:', error);
        }
        setIsLoading(false);
      }
    };
    fetchCustomer();
  }, [id]);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="w-1/2 flex flex-col">
      <div className="flex justify-between mb-5">
        <p className="text-center font-bold text-3xl">ヘルパー入退出画面</p>
      </div>
      {customer && (
        <div className="flex flex-col items-center justify-start">
          <p>訪問先：{JSON.stringify(customer)} 様 宅</p>
        </div>
      )}
    </div>
  );
};

export default OneCustomer;
