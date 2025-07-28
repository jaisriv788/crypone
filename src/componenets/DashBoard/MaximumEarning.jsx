function MaximumEarning({ wallet }) {
  return (
    <div className="">
      <div className="bg-white border-l-4 border-t-1 border-[#87a7c7] text-[#09182C] rounded-2xl p-6 shadow-[8px_8px_16px_#d1d9e6,_-8px_-8px_16px_#ffffff]">
        <h2 className="text-xl font-semibold mb-3">Maximum Earnings Insight</h2>
        <div className="rounded-xl p-4 shadow-inner bg-[#f9f9f9] space-y-2">
          <p className="text-sm font-medium">Maximum Amount You Can Earn</p>
          <p className="text-sm">
            You can earn $
            {(wallet.capping_5x - Number(wallet.total_earning)).toFixed(2)} more
            before upgrade is required.
          </p>
        </div>
      </div>
    </div>
  );
}

export default MaximumEarning;
