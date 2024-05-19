'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

const NewCustomer = () => {
  const router = useRouter();

  const [customerName, setName] = useState('');
  const [isFetching, setIsFetching] = useState(false);

  const handleSubmit = async () => {
    setIsFetching(true);
    {
      const response = await fetch('/api/customer', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ customerName }),
      });
      // const data = await response.json();
    }
    setIsFetching(false);

    router.push('/admin');
    router.refresh();
  };

  return (
    <div className="container mx-auto h-screen max-w-md">
      <div className="flex items-center justify-center h-full">
        <div className="mx-auto">
          <div className="flex flex-col space-y-6 md:space-y-10 w-full p-6 md:p-10 items-center">
            <form className="border-2 rounded-lg p-6 md:p-8 w-full">
              <p className="text-center font-bold text-xl md:text-3xl">
                Form (NewUser.tsx)
              </p>
              <div className="flex flex-col mb-4">
                <label
                  htmlFor="name"
                  className="mb-2 md:mb-4 text-lg md:text-xl"
                >
                  customerName
                </label>
                <input
                  onChange={(event) => {
                    setName(event.target.value);
                  }}
                  type="text"
                  name="name"
                  id="name"
                  className="border-2 p-3 text-lg md:text-xl"
                />
              </div>

              <div className="flex flex-col w-full">
                <p className="font-bold text-lg md:text-xl">
                  REST-API Payload:
                </p>
                <div className="border-2 items-center justify-center p-4 md:p-5 overflow-auto whitespace-normal">
                  {JSON.stringify({ customerName })}
                </div>
              </div>

              <div className="flex justify-center items-center mt-4">
                <button
                  type="button"
                  onClick={handleSubmit}
                  className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow-md transition duration-300 ease-in-out hover:bg-blue-600 hover:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg md:text-xl"
                >
                  {isFetching ? 'Creating...' : '確認'}
                </button>
                <div className="w-4" /> {/* Adjust the width to create space */}
                <Link
                  href="/admin"
                  className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow-md transition duration-300 ease-in-out hover:bg-blue-600 hover:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg md:text-xl"
                >
                  戻る
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewCustomer;
