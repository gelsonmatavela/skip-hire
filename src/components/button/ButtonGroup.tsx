import React from "react";
import Button from "./ButtonProps";

interface ButtonGroupProps {
  onCancel: () => void;
  onContinue: () => void;
}

const ButtonGroup: React.FC<ButtonGroupProps> = ({ onCancel, onContinue }) => {
  return (
    <div className="flex justify-end space-x-4 mt-6">
      <Button label="Back" onClick={onCancel} variant="secondary" />
      <Button label="Continue" onClick={onContinue} variant="primary" />
    </div>
  );
};

export default ButtonGroup;
