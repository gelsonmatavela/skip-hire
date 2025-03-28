'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Input } from '@/components/ui/input/input';
import { Search, MapPin, X, Loader2, ChevronRight } from 'lucide-react';
import { fetchCodes } from '../../../data/data';

export default function CodeInput() {
  const router = useRouter();
  const [code, setCode] = useState('');
  const [options, setOptions] = useState<{ code: string; city: string; streat_name: string; flat_number: string }[]>([]);
  const [selectedOption, setSelectedOption] = useState<{ code: string; city: string; streat_name: string; flat_number: string } | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const saveToLocalStorage = (data: { code: string; city: string; streat_name: string; flat_number: string }) => {
    localStorage.setItem('selectedAddress', JSON.stringify(data));
  };

  useEffect(() => {
    const storedData = localStorage.getItem('selectedAddress');
    if (storedData) {
      setSelectedOption(JSON.parse(storedData));
    }
  }, []);

  useEffect(() => {
    if (code.length >= 3) {
      setIsLoading(true);
      fetchCodes(code)
        .then((data) => {
          setOptions(data);
          setIsLoading(false);
        })
        .catch((err) => {
          console.error('Error while fetching data:', err);
          setIsLoading(false);
        });
    } else {
      setOptions([]);
      setIsLoading(false);
    }
  }, [code]);

  const handleSelectOption = (option: { code: string; city: string; streat_name: string; flat_number: string }) => {
    setSelectedOption(option);
    setOptions([]);
    saveToLocalStorage(option);
  };

  const handleClearCode = () => {
    setCode('');
    setOptions([]);
    setSelectedOption(null);
    localStorage.removeItem('selectedAddress');
  };

  const handleContinue = () => {
    router.push('/wasteType');
  };

  return (
    <div className="flex flex-col items-center gap-4 p-4 w-120">
      <div className='flex flex-col text-center'> 
        <h1 className='font-bold text-5xl mb-5'>SKIP HIRE</h1>
        <p className='text-3xl'>With A Difference</p>
      </div>
      <div className="relative w-full">
        <Input
          type="text"
          placeholder="Enter your postcode or address"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          className="w-full pl-10 pr-10 outline-blue-700"
        />
        <Search className="absolute left-3 text-zinc-500 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
        {code && (
          <X
            className="absolute right-3 text-zinc-500 top-1/2 transform -translate-y-1/2 cursor-pointer"
            onClick={handleClearCode}
          />
        )}
        {isLoading && (
          <Loader2 className="absolute right-3 text-blue-500 top-1/2 transform -translate-y-1/2 animate-spin" />
        )}
      </div>

      {options.length > 0 && (
        <div className="flex flex-col w-full overflow-auto max-h-72 bg-zinc-800 rounded-lg mt-0">
          {options.map((option) => (
            <div
              key={option.code + option.flat_number}
              onClick={() => handleSelectOption(option)}
              className="flex items-center p-2 hover:bg-zinc-700 cursor-pointer"
            >
              <MapPin className="text-blue-500 w-6 h-6 mr-2" />
              <div className="flex-1">
                <span className="block text-white">{option.city}</span>
                <span className="text-sm text-zinc-400">{option.streat_name}</span>
                <span className="text-sm ml-2 text-zinc-400">{option.code}</span>
              </div>
            </div>
          ))}
        </div>
      )}

      {selectedOption && (
        <div className="w-full mt-4">
          <div className="mb-4">
            <label className="block text-sm text-gray-600">City</label>
            <Input type="text" value={selectedOption.city} readOnly className="w-full mt-2" />
          </div>
          <div className="mb-4">
            <label className="block text-sm text-gray-600">Street Name</label>
            <Input type="text" value={selectedOption.streat_name} readOnly className="w-full mt-2" />
          </div>

          <div className="mb-4">
            <label className="block text-sm text-gray-600">House/Flat Number</label>
            <Input type="text" value={selectedOption.flat_number} readOnly className="w-full mt-2" />
          </div>
          <button
            onClick={handleContinue}
            className="flex items-center justify-center mt-4 w-full py-2 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          >
            <span className="mr-2">Continue</span>
            <ChevronRight />
          </button>
        </div>
      )}
    </div>
  );
}
