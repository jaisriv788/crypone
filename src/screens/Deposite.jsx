import { Plus } from "lucide-react";
import Table from "../componenets/Deposite/Table";
import { useState } from "react";
import Model from "../componenets/Deposite/Model";

function Deposite() {
  const [showModal, setShowModal] = useState(false);

  function closeModel() {
    setShowModal(false);
  }

  return (
    <div className="bg-white overflow-x-hidden h-fit rounded-2xl p-4 lg:px-20 lg:py-10 flex-1 ml-2 md:ml-24 mr-2 md:mr-10 sm:mb-[25px] mt-[90px] text-[#09182C] shadow-lg">
      <div className="font-semibold flex items-center justify-between mb-6 border-b border-gray-200 pb-2">
        <div className=" text-2xl ">Deposite</div>
        <button
          onClick={() => {
            setShowModal(true);
          }}
          className="text-md flex sm:py-1 rounded-full hover:bg-gray-700 cursor-pointer transition ease-in-out duration-300 px-2 sm:px-3 items-center gap-1 text-white bg-[#09182C]"
        >
          <Plus strokeWidth={4} size={15} /> Deposite Fund
        </button>
      </div>
      <div className="flex flex-col gap-5">
        <div className="flex flex-col sm:flex-row sm:gap-0 gap-5 sm:justify-between">
          <div className=" flex flex-wrap gap-2">
            <button className="bg-emerald-400 flex-1 sm:flex-none rounded-md text-white sm:w-[70px]">
              CSV
            </button>
            <button className="bg-indigo-500 flex-1 sm:flex-none rounded-md text-white sm:w-[70px]">
              Excel
            </button>
            <button className="bg-rose-500 flex-1 sm:flex-none rounded-md text-white sm:w-[70px]">
              PDF
            </button>
          </div>

          <div className="flex self-center  text-[#09182C] items-center gap-3">
            <label className="text-lg font-semibold">Search</label>
            <input
              className="border-1 focus:outline-none w-fit border-[#09182C] rounded px-3"
              placeholder="TransactionId"
            />
          </div>
        </div>
        <Table />
      </div>
      {showModal && <Model closeModel={closeModel} />}
    </div>
  );
}

export default Deposite;
