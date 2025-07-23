import Table from "../componenets/binarybonus/Table";
import { useEffect, useState } from "react";

function BinaryBonus() {
  const [inputValue, setInputValue] = useState("");
  const [debouncedValue, setDebouncedValue] = useState("");

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(inputValue);
    }, 500);

    return () => clearTimeout(handler);
  }, [inputValue]);

  useEffect(() => {
    console.log("Debounced value:", debouncedValue);
  }, [debouncedValue]);

  function handleChange(e) {
    setInputValue(e.target.value);
  }
  return (
    <div className="bg-white min-h-[80vh]  overflow-x-hidden h-fit rounded-2xl p-4 lg:px-20 lg:py-10 flex-1 ml-2 md:ml-24 mr-2 md:mr-10 sm:mb-[25px] mt-[90px] text-[#09182C] shadow-lg">
      <div className="font-semibold flex items-center justify-between mb-6 border-b border-gray-200 pb-2">
        <div className=" text-2xl ">Matching Bonus</div>
      </div>
      <div className="flex flex-col gap-5">
        <div className="flex self-center md:self-end  text-[#09182C] items-center gap-3">
          <span className="text-lg font-semibold">Search</span>
          <input
            onChange={handleChange}
            className="border-1 w-fit border-[#09182C] rounded px-3"
            placeholder="Transaction Id"
          />
        </div>
        <Table debounceValue={debouncedValue} />
      </div>
    </div>
  );
}

export default BinaryBonus;
