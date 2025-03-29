import React from "react";
import { motion } from "framer-motion";
import { Info } from "lucide-react";
import { PermitCheckSelect } from "../../../../data/permitCheck";

interface Item {
  id: number;
  icon: React.ComponentType<any>;
  title: string;
  subTitle: string;
  egs: string[];
}

interface PermitCheckSelectComponentProps {
  selectedItem: number | null; 
  onSelect: (id: number | null) => void; 
}

const PermitCheckSelectComponent: React.FC<PermitCheckSelectComponentProps> = ({
  selectedItem,
  onSelect,
}) => {
  return (
    <div className="relative p-5">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {PermitCheckSelect.map((item) => (
          <motion.div
            key={item.id}
            onClick={() => onSelect(selectedItem === item.id ? null : item.id)}
            whileHover={{ scale: 1.05, transition: { duration: 0.2, ease: "easeOut" } }}
            whileTap={{ scale: 0.95, transition: { duration: 0.1, ease: "easeIn" } }}
            className={`flex p-5 rounded-lg cursor-pointer transition-all ease-in-out duration-300 
              ${selectedItem === item.id
                ? "bg-blue-500/10 text-white border-2 border-blue-800 transform scale-105"
                : "bg-zinc-800 text-white border-2 border-zinc-600 hover:border-blue-800"}`}
          >
            <div
              className={`flex items-center justify-center w-14 h-14 rounded-full border transition-all ease-in-out duration-300
                ${selectedItem === item.id ? "bg-zinc-800 border-zinc-700 text-blue-500" : "text-zinc-300 border-zinc-500"}`}
            >
              <item.icon size={24} />
            </div>

            <div className="flex-1 ml-5">
              <h3 className="text-white font-semibold text-xl">{item.title}</h3>
              <p className="text-zinc-200 text-sm">{item.subTitle}</p>
              <div className="mt-3 text-zinc-300">
                <p className="text-zinc-200 text-xs">{Array.isArray(item.egs) ? item.egs.join(", ") : item.egs}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {selectedItem === 2 && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="absolute -bottom-25 right-0 w-auto flex bg-blue-900/[0.75] border border-blue-500/[0.3] p-6 rounded-lg"
        >
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-3">
              <Info className="text-blue-500" />
              <span className="text-blue-500 font-bold">1 Tonne Bag Required</span>
            </div>
            <span className="text-zinc-400 text-sm">For small amounts of plasterboard (up to 5%)</span>
          </div>
        </motion.div>
      )}

      {selectedItem === 2 && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="absolute -bottom-60 mb-5 right-0 w-auto flex bg-blue-900/[0.75] border border-blue-500/[0.3] p-6 rounded-lg"
        >
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-3">
              <Info className="text-blue-500" />
              <span className="text-blue-500 font-bold">1 Tonne Bag Required</span>
            </div>
            <span className="text-zinc-400 text-sm">For small amounts of plasterboard (up to 5%)</span>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default PermitCheckSelectComponent;
