import { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";

function Table({ debounceValue }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const itemsPerPage = 15;

  const baseurl = useSelector((state) => state.auth.baseurl);
  const user_id = useSelector((state) => state.auth.user.id);

  useEffect(() => {
    const controller = new AbortController();

    const fetchData = async () => {
      setLoading(true);
      const response = await axios.post(`${baseurl}/api/pack_order`, {
        user_id,
      });
      setData(response.data.data);
      setLoading(false);
      // console.log(response.data.data);
    };

    fetchData();
    return () => {
      controller.abort();
    };
  }, [baseurl, user_id]);

  const filteredData = useMemo(() => {
    if (!debounceValue) return data;
    return data.filter((item) =>
      item.package_name.toLowerCase().includes(debounceValue.toLowerCase())
    );
  }, [debounceValue, data]);

  const totalPages = Math.ceil(filteredData?.length / itemsPerPage);

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
              <th>Package Name</th>
              <th>Total Amount</th>
              <th>Payment Method</th>
              <th>Status</th>
              <th>Date</th>
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
                    {item.package_name}
                  </td>
                  <td className="font-semibold">{item.lend_amount}</td>
                  <td className="font-semibold">{item.payment_method}</td>
                  <td className="font-semibold">
                    <span
                      className={`${
                        item.status === 1
                          ? "bg-emerald-500"
                          : item.status === 2
                          ? "bg-red-500"
                          : "bg-yellow-500"
                      } inline-block text-center w-18 py-1  rounded-full text-white`}
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
