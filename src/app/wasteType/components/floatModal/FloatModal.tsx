import React, { useState, useEffect } from "react";
import { modalHeavyWasteTypes } from "../../../../../data/modalHeavyWasteTypes";
import { Info } from "lucide-react";
import PlasterBoard from "./PlasterBoard";
import { useRouter } from "next/navigation";

interface ModalProps {
  onClose: () => void;
}

const ModalHeavyWaste: React.FC<ModalProps> = ({ onClose }) => {
  const [selectedItems, setSelectedItems] = useState<number[]>([]);
  const [isSecondModalOpen, setIsSecondModalOpen] = useState(false);
  const router = useRouter();

  const handleSelect = (id: number) => {
    setSelectedItems((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleContinue = () => {
    router.push("/skipeSelect");
    onClose();
  };

  useEffect(() => {
    const handleRouteChange = () => onClose();
    window.addEventListener("popstate", handleRouteChange);
    return () => {
      window.removeEventListener("popstate", handleRouteChange);
    };
  }, [onClose]);

  return (
    <>
      {!isSecondModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50">
          <div className="bg-zinc-900 text-white p-6 rounded-lg shadow-lg w-full sm:w-[90%] md:w-[70%] lg:w-[50%] xl:w-[40%] flex flex-col max-h-[80vh] overflow-y-auto scrollbar-none border-r border-zinc-200">
            <h2 className="text-xl text-left mb-4">Heavy Waste Types</h2>

            <div className="flex flex-col bg-yellow-700/20 w-full border-1 border-yellow-300/50 p-4 rounded-lg mb-4">
              <div className="flex flex-col items-start gap-2">
                <div className="flex items-center gap-2">
                  <Info className="text-yellow-500" />
                  <span className="text-yellow-500 font-bold">
                    Important Notice
                  </span>
                </div>
                <span className="text-zinc-400">
                  Heavy waste types have specific requirements and restrictions.
                  Some skip sizes may not be available for heavy waste disposal.
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4 w-full">
              {modalHeavyWasteTypes.map((item) => (
                <div
                  key={item.id}
                  onClick={() => handleSelect(item.id)}
                  className={`flex flex-col p-3 rounded-md cursor-pointer transition-all ease-in-out duration-300 
                    ${
                      selectedItems.includes(item.id)
                        ? "border-1 border-zinc-700"
                        : "border-1 border-zinc-700 hover:border-blue-600/50"
                    }`}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <input
                      type="checkbox"
                      checked={selectedItems.includes(item.id)}
                      onChange={() => handleSelect(item.id)}
                      className="cursor-pointer"
                    />
                    <h3 className="text-white font-medium text-sm">
                      {item.title}
                    </h3>
                  </div>
                  <p className="text-zinc-400 text-xs ml-5">{item.subTitle}</p>
                </div>
              ))}
            </div>

            <div className="flex mt-5 flex-col bg-blue-900/[0.25] w-full border-[1px] border-blue-500/[0.3] p-4 rounded-lg mb-4">
              <div className="flex flex-col items-start gap-2">
                <div className="flex items-center gap-2">
                  <Info className="text-blue-500" />
                  <span className="text-blue-500 font-bold">
                    Skip Size Restrictions
                  </span>
                </div>
                <span className="text-zinc-400">
                  For safety reasons, heavy waste can only be disposed of in
                  skips up to 8 yards. Larger skips will not be available if
                  heavy waste is selected.
                </span>
              </div>
            </div>

            <div className="flex justify-end gap-4 mt-4">
              <button
                onClick={onClose}
                className="px-4 py-2 bg-zinc-700 hover:bg-zinc-600 text-white rounded-md"
              >
                Close
              </button>
              <button
                onClick={handleContinue}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-md"
              >
                Continue
              </button>
            </div>
          </div>
        </div>
      )}

      {isSecondModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50">
          <div className="bg-zinc-900 text-white p-6 rounded-lg shadow-lg w-full sm:w-[90%] md:w-[70%] lg:w-[50%] xl:w-[40%] flex flex-col max-h-[80vh] overflow-y-auto scrollbar-none border-r border-zinc-200">
            <PlasterBoard
              onClose={function (): void {
                throw new Error("Function not implemented.");
              }}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default ModalHeavyWaste;
