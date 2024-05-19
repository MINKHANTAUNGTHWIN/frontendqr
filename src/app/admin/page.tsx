import Link from 'next/link';
import ViewCustomers from '../componets/ViewCustomers';

export default function Home() {
  return (
    <div className="flex flex-col items-center">
      <ViewCustomers />
    </div>
  );
}
