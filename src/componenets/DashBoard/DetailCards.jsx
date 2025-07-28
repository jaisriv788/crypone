function DetailCards({ user, binary, wallet }) {
  const cardData = [
    { name: "Left Team", value: `${user.left_team}`, col: "border-indigo-300" },
    {
      name: "Right Team",
      value: `${user.right_team}`,
      col: "border-indigo-300",
    },
    {
      name: "Left Business",
      value: `$ ${binary.left_total_bv.toFixed(2)}`,
      col: "border-indigo-300",
    },
    {
      name: "Right business",
      value: `$ ${binary.right_total_bv.toFixed(2)}`,
      col: "border-indigo-300",
    },
    {
      name: "Today's Left Business",
      value: `$ ${binary.today_left_business.toFixed(2)}`,
      col: "border-indigo-300",
    },
    {
      name: "Today's Right Business",
      value: `$ ${binary.today_right_business.toFixed(2)}`,
      col: "border-indigo-300",
    },
    {
      name: "Referal Bonus",
      value: `$ ${wallet.referral_wallet.toFixed(2)}`,
      col: "border-gray-300",
    },
    // {
    //   name: "Daily Passive Bonus",
    //   value: `$ ${wallet.passive_wallet.toFixed(2)}`,
    //   col: "border-indigo-300",
    // },
    {
      name: "Mile Stone Bonus",
      value: `$ ${Number(wallet.royalty_wallet).toFixed(2)}`,
      col: "border-gray-400",
    },
    {
      name: "Matching Bonus",
      value: `$ ${wallet.matching_wallet.toFixed(2)}`,
      col: "border-gray-400",
    },
    {
      name: "ROI",
      value: `$ ${wallet.roi_wallet.toFixed(2)}`,
      col: "border-gray-400",
    },
    {
      name: "Earning Wallet Balance",
      value: `$ ${wallet.withdrawl_wallet.toFixed(2)}`,
      col: "border-gray-400",
    },
    {
      name: "Total Earning",
      value: `$ ${parseFloat(wallet.total_earning).toFixed(2)}`,
      col: "border-gray-400",
    },
    // {
    //   name: "Deposite Wallet Bonus",
    //   value: `$ ${wallet.deposit_wallet.toFixed(2)}`,
    //   col: "border-gray-400",
    // },
  ];
  return (
    <div className="grid grid-wrap md:grid-cols-2 gap-4 lg:gap-x-10 gap-y-4">
      {cardData.map((item, index) => {
        return (
          <div
            key={index}
            className={`bg-white cursor-pointer text-gray-800 border-l-4 border-t-1 ${item.col} rounded-2xl shadow-xl transition-transform hover:scale-[1.01]`}
          >
            <div className="px-6 py-3 border-b border-gray-200 text-base font-semibold tracking-wide bg-gray-50 rounded-t-2xl">
              {item.name}
            </div>
            <div
              className={`px-6 py-5 ${
                item.text ? "text-sm font-semibold" : "text-2xl font-bold"
              } `}
            >
              {item.value}
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default DetailCards;
