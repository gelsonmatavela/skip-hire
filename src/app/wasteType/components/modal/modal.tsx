import React from "react";
import { ModalMultipleSelect } from "../../../../../data/modalSelect";

interface Item {
  id: number;
  icon: React.ComponentType<any>;
  title: string;
  subTitle: string;
  egs: string[];
}

interface ModalMultipleSelectComponentProps {
  selectedItems: number[];
  onSelect: (id: number) => void;
}

const ModalMultipleSelectComponent: React.FC<ModalMultipleSelectComponentProps> = ({ selectedItems, onSelect }) => {
  return (
    <div className="grid grid-cols-2 gap-4 p-5">
      {ModalMultipleSelect.map((item) => (
        <div
          key={item.id}
          onClick={() => onSelect(item.id)}
          className={`flex p-4 w-110 rounded-lg cursor-pointer transition-all ease-in-out duration-300 
            ${selectedItems.includes(item.id)
              ? "bg-blue-500/10 text-white border-2 border-blue-800"
              : "bg-zinc-800 text-white border-2 border-zinc-600 hover:border-blue-800 duration-600"}`}
        >
          <div
            className={`flex items-center justify-center w-10 h-10 rounded-full border-1 transition-all ease-in-out duration-300
              ${selectedItems.includes(item.id) ? "bg-zinc-800 border-1 border-zinc-700 text-blue-500 " : "text-zinc-300 border-zinc-500"}`}
          >
            <item.icon size={24} />
          </div>

          <div className="flex-1 ml-4">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-white font-semibold text-lg">{item.title}</h3>
              <div className="flex items-center p-2">
                <input
                  type="checkbox"
                  checked={selectedItems.includes(item.id)}
                  onChange={() => onSelect(item.id)}
                  className="cursor-pointer bg-zinc-800"
                />
              </div>
            </div>
            <p className="text-zinc-200 text-sm">{item.subTitle}</p>
            <ul className="list-none">
              <li>Example:</li>
            </ul>

            <div className="grid grid-cols-2 gap-2 mt-2 text-sm text-zinc-300">
              {item.egs.map((eg, index) => (
                <span key={index} className="flex items-center">
                 
                  <ul className="list-disc ml-4">
                    
                    <li>{eg}</li>
                  </ul>
                </span>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ModalMultipleSelectComponent;
