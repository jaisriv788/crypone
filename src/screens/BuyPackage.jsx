import axios from "axios";
import Web3 from "web3";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import BuyModel from "../componenets/buypackage/BuyModel";
import tokenAbi from "../abis/token.json";

function BuyPackage() {
  const [packageData, setPackageData] = useState([]);
  const [dataloaded, setDataLoaded] = useState(false);
  const [balance, setBalance] = useState(null);
  // const [account, setAccount] = useState(null);
  const [showModel, setShowModel] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState(null);

  const baseurl = useSelector((state) => state.auth.baseurl);
  const user_id = useSelector((state) => state.auth.user.id);

  const fetchPackages = async () => {
    try {
      const response = await axios.post(`${baseurl}/api/all_packages`, {
        user_id,
      });
      setPackageData(response.data.data);
      setDataLoaded(true);
    } catch (error) {
      console.error("Failed to fetch packages:", error);
    }
  };

  useEffect(() => {
    const controller = new AbortController();

    fetchPackages();

    return () => {
      controller.abort();
    };
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
          params: [{ chainId: "0x61" }], //	0x38 later change it to this
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
        // console.log(tokenContract);

        const rawBalance = await tokenContract.methods
          .balanceOf(walletAddress)
          .call();

        const decimals = await tokenContract.methods.decimals().call();
        // console.log(rawBalance, decimals);

        const formattedBalance = (
          Number(rawBalance) / Math.pow(10, Number(decimals))
        ).toFixed(2);
        setBalance(formattedBalance);
        setShowModel(true);
        setSelectedPackage(item);
      } catch (error) {
        console.error("MetaMask Error:", error);
      }
    } else {
      alert("Please install MetaMask to use this feature.");
    }
  };

  return (
    <div className=" overflow-x-hidden rounded-2xl p-4 lg:px-20 lg:py-10 flex-1 ml-2 md:ml-24 mr-2 md:mr-10 sm:mb-[25px] mt-[90px] text-[#09182C] shadow-lg">
      {showModel && (
        <BuyModel
          metmaskBalance={balance}
          packageData={selectedPackage}
          closeModel={(reload) => closeModel(reload)}
        />
      )}
      <div className="font-semibold mb-6 text-2xl border-b border-gray-200 pb-2">
        BuyPackage
      </div>
      <div className="flex flex-wrap justify-evenly gap-5">
        {!dataloaded
          ? Array.from({ length: 6 }).map((_, index) => (
              <div
                key={index}
                className="card border-1 border-gray-200 bg-base-100 w-72 xl:w-96 shadow-sm"
              >
                <div className="w-full h-48 bg-gray-200 animate-pulse"></div>
                <div className="card-body space-y-2">
                  <div className="h-4 bg-gray-300 rounded w-1/2 animate-pulse"></div>
                  <div className="h-4 bg-gray-300 rounded w-full animate-pulse"></div>
                  <div className="h-4 bg-gray-300 rounded w-full animate-pulse"></div>
                  <div className="h-10 bg-gray-300 rounded w-full animate-pulse"></div>
                </div>
              </div>
            ))
          : packageData.map((item, index) => (
              <div
                key={index}
                className="card border-1 rounded-2xl border-gray-200 bg-base-100 w-72 xl:w-96 shadow-sm"
              >
                <figure>
                  <img src={`/packages/${item.image}`} alt={item.title} />
                </figure>
                <div className="card-body">
                  <h2 className="card-title">{item.title}</h2>
                  <div className="flex justify-between">
                    <div className="font-semibold">Price</div>
                    <div>$ {item.price}</div>
                  </div>
                  <div className="flex justify-between">
                    <div className="font-semibold">ROI (Monthly)</div>
                    <div>{item.per_month_roi}%</div>
                  </div>
                  <div className="flex justify-between">
                    <div className="font-semibold">Referral Bonus</div>
                    <div>{item.referral_bonus}%</div>
                  </div>
                  <div className="card-actions">
                    <button
                      onClick={() => handleModel(item)}
                      className="btn btn-primary w-full"
                    >
                      Buy Now
                    </button>
                  </div>
                </div>
              </div>
            ))}
        {!dataloaded
          ? Array.from({ length: 6 }).map((_, index) => (
              <div
                key={index}
                className="card border-1 border-gray-200 bg-base-100 w-72 xl:w-96 shadow-sm"
              >
                <div className="w-full h-48 bg-gray-200 animate-pulse"></div>
                <div className="card-body space-y-2">
                  <div className="h-4 bg-gray-300 rounded w-1/2 animate-pulse"></div>
                  <div className="h-4 bg-gray-300 rounded w-full animate-pulse"></div>
                  <div className="h-4 bg-gray-300 rounded w-full animate-pulse"></div>
                  <div className="h-10 bg-gray-300 rounded w-full animate-pulse"></div>
                </div>
              </div>
            ))
          : packageData.map((item, index) => (
              <div
                key={index}
                className="card border-1 rounded-2xl border-gray-200 bg-base-100 w-72 xl:w-96 shadow-sm"
              >
                <figure>
                  <img src={`/packages/${item.image}`} alt={item.title} />
                </figure>
                <div className="card-body">
                  <h2 className="card-title">{item.title}</h2>
                  <div className="flex justify-between">
                    <div className="font-semibold">Price</div>
                    <div>$ {item.price}</div>
                  </div>
                  <div className="flex justify-between">
                    <div className="font-semibold">ROI (Monthly)</div>
                    <div>{item.per_month_roi}%</div>
                  </div>
                  <div className="flex justify-between">
                    <div className="font-semibold">Referral Bonus</div>
                    <div>{item.referral_bonus}%</div>
                  </div>
                  <div className="card-actions">
                    <button
                      onClick={() => handleModel(item)}
                      className="btn btn-primary w-full"
                    >
                      Buy Now
                    </button>
                  </div>
                </div>
              </div>
            ))}
        {!dataloaded
          ? Array.from({ length: 6 }).map((_, index) => (
              <div
                key={index}
                className="card border-1 border-gray-200 bg-base-100 w-72 xl:w-96 shadow-sm"
              >
                <div className="w-full h-48 bg-gray-200 animate-pulse"></div>
                <div className="card-body space-y-2">
                  <div className="h-4 bg-gray-300 rounded w-1/2 animate-pulse"></div>
                  <div className="h-4 bg-gray-300 rounded w-full animate-pulse"></div>
                  <div className="h-4 bg-gray-300 rounded w-full animate-pulse"></div>
                  <div className="h-10 bg-gray-300 rounded w-full animate-pulse"></div>
                </div>
              </div>
            ))
          : packageData.map((item, index) => (
              <div
                key={index}
                className="card border-1 rounded-2xl border-gray-200 bg-base-100 w-72 xl:w-96 shadow-sm"
              >
                <figure>
                  <img src={`/packages/${item.image}`} alt={item.title} />
                </figure>
                <div className="card-body">
                  <h2 className="card-title">{item.title}</h2>
                  <div className="flex justify-between">
                    <div className="font-semibold">Price</div>
                    <div>$ {item.price}</div>
                  </div>
                  <div className="flex justify-between">
                    <div className="font-semibold">ROI (Monthly)</div>
                    <div>{item.per_month_roi}%</div>
                  </div>
                  <div className="flex justify-between">
                    <div className="font-semibold">Referral Bonus</div>
                    <div>{item.referral_bonus}%</div>
                  </div>
                  <div className="card-actions">
                    <button
                      onClick={() => handleModel(item)}
                      className="btn btn-primary w-full"
                    >
                      Buy Now
                    </button>
                  </div>
                </div>
              </div>
            ))}
      </div>
    </div>
  );
}

export default BuyPackage;
