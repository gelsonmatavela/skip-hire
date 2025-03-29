import React, { useState } from "react";
import { plasterBoard } from "../../../../../data/plasterBoard";
import { AlertOctagon, Info } from "lucide-react";

interface ModalProps {
  onClose: () => void;
}

const PlasterBoard: React.FC<ModalProps> = ({ onClose }) => {
  const [selectedItem, setSelectedItem] = useState<number | null>(null);
  const [isSecondModalOpen, setIsSecondModalOpen] = useState(false);

  const handleSelect = (id: number) => {
    setSelectedItem(id);
  };

  const handleContinue = () => {
    setIsSecondModalOpen(true);
  };

  return (
    <>
      {!isSecondModalOpen && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-black/50"
          onClick={onClose}
        >
          <div
            className="bg-zinc-900 text-white p-6 rounded-lg shadow-lg w-2xl flex flex-col max-h-[80vh] overflow-y-auto scrollbar-none border border-zinc-200"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-xl text-left mb-4">Heavy Waste Types</h2>

            <div className="flex flex-col bg-yellow-700/20 w-full border border-yellow-300/50 p-4 rounded-lg mb-4">
              <div className="flex flex-col items-start gap-2">
                <div className="flex items-center gap-2">
                  <AlertOctagon className="text-yellow-500" />
                  <span className="text-yellow-500 font-bold">Important Notice</span>
                </div>
                <span className="text-zinc-400">
                  Plasterboard must be disposed of separately from general waste due to environmental regulations. Please indicate the approximate percentage of plasterboard in your waste.
                </span>
              </div>
            </div>

            <div className="gap-4 w-full">
              {plasterBoard.map((item) => (
                <div
                  key={item.id}
                  onClick={() => handleSelect(item.id)}
                  className={`flex flex-col p-3 rounded-md cursor-pointer transition-all ease-in-out duration-300 mb-4
                    ${
                      selectedItem === item.id
                        ? "border border-zinc-700"
                        : "border border-zinc-700 hover:border-blue-600/50"
                    }`}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <input
                      type="radio"
                      checked={selectedItem === item.id}
                      onChange={() => handleSelect(item.id)}
                      className="cursor-pointer rounded-full"
                    />
                    <h3 className="text-white font-medium text-sm">{item.title}</h3>
                  </div>
                  <p className="text-zinc-400 text-xs ml-5">{item.subTitle}</p>
                </div>
              ))}
            </div>

            {selectedItem !== null && (
              <div className="flex mt-5 flex-col bg-blue-900/[0.25] w-full border border-blue-500/[0.3] p-4 rounded-lg mb-4">
                <div className="flex flex-col items-start gap-2">
                  <div className="flex items-center gap-2">
                    <Info className="text-blue-500" />
                    <span className="text-blue-500 font-bold">
                      {selectedItem === 2
                        ? "1 Tonne Bag Required"
                        : selectedItem === 3
                        ? "1 Tonne Bag Required"
                        : selectedItem === 4
                        ? "Plasterboard-Only Skip Required"
                        : ""}
                    </span>
                  </div>
                  <span className="text-zinc-400">
                    {selectedItem === 2 && <span>For small amounts of plasterboard (up to 5%)</span>}
                    {selectedItem === 3 && <span>For moderate amounts of plasterboard (5-20%)</span>}
                    {selectedItem === 4 && <span>For large amounts of plasterboard (more than 20%)</span>}
                  </span>
                </div>
              </div>
            )}

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
    </>
  );
};

export default PlasterBoard;
