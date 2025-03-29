"use client"

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Info } from "lucide-react";
import { useRouter } from "next/navigation";
import PermitCheckSelectComponent from "./components/PermitCheckSelectComponent";
import ButtonGroup from "@/components/button/ButtonGroup";
import ModalHeavyWaste from "../wasteType/components/floatModal/FloatModal";

export default function NextPage() {
  const [storedData, setStoredData] = useState<{ code: string; city: string; streat_name: string; flat_number: string } | null>(null);
  const [selectedItem, setSelectedItem] = useState<number | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const data = localStorage.getItem("selectedAddress");
    if (data) {
      setStoredData(JSON.parse(data));
    }

    const storedItem = localStorage.getItem("selectedItem");
    if (storedItem) {
      setSelectedItem(JSON.parse(storedItem));
    }
  }, []);

  useEffect(() => {
    if (selectedItem !== null) {
      localStorage.setItem("selectedItem", JSON.stringify(selectedItem));
    }
  }, [selectedItem]);

  const handleCancel = () => {
    window.history.back();
  };

  const handleContinue = () => {
    if (selectedItem === 3) {
      localStorage.setItem("selectedGardenWaste", "true");
      setIsModalOpen(true);
    } else if (selectedItem !== null) {
      localStorage.setItem("selectedGardenWaste", "false");
      router.push("/next-page");
    } else {
      setIsModalOpen(true);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleSelectItems = (id: number | null) => {
    setSelectedItem(id);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center gap-10 font-[family-name:var(--font-geist-sans)] sm:grid sm:grid-cols-1 sm:items-center sm:justify-center"
    >
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-center sm:justify-center">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
          className="flex flex-col gap-4 items-center justify-center md:flex-col-reverse md:max-w-[full] md:min-w-[600px]"
        >
          <div className="flex flex-col justify-center items-center">
            <h5 className="text-2xl font-bold text-center">Where will the skip be placed?</h5>
            <span className="text-center mt-5">This helps us determine if you need a permit for your skip</span>
          </div>
        </motion.div>
        <PermitCheckSelectComponent onSelect={handleSelectItems} selectedItem={selectedItem} />

        <div className="flex justify-center w-full">
          <ButtonGroup onCancel={handleCancel} onContinue={handleContinue} />
        </div>
      </main>

      {isModalOpen && <ModalHeavyWaste onClose={handleCloseModal} />}
    </motion.div>
  );
}
