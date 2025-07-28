import { useMemo, useState, useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios";

function Table({ debounceValue }) {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 15;
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const baseurl = useSelector((state) => state.auth.baseurl);
  const user_id = useSelector((state) => state.auth.user.id);

  useEffect(() => {
    const controller = new AbortController();

    const fetchData = async () => {
      setLoading(true);

      const response = await axios.post(`${baseurl}/api/withdraw`, { user_id });
      setData(response.data.data);
      // console.log(response.data.data);
      setLoading(false);
    };

    fetchData();
    return () => {
      controller.abort();
    };
  }, [baseurl, user_id]);

  const filteredData = useMemo(() => {
    if (!debounceValue) return data;
    return data.filter(
      (item) =>
        item.user_id
          .toString()
          .toLowerCase()
          .includes(debounceValue.toLowerCase()) ||
        item.withdraw_id.toLowerCase().includes(debounceValue.toLowerCase())
    );
  }, [debounceValue, data]);

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  const paginatedData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  if (loading || !data) {
    return (
      <div className="fixed flex justify-center items-center w-full h-full bg-black/70 backdrop-blur-sm top-0 left-0 z-50">
        <div className="loading loading-spinner text-white loading-xl"></div>
      </div>
    );
  }

  return (
    <div className=" flex flex-col gap-5">
      <div className="overflow-x-auto bg-white text-gray-800 rounded-2xl shadow-xl  border-[1px] border-gray-300 transition-transform">
        <table className="table table-zebra">
          <thead>
            <tr className="text-black">
              <th>User Id</th>
              <th>Transaction ID</th>
              <th>Requested Amount</th>
              <th>Wallet Address</th>
              <th>Processing Time</th>
              <th>Status</th>
              <th>Generated Date</th>
            </tr>
          </thead>
          <tbody>
            {paginatedData.length === 0 ? (
              <tr>
                <td colSpan={6} className="text-center">
                  No Data Available In Table
                </td>
              </tr>
            ) : (
              paginatedData.map((item, index) => (
                <tr key={index}>
                  <td className="text-orange-700 font-semibold">
                    {item.user_id}
                  </td>
                  <td className="font-semibold text-orange-700 ">
                    {item.withdraw_id}
                  </td>
                  <td className="font-semibold">{item.amount}</td>
                  <td className="font-semibold">
                    {item?.withdraw_wallet ?? "-"}
                  </td>
                  <td className="font-semibold">{item.processing_time}</td>
                  <td className="font-semibold">
                    <span
                      className={` ${
                        item.status === 1
                          ? "bg-emerald-500"
                          : item.status === 2
                          ? "bg-red-500"
                          : "bg-yellow-500"
                      } inline-block w-20 text-center py-1 rounded-full p-[1px] text-white`}
                    >
                      {item.status === 1
                        ? "Success"
                        : item.status === 2
                        ? "Failed"
                        : "Pending"}
                    </span>
                  </td>
                  <td className="font-semibold">{item.created_at}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      <div className="text-center">
        {filteredData.length === 0 ? (
          "Showing 0 to 0 of 0 Entries"
        ) : (
          <>
            Showing {(currentPage - 1) * itemsPerPage + 1} to{" "}
            {Math.min(currentPage * itemsPerPage, filteredData.length)} of{" "}
            {filteredData.length} Entries
          </>
        )}
      </div>{" "}
      <div className="flex justify-between">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className="bg-[#09182C] text-white w-[60px] rounded-md hover:bg-gray-700 cursor-pointer transition ease-in-out duration-300 "
        >
          Prev
        </button>
        <button
          onClick={() =>
            setCurrentPage((prev) => Math.min(prev + 1, totalPages))
          }
          disabled={currentPage === totalPages}
          className="bg-[#09182C] text-white w-[60px] rounded-md hover:bg-gray-700 cursor-pointer transition ease-in-out duration-300 "
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default Table;
