import Table from "../componenets/mylevels/Table";

function MyLevels() {
  return (
    <div className="bg-white min-h-[80vh] overflow-x-hidden h-fit rounded-2xl p-4 lg:px-20 lg:py-10 flex-1 ml-2 md:ml-24 mr-2 md:mr-10 sm:mb-[25px] mt-[90px] text-[#09182C] shadow-lg">
      <div className="font-semibold flex items-center justify-between mb-6 border-b border-gray-200 pb-2">
        <div className=" text-2xl ">My Levels</div>
      </div>
      <div className="flex  flex-col gap-5">
        <div className="flex justify-between items-center">
          <select
            defaultValue="Level"
            className=" border-2 rounded-md w-40 shadow-md border-gray-400"
          >
            <option disabled={true}>Level</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
          </select>

          <div className="flex self-center md:self-end  text-[#09182C] items-center gap-3">
            <span className="text-lg font-semibold">Search</span>
            <input
              className="border-1  shadow-md w-fit border-[#09182C] rounded px-3"
              placeholder="User Id"
            />
          </div>
        </div>
        <Table />
      </div>
    </div>
  );
}

export default MyLevels;
