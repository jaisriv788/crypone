const data = [
  {
    level: "1",
    userId: "PRO1272318",
    wAddress: "...",
    doa: "2025-07-19 16:24:42",
  },
   {
    level: "1",
    userId: "PRO1272318",
    wAddress: "...",
    doa: "2025-07-19 16:24:42",
  },
   {
    level: "1",
    userId: "PRO1272318",
    wAddress: "...",
    doa: "2025-07-19 16:24:42",
  },
   {
    level: "1",
    userId: "PRO1272318",
    wAddress: "...",
    doa: "2025-07-19 16:24:42",
  },
   {
    level: "1",
    userId: "PRO1272318",
    wAddress: "...",
    doa: "2025-07-19 16:24:42",
  },
];
// const data = [];

function Table() {
  return (
    <div className=" flex flex-col gap-5">
      <div className="overflow-x-auto bg-white  text-gray-800 rounded-2xl shadow-xl  border-[1px] border-gray-300 transition-transform">
        <table className="table min-w-[500px] table-zebra ">
          <thead>
            <tr className="text-black">
              <th>Sr. No</th>
              <th>Level</th>
              <th>UserId</th>
              <th>Wallet Address</th>
              <th>Date Of Activation</th>
            </tr>
          </thead>
          <tbody>
            {data.length === 0 ? (
              <tr>
                <td colSpan={8} className="text-center">
                  No Data Available In Table
                </td>
              </tr>
            ) : (
              data.map((item, index) => (
                <tr key={index}>
                  <td className="text-orange-700 font-semibold">{index+1}</td>
                  <td className="font-semibold">{item.level}</td>
                  <td className="font-semibold">{item.userId}</td>
                  <td className="font-semibold">{item.wAddress}</td>
                  <td className="font-semibold">{item.doa}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      <div className="text-center">
        Showing 1 to {data.length} of {data.length} Entries
      </div>
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
