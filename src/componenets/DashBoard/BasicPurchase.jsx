import axios from "axios";
import Web3 from "web3";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import BuyModel from "../../componenets/buypackage/BuyModel";
import tokenAbi from "../../abis/token.json";

function BasicPurchase() {
  const [packageData, setPackageData] = useState([]);
  const [dataloaded, setDataLoaded] = useState(false);
  const [showMessage, setShowmessage] = useState(true);
  const [balance, setBalance] = useState(null);
  const [showModel, setShowModel] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState(null);

  const baseurl = useSelector((state) => state.auth.baseurl);
  const user_id = useSelector((state) => state.auth.user.id);

  const fetchPackages = async () => {
    try {
      const response = await axios.post(`${baseurl}/api/all_packages`, {
        user_id,
      });
      // console.log("block", response.data.data);
      setPackageData(response.data.data);
      setDataLoaded(true);
    } catch (error) {
      console.error("Failed to fetch packages:", error);
    }
  };

  useEffect(() => {
    const controller = new AbortController();
    fetchPackages();
    return () => controller.abort();
  }, []);

  function closeModel(reload = false) {
    setShowModel(false);
    if (reload) fetchPackages();
  }

  const handleModel = async (item) => {
    if (window.ethereum) {
      try {
        await window.ethereum.request({
          method: "wallet_switchEthereumChain",
          params: [{ chainId: "0x61" }], // change to 0x38 later
        });

        const web3 = new Web3(window.ethereum);
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        const walletAddress = accounts[0];

        const tokenContract = new web3.eth.Contract(
          tokenAbi,
          "0xF78A55dB9391E9B689734BA3E45c1C3A5535A857"
        );

        const rawBalance = await tokenContract.methods
          .balanceOf(walletAddress)
          .call();

        const decimals = await tokenContract.methods.decimals().call();
        const formattedBalance = (
          Number(rawBalance) / Math.pow(10, Number(decimals))
        ).toFixed(2);

        setBalance(formattedBalance);
        setSelectedPackage(item);
        setShowModel(true);
      } catch (error) {
        console.error("MetaMask Error:", error);
      }
    } else {
      alert("Please install MetaMask to use this feature.");
    }
  };

  return (
    <div className="mt-3  flex flex-col gap-8">
      {showModel && (
        <BuyModel
          metmaskBalance={balance}
          packageData={selectedPackage}
          closeModel={(reload) => closeModel(reload)}
        />
      )}

      <div className="flex flex-wrap justify-around gap-5">
        {!dataloaded
          ? Array.from({ length: 4 }).map((_, index) => (
              <div
                key={index}
                className="rounded-2xl overflow-hidden shadow-md w-[200px] sm:w-[240px] md:w-[280px] max-w-[384px] border border-gray-200"
                style={{ backgroundColor: "#f5f5f5" }}
              >
                <div className="w-full h-48 bg-gray-300 animate-pulse"></div>
                <div className="p-4 space-y-3">
                  <div className="h-4 bg-gray-400 rounded w-1/2 animate-pulse"></div>
                  <div className="h-4 bg-gray-400 rounded w-full animate-pulse"></div>
                  <div className="h-4 bg-gray-400 rounded w-full animate-pulse"></div>
                  <div className="h-10 bg-gray-400 rounded w-full animate-pulse"></div>
                </div>
              </div>
            ))
          : packageData.slice(0, 4).map((item, index) => (
              <div
                key={index}
                className={` ${
                  item.status == 0 ? "bg-[#585b5e]" : "bg-[#09182C]"
                }   text-white rounded-2xl p-4 sm:p-5 md:p-6 mx-auto 
             shadow-[inset_2px_2px_4px_rgba(0,0,0,0.6),_inset_-2px_-2px_4px_rgba(255,255,255,0.05),_8px_8px_16px_rgba(0,0,0,0.5),_-8px_-8px_16px_rgba(255,255,255,0.03)] 
             transition-all border border-white/10 w-[200px] sm:w-[240px] md:w-[280px] max-w-[384px]`}
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow =
                    "0 6px 18px rgba(0, 0, 0, 0.6), inset 2px 2px 4px rgba(0,0,0,0.4), inset -2px -2px 4px rgba(255,255,255,0.05)";
                  e.currentTarget.style.transform = "translateY(-4px)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow =
                    "0 4px 14px rgba(0, 0, 0, 0.4), inset 2px 2px 4px rgba(0,0,0,0.4), inset -2px -2px 4px rgba(255,255,255,0.05)";
                  e.currentTarget.style.transform = "translateY(0)";
                }}
              >
                <img
                  src={`packages/${item.image}`}
                  alt={item.title}
                  className="w-full h-[120px] sm:h-[150px] md:h-[180px] object-cover rounded-xl mb-3 border border-white/20"
                />

                <h2 className="text-sm sm:text-base font-semibold mb-3 capitalize tracking-wide">
                  {item.title}
                </h2>

                <div className="text-xs sm:text-sm text-gray-200 mb-1.5">
                  <strong className="text-white">Price:</strong> ${item.price}
                </div>
                <div className="text-xs sm:text-sm text-gray-200 mb-1.5">
                  <strong className="text-white">ROI (Monthly):</strong>{" "}
                  {item.per_month_roi}%
                </div>
                <div className="text-xs sm:text-sm text-gray-200 mb-4">
                  <strong className="text-white">Referral Bonus:</strong>{" "}
                  {item.referral_bonus}%
                </div>

                <button
                  onClick={() => handleModel(item)}
                  disabled={item.status == 0}
                  className={`w-full py-2 ${
                    item.status == 0
                      ? "bg-white/60 cursor-not-allowed"
                      : "bg-white cursor-pointer "
                  }  text-[#09182C] rounded-lg font-semibold text-xs sm:text-sm hover:opacity-95 hover:scale-[1.01] transition-all`}
                >
                  Buy Now
                </button>
              </div>
            ))}
      </div>
      {showMessage && (
        <div
          role="alert"
          className="alert bg-gray-100 alert-vertical sm:alert-horizontal"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            className="stroke-info h-6 w-6 shrink-0 "
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              className="stroke-blue-700"
              strokeWidth="2"
              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            ></path>
          </svg>
          <span>You can upgrade later to earn more.</span>
          <div>
            <button
              onClick={() => setShowmessage(false)}
              className="btn btn-sm bg-[#09182C] text-white"
            >
              Ok
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default BasicPurchase;
