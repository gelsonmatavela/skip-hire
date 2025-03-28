'use client';

import { Info } from 'lucide-react';
import { useEffect, useState } from 'react';
import ModalMultipleSelectComponent from './components/modal/modal';


export default function NextPage() {
  const [storedData, setStoredData] = useState<{ code: string; city: string; streat_name: string; flat_number: string } | null>(null);
  const [modalParams, setModalParams] = useState<Promise<{ ModalMultipleSelect: string }> | null>(null);

  useEffect(() => {
    const data = localStorage.getItem('selectedAddress');
    if (data) {
        const parsedData = JSON.parse(data);
      setStoredData(JSON.parse(data));
      setModalParams(Promise.resolve({ ModalMultipleSelect: parsedData.city || '' }));
    }
  }, []);

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center gap-10 font-[family-name:var(--font-geist-sans)] sm:grid sm:grid-cols-1 sm:items-center sm:justify-center">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-center sm:justify-center">
        <div className="flex flex-col gap-4 items-center justify-center md:flex-col-reverse md:max-w-[full] md:min-w-[600px]">
          <div className="flex justify-center items-center">
            <h5 className='text-2xl font-bold'>Which type of waste best describes what you are disposing of?</h5>
          </div>
        </div>

        <div className="flex flex-col bg-blue-900/[0.25] w-4xl border-[1px] border-blue-500/[0.3] p-4 rounded-lg">
          <div className="flex items-center gap-2">
            <Info className="text-blue-500" />
            <span className="text-zinc-400">You can select multiple waste types. Some items may require special handling:</span>
          </div>
          <ul className="mt-2 ml-6 text-sm text-zinc-400 pl-6 list-disc">
            <li>Plasterboard and drywall materials</li>
            <li>Heavy construction materials (soil, concrete, etc.)</li>
          </ul>
        </div>

        <div>
             <ModalMultipleSelectComponent/>
        </div>

      </main>
    </div>
  );
};
