'use client';

import CameraJsQR2 from '@/app/componets/CameraJsQR2';
import Link from 'next/link';
import Image from 'next/image';

export default function Home() {
  return (
    <div className="w-screen">
      <div className="bg-pink-400 text-white font-semibold text-4xl p-2 flex items-center justify-center">
        訪問介護時間管理
      </div>
      <div className="mt-8">
        <Link
          className="p-5 bg-slate-300 rounded-xl"
          href="/admin"
        >
          管理者画面
        </Link>
      </div>

      <div className="flex h-screen items-center justify-center rounded-lg">
        <CameraJsQR2 />
        <div className="flex justify-center items-center"></div>
      </div>
    </div>
  );
}
