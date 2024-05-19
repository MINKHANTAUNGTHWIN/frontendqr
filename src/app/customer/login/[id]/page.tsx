'use client';
import { CustomerType } from '@/app/api/customer/type';
import { visitsType } from '@/app/api/inout/type';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import OneCustomer from '@/app/componets/OneCustomer';
import ViewHelpers from '@/app/componets/ViewHelpers';
import { HelperType } from '@/app/api/helper/type';
import { Imprima } from 'next/font/google';

export default function Home() {
  const [customerName, setCustomer] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const id = window.location.pathname.split('/').pop(); // Get id from URL path
  const [helpers, setHelpers] = useState<HelperType[]>([]);
  const [visits, setVisits] = useState<visitsType[]>([]);
  const [helperID, setHelperID] = useState<string | null>(null);
  const [helperName, setHelperName] = useState<string | null>(null);
  const [end_time, setend_time] = useState<Date | null>(null);

  const handlesubmitin = async () => {
    const response = await fetch('/api/inout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        helperID,
        helperName,
        customerName,
      }),
    });
    console.log(helperID, helperName, customerName);
  };

  const handlesubmitout = async () => {
    const response = await fetch('/api/inout', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        helperID,
        customerName,
        end_time,
      }),
    });
    console.log(helperID, customerName, end_time);
  };

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
    const fetchHelpers = async () => {
      setIsLoading(true);
      const res = await fetch('/api/helper/');
      const helpers = await res.json();
      setHelpers(helpers);
      setIsLoading(false);
    };
    fetchHelpers();
  }, [id]);

  const handleSelectHelper = (event: React.ChangeEvent<HTMLSelectElement>) => {
    console.log(event.target.value);
    const helper = JSON.parse(event.target.value);
    setHelperID(helper.helperID);
    setHelperName(helper.helperName);
    const fetchlogs = async () => {
      const res = await fetch('/api/inout', {
        method: 'GET',
        headers: {
          'Conten-Type': 'application/json',
        },
        body: JSON.stringify({
          //visitsid,
          helperID,
          customerName,
          //start_time,
          end_time,
        }),
      });
    };
    //const id = parseInt(event.target.value);
    //setSelectedHelper(id);
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="border p-8 max-w-xl rounded-lg">
        <div className="w-full">
          <div className="flex flex-col items-center">
            {customerName && (
              <div className="flex flex-col items-center justify-start">
                <p className="mb-6 text-xl ">
                  訪問先：{JSON.stringify(customerName)} 様 宅
                </p>
              </div>
            )}
          </div>

          <div className="w-full flex flex-col items-center">
            <div className="flex flex-col items-center justify-start">
              <label
                className="text-center font-bold text-3xl mb-14 t"
                htmlFor="helperID"
              >
                {' '}
                {/* Added mb-4 for bottom margin */}
                <select
                  onChange={handleSelectHelper}
                  value={helperID || ''}
                >
                  <option key={helperID}>
                    ID:{helperID} ヘルパー名:{helperName}
                  </option>
                  {helpers.map((helper) => (
                    <option
                      key={helper.id}
                      value={helper.helpername}
                    >
                      {helper.helpername}
                      {JSON.stringify(helper)}
                    </option>
                  ))}
                </select>
              </label>
            </div>
          </div>
          <div className="flex justify-center mb-8">
            <button
              onClick={handlesubmitin}
              className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
            >
              入出
            </button>
            <button
              onClick={handlesubmitout}
              className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
            >
              退出
            </button>
          </div>
          <hr />
        </div>
        <div>
          <div className="hover:text-blue-500">Start time: </div>{' '}
          {/* Added hover effect */}
          <hr />
          <div className="hover:text-blue-500">breaktime: </div>{' '}
          {/* Added hover effect */}
          <hr />
          <div className="hover:text-blue-500">endtime: </div>{' '}
          {/* Added hover effect */}
        </div>
      </div>
    </div>
  );
}
