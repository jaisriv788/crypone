import { X } from "lucide-react";
import { useSelector } from "react-redux";
import axios from "axios";
import { useEffect, useState } from "react";
import Error from "../elements/Error";
import Success from "../elements/Success";
import Web3 from "web3";
import tokenAbi from "../../abis/token.json";
import contractAbi from "../../abis/contract.json";

function BuyModel({ closeModel, packageData, metmaskBalance }) {
  const [showSpinner, setShowSpinner] = useState(false);
  const [showError, setShowError] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [earningWalletBalance, setEarningWalletBalance] = useState(0);
  const [msg, setMsg] = useState("");

  const baseurl = useSelector((state) => state.auth.baseurl);
  const user_id = useSelector((state) => state.auth.user.id);
  const tokenId = "0xF78A55dB9391E9B689734BA3E45c1C3A5535A857";
  const contractId = "0x15be2A2882aC8D982E9C4b1f255fFE683524772f";

  useEffect(() => {
    const controller = new AbortController();

    const fetchData = async () => {
      const response = await axios.post(`${baseurl}/api/user_wallet_balance`, {
        user_id,
      });
      setEarningWalletBalance(response.data.data.withdrawl_wallet);
    };
    fetchData();
    return () => {
      controller.abort();
    };
  }, []);

  async function handelEarningWallet() {
    try {
      setShowSpinner(true);
      const response = await axios.post(`${baseurl}/api/buy_package`, {
        user_id,
        package_id: packageData.id,
        payment_method: "earning_wallet",
      });
      console.log(response);
      if (response.data.status == 200) {
        setMsg("Purchased Successfully.");
        setShowSuccess(true);
        setTimeout(() => {
          setShowSuccess(false);
          setShowSpinner(false);
          closeModel();
        }, 3000);
      } else {
        setMsg("Low Balance.");
        setShowError(true);
        setTimeout(() => {
          setShowError(false);
          setShowSpinner(false);
          closeModel();
        }, 3000);
      }
    } catch (error) {
      console.log(error);
      setShowSpinner(false);
      closeModel();
    }
  }

  async function handleMetaMaskWallet() {
    try {
      setShowSpinner(true);
      console.log(packageData);
      if (window.ethereum) {
        await window.ethereum.request({
          method: "wallet_switchEthereumChain",
          params: [{ chainId: "0x61" }], //	0x38 later change it to this
        });

        const web3 = new Web3(window.ethereum);
        const walletAddress = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        const userAddress = walletAddress[0];

        const tokenContract = new web3.eth.Contract(tokenAbi, tokenId);
        const depositContract = new web3.eth.Contract(contractAbi, contractId);
        const amount = web3.utils.toWei(packageData.price, "ether");
        // console.log("Amount :", amount);

        await tokenContract.methods
          .approve(contractId, amount)
          .send({ from: userAddress });

        // console.log("Approve Tx:", approveTx);
        // const allowance = await tokenContract.methods
        //   .allowance(userAddress, contractId)
        //   .call();
        // console.log("Allowance:", allowance);

        const depositTx = await depositContract.methods
          .deposit(amount)
          .send({ from: userAddress });

        const trxHash = depositTx.transactionHash;
        // console.log(depositTx, trxHash);

        const response = await axios.post(`${baseurl}/api/buy_package`, {
          user_id,
          package_id: packageData.id,
          wallet_address: userAddress,
          transaction_hash: trxHash,
          payment_method: "web3_wallet",
        });

        setMsg(response.data.msg);
        setShowSuccess(true);
      } else {
        setMsg("MetaMask not detected.");
        setShowError(true);
      }
    } catch (error) {
      console.error("MetaMask transaction failed:", error);
      setMsg("Transaction failed.");
      setShowError(true);
    } finally {
      setTimeout(() => {
        setShowSpinner(false);
        closeModel();
        closeModel(true);
      }, 2500);
    }
  }
  return (
    <div
      onClick={closeModel}
      className="fixed bg-black/60 backdrop-blur-xs w-screen h-screen top-0 left-0 z-50 flex items-center justify-center"
    >
      {showError && <Error show={showError} msg={msg} />}
      {showSuccess && <Success show={showSuccess} msg={msg} />}
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white relative gap-3 py-3 px-5 w-10/12 h-fit text-[#09182C] flex flex-col rounded-xl"
      >
        {showSpinner && (
          <div className="absolute top-0 left-0 flex justify-center items-center rounded-xl w-full h-full bg-black/90 z-50">
            <span className="loading loading-spinner loading-xl text-white"></span>
          </div>
        )}
        <div className="text-xl pb-1 flex items-center justify-between border-b-1 border-gray-400 font-semibold">
          Method
          <X className="cursor-pointer" onClick={closeModel} />
        </div>
        <div className="flex flex-col gap-10">
          <div className="flex flex-wrap justify-between gap-4 text-sm md:text-base font-medium">
            <div className="flex-1 border rounded-xl p-4 shadow-sm bg-gray-50 flex justify-between items-center">
              <span>Web3 Wallet Balance</span>
              <span className="font-bold text-blue-700">{metmaskBalance}</span>
            </div>
            <div className="flex-1 border rounded-xl p-4 shadow-sm bg-gray-50 flex justify-between items-center">
              <span>Earning Wallet Balance</span>
              <span className="font-bold text-green-700">
                ${earningWalletBalance}
              </span>
            </div>
          </div>

          <div className="card border border-gray-200 bg-base-100 w-full md:w-3/4 xl:w-1/2 mx-auto shadow-sm">
            <figure>
              <img
                src={`/packages/${packageData.image}`}
                alt="Sample Package"
              />
            </figure>
            <div className="card-body">
              <h2 className="card-title">{packageData.title}</h2>
              <div className="flex justify-between">
                <div className="font-semibold">Price</div>
                <div>${packageData.price}</div>
              </div>
              <div className="flex justify-between">
                <div className="font-semibold">ROI (Monthly)</div>
                <div>{packageData.per_month_roi}%</div>
              </div>
              <div className="flex justify-between">
                <div className="font-semibold">Referral Bonus</div>
                <div>{packageData.referral_bonus}%</div>
              </div>
              <div className="card-actions flex gap-2 mt-4">
                <button
                  onClick={handleMetaMaskWallet}
                  className="btn btn-outline btn-primary w-full"
                >
                  Buy via MetaMask
                </button>
                <button
                  onClick={handelEarningWallet}
                  className="btn btn-primary w-full"
                >
                  Buy via Earning Wallet
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BuyModel;
