"use client";

import { useState } from "react";
import { Button } from "../../components/button/Button";
import { CheckCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

const skipes = [
  {
    id: 1,
    image: "/images/skipe1.png",
    title: "4 Yard Skip",
    subtitle: "7 day hire period",
    price: "£234",
    period: "per week",
  },
  {
    id: 2,
    image: "/images/skipe2.png",
    title: "6 Yard Skip",
    subtitle: "7 day hire period",
    price: "£298",
    period: "per week",
  },
  {
    id: 3,
    image: "/images/skipe3.png",
    title: "8 Yard Skip",
    subtitle: "7 day hire period",
    price: "£304",
    period: "per week",
  },
  {
    id: 4,
    image: "/images/skipe3.png",
    title: "14 Yard Skip",
    subtitle: "7 day hire period",
    price: "£454",
    period: "per week",
  },
  {
    id: 5,
    image: "/images/skipe3.png",
    title: "16 Yard Skip",
    subtitle: "7 day hire period",
    price: "£556",
    period: "per week",
  },
  {
    id: 6,
    image: "/images/skipe3.png",
    title: "20 Yard Skip",
    subtitle: "7 day hire period",
    price: "£763",
    period: "per week",
  },
];

const disabledSkips = [Math.floor(Math.random() * skipes.length), Math.floor(Math.random() * skipes.length)];

export default function SkipSelection() {
  const [selectedSkip, setSelectedSkip] = useState<number | null>(null);
  const router = useRouter();

  const handleSelect = (id: number) => {
    setSelectedSkip(id);
  };

  const handleContinue = () => {
    router.push("/nextPage");
  };

  const handleBack = () => {
    router.back();
  };

  return (
    <div className="container mx-auto p-6">
      {selectedSkip === null ? (
        <>
          <div className="text-center ">
            <h1 className="text-2xl font-bold mb-6">Choose Your Skip Size</h1>
            <p className="font-medium mb-6">Select the skip size that best suits your needs</p>
          </div>
          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
            initial={{ y: 50, opacity: 0 }} 
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            {skipes.map((skip) => {
              const isDisabled = disabledSkips.includes(skip.id - 1);
              return (
                <div
                  key={skip.id}
                  className={`border border-zinc-700 rounded-lg overflow-hidden shadow-lg bg-zinc-900 text-white ${
                    selectedSkip === skip.id ? "border-blue-500" : ""
                  }`}
                >
                  <div className="relative">
                    <img
                      src={skip.image}
                      alt={skip.title}
                      className="w-full h-48 object-cover"
                    />
                    <div className="absolute bottom-0 left-0 w-34 rounded-tr-2xl bg-blue-500/80 bg-opacity-60 text-white font-bold text-center py-2">
                      {skip.title}
                    </div>
                  </div>
                  <div className="p-4">
                    <div className="flex justify-between items-center">
                      <h2 className="text-lg font-semibold">{skip.title}</h2>
                      <span className="text-sm text-zinc-400">{skip.subtitle}</span>
                    </div>
                    <div className="flex justify-between items-center mt-2">
                      <span className="text-xl font-bold">{skip.price}</span>
                      <span className="text-sm text-zinc-400">{skip.period}</span>
                    </div>
                    <Button
                      variant={isDisabled ? "outline" : "default"}
                      className={`text-center mt-4 w-full py-2 flex items-center justify-center gap-2 ${isDisabled ? 'bg-red-500 cursor-not-allowed' : ''}`} 
                      onClick={() => !isDisabled && handleSelect(skip.id)}
                      disabled={isDisabled}
                    >
                      {isDisabled ? "Skip unavailable" : (
                        <>
                          {selectedSkip === skip.id ? "Selected" : "Select this skip"}
                        </>
                      )}
                    </Button>
                  </div>
                </div>
              );
            })}
          </motion.div>
        </>
      ) : (
        <motion.div
          className="border border-zinc-700 rounded-lg overflow-hidden shadow-lg bg-zinc-900 text-white p-6"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }} 
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-xl font-semibold mb-4">Selected Skip</h2>
          <div className="flex justify-between items-center mb-4">
            <span className="text-lg">
              {skipes.find((skip) => skip.id === selectedSkip)?.title}
            </span>
            <span className="text-sm text-zinc-400">
              {skipes.find((skip) => skip.id === selectedSkip)?.subtitle}
            </span>
          </div>
          <div className="flex justify-between items-center mb-4">
            <span className="text-xl font-bold">
              {skipes.find((skip) => skip.id === selectedSkip)?.price}
            </span>
            <span className="text-sm text-zinc-400">
              {skipes.find((skip) => skip.id === selectedSkip)?.period}
            </span>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" className="w-32 py-2" onClick={handleBack}>
              Back
            </Button>
            <Button variant="default" className="w-32 py-2" onClick={handleContinue}>
              Continue
            </Button>
          </div>

          <div className="mt-6">
            <img
              src={skipes.find((skip) => skip.id === selectedSkip)?.image}
              alt="Selected Skip"
              className="w-full h-auto border border-zinc-700 rounded-lg"
            />
          </div>
        </motion.div>
      )}
    </div>
  );
}
