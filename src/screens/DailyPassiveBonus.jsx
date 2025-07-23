import Table from "../componenets/dailypassivebonus/Table";

function DailyPassiveBonus() {
  return (
    <div className="bg-white  overflow-x-hidden h-fit rounded-2xl p-4 lg:px-20 lg:py-10 flex-1 ml-2 md:ml-24 mr-2 md:mr-10 sm:mb-[25px] mt-[90px] text-[#09182C] shadow-lg">
      <div className="font-semibold flex items-center justify-between mb-6 border-b border-gray-200 pb-2">
        <div className=" text-2xl ">Daily Passive Bonus</div>
      </div>
      <div className="flex flex-col gap-5">
        <div className="flex self-center md:self-end  text-[#09182C] items-center gap-3">
          <span className="text-lg font-semibold">Search</span>
          <input
            className="border-1 w-fit border-[#09182C] rounded px-3"
            placeholder="Transaction Id"
          />
        </div>
        <Table />
      </div>
    </div>
  );
}

export default DailyPassiveBonus;
