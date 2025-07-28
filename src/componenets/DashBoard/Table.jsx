function Table({ data }) {
  return (
    <div
      className={`bg-white overflow-hidden text-gray-800 rounded-2xl shadow-xl  border-[1px] border-gray-300 transition-transform`}
    >
      <div className="px-6 py-3 border-b border-gray-200 text-base font-semibold tracking-wide bg-gray-50 rounded-t-2xl">
        Latest Transaction
      </div>
      <div className="overflow-x-auto">
        <table className="table table-zebra">
          <thead>
            <tr className="text-black">
              <th>Transaction Id</th>
              <th>Amount</th>
              <th>Discription Color</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => {
              return (
                <tr key={index}>
                  <td className="text-orange-700 font-semibold">
                    {item.trans_id}
                  </td>
                  <td className="font-semibold">$ {item.amount}</td>
                  <td className="font-semibold">{item.description}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Table;
