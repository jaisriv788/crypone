// const data = [
//   {
//     trx: "MS1821181811",
//     amt: "$ 25.00",
//     currency: "Dollor",
//     status: "success",
//     date: "10-04-2025",
//   },
//   {
//     trx: "ROI1263196555",
//     amt: "€ 00.17",
//     currency: "Euro",
//     status: "pending",
//     date: "10-04-2025",
//   },
//   {
//     trx: "MB710458466",
//     amt: "₹ 05.00",
//     currency: "INR",
//     status: "success",
//     date: "10-04-2025",
//   },
//   {
//     trx: "REF1451031291",
//     amt: "₹ 05.00",
//     currency: "INR",
//     status: "success",
//     date: "10-04-2025",
//   },
//   {
//     trx: "REF937845675",
//     amt: "$ 02.00",
//     currency: "Dollor",
//     status: "failed",
//     date: "10-04-2025",
//   },
// ];
const data = [];

function Table() {
  return (
    <div className=" flex flex-col gap-5">
      <div className="overflow-x-auto bg-white text-gray-800 rounded-2xl shadow-xl  border-[1px] border-gray-300 transition-transform">
        <table className="table table-zebra">
          <thead>
            <tr className="text-black">
              <th>Transaction Id</th>
              <th>Amount</th>
              <th>Currency</th>
              <th>Status</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {data.length === 0 ? (
              <tr>
                <td colSpan={6} className="text-center">
                  No Data Available In Table
                </td>
              </tr>
            ) : (
              data.map((item, index) => (
                <tr key={index}>
                  <td className="text-orange-700 font-semibold">{item.trx}</td>
                  <td className="font-semibold">{item.amt}</td>
                  <td className="font-semibold">{item.currency}</td>
                  <td className="font-semibold">{item.status}</td>
                  <td className="font-semibold">{item.date}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      <div className="text-center">Showing 0 to 0 of 0 Entries</div>
      <div className="flex justify-between">
        <button className="bg-[#09182C] text-white w-[60px] rounded-md hover:bg-gray-700 cursor-pointer transition ease-in-out duration-300 ">
          Prev
        </button>
        <button className="bg-[#09182C] text-white w-[60px] rounded-md hover:bg-gray-700 cursor-pointer transition ease-in-out duration-300 ">
          Next
        </button>
      </div>
    </div>
  );
}

export default Table;
