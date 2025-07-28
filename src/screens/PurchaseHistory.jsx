import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import Table from "../componenets/purchaseHistory/Table";

function PurchaseHistory() {
  // const [walletAddress, setWalletAddress] = useState(null);
  const [inputValue, setInputValue] = useState("");
  const [debouncedValue, setDebouncedValue] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    if (window.ethereum) {
      (async function () {
        try {
          const accounts = await window.ethereum.request({
            method: "eth_requestAccounts",
          });
          // setWalletAddress(accounts[0]);
          console.log("Connected:", accounts[0]);
        } catch (error) {
          console.log("User rejected or error:", error);
        }
      })();
    } else {
      console.warn("MetaMask not found");
    }
  }, []);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(inputValue);
    }, 500);

    return () => clearTimeout(handler);
  }, [inputValue]);

  useEffect(() => {
    // console.log("Debounced value:", debouncedValue);
  }, [debouncedValue]);

  function handleChange(e) {
    setInputValue(e.target.value);
  }

  return (
    <div className="bg-white overflow-x-hidden h-fit rounded-2xl p-4 lg:px-20 lg:py-10 flex-1 ml-2 md:ml-24 mr-2 md:mr-10 sm:mb-[25px] mt-[90px] text-[#09182C] shadow-lg">
      <div className="font-semibold flex items-center justify-between mb-6 border-b border-gray-200 pb-2">
        <div className=" text-2xl ">Purchased Packages</div>
        <button
          onClick={() => {
            navigate("/buypackage");
          }}
          className="text-md flex py-1 rounded-full hover:bg-gray-700 cursor-pointer transition ease-in-out duration-300 px-3 items-center gap-1 text-white bg-[#09182C]"
        >
          Purchase Again
        </button>
      </div>
      <div className="flex flex-col gap-5">
        <div className="flex self-center md:self-end  text-[#09182C] items-center gap-3">
          <span className="text-lg font-semibold">Search</span>
          <input
            onChange={handleChange}
            className="border-1 w-fit border-[#09182C] rounded px-3"
            placeholder="Package Name"
          />
        </div>
        <Table debounceValue={debouncedValue}/>
      </div>
    </div>
  );
}

export default PurchaseHistory;
