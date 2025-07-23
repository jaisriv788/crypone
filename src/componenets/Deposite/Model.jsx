function Modal({ closeModel }) {
  return (
    <div
      onClick={closeModel}
      className="fixed bg-black/60 backdrop-blur-xs w-screen h-screen top-0 left-0 z-50 flex items-center justify-center"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white gap-3 py-3 px-5 w-[400px] sm:w-[500px] text-[#09182C] flex flex-col rounded-xl"
      >
        <div className="text-xl pb-1 border-b-1 border-gray-400 font-semibold">
          Deposite Fund
        </div>
        <div className="flex flex-col gap-3">
          <div className="text-sm sm:text-md font-semibold text-center">
            Current Wallet Balance : $ 950
          </div>
          <div>
            <label className="text-lg font-semibold">Enter Amount</label>
            <input
              type="number"
              placeholder="Amount "
              className="focus:outline-none border-1 border-[#09182C] rounded w-full px-3 py-1"
            />
          </div>
          <div className="flex gap-10 justify-between mt-3 text-white">
            <button className="bg-emerald-500 hover:bg-emerald-700 cursor-pointer transition ease-in-out duration-300 rounded py-1 flex-1">
              Submit
            </button>
            <button
              onClick={closeModel}
              className="bg-rose-500 rounded py-1  cursor-pointer transition ease-in-out duration-300 flex-1 hover:bg-rose-700"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Modal;
