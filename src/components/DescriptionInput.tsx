"use client";
import React, { useState } from "react";

interface DescriptionInputProps {
  value: string;
  onChange: (value: string) => void;
}

const DescriptionInput = ({ value, onChange }: DescriptionInputProps) => {
  const [active, setActive] = useState(false);

  return (
    <div className="space-y-2">
      <div className="font-medium">Meeting Info:</div>
      <label className="flex items-center gap-1.5">
        <input
          type="checkbox"
          checked={active}
          onChange={(e) => {
            setActive(e.target.checked);
            onChange("");
          }}
        />{" "}
        Add description
      </label>
      {active && (
        <label className="block space-y-1">
          <textarea
            value={value}
            onChange={(e) => {
              onChange(e.target.value);
            }}
            maxLength={500}
            className="w-full rounded-md border border-gray-300 p-2"
          ></textarea>
        </label>
      )}
    </div>
  );
};

export default DescriptionInput;
