// import { X } from "lucide-react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import axios from "axios";
import {  useState } from "react";
import Error from "../elements/Error";
import Success from "../elements/Success";
import Web3 from "web3";
import tokenAbi from "../../abis/token.json";
import contractAbi from "../../abis/contract.json";

function BuyModel({ closeModel, packageData, metmaskBalance }) {
  const [showSpinner, setShowSpinner] = useState(false);
  const [showError, setShowError] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  // const [earningWalletBalance, setEarningWalletBalance] = useState(0);
  const [msg, setMsg] = useState("");

  const baseurl = useSelector((state) => state.auth.baseurl);
  const user_id = useSelector((state) => state.auth.user.id);
  const tokenId = "0xF78A55dB9391E9B689734BA3E45c1C3A5535A857";
  const contractId = "0x15be2A2882aC8D982E9C4b1f255fFE683524772f";
  const navigate = useNavigate();

  // useEffect(() => {
  //   const controller = new AbortController();

  //   const fetchData = async () => {
  //     const response = await axios.post(`${baseurl}/api/user_wallet_balance`, {
  //       user_id,
  //     });
  //     setEarningWalletBalance(response.data.data.withdrawl_wallet);
  //   };
  //   fetchData();
  //   return () => {
  //     controller.abort();
  //   };
  // }, []);

  // async function handelEarningWallet() {
  //   try {
  //     setShowSpinner(true);
  //     const response = await axios.post(`${baseurl}/api/buy_package`, {
  //       user_id,
  //       package_id: packageData.id,
  //       payment_method: "earning_wallet",
  //     });
  //     console.log(response);
  //     if (response.data.status == 200) {
  //       setMsg("Purchased Successfully.");
  //       setShowSuccess(true);
  //       setTimeout(() => {
  //         setShowSuccess(false);
  //         setShowSpinner(false);
  //         closeModel();
  //         navigate("/purchasehistory");
  //       }, 3000);
  //     } else {
  //       setMsg("Low Balance.");
  //       setShowError(true);
  //       setTimeout(() => {
  //         setShowError(false);
  //         setShowSpinner(false);
  //         closeModel();
  //       }, 3000);
  //     }
  //   } catch (error) {
  //     console.log(error);
  //     setShowSpinner(false);
  //     closeModel();
  //   }
  // }

  async function handleMetaMaskWallet() {
    try {
      setShowSpinner(true);
      // console.log(packageData);
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
        navigate("/purchasehistory");
      }, 2500);
    }
  }
  return (
    <dialog
      open
      onClick={closeModel}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 50,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "rgba(9, 24, 44, 0.8)",
        backdropFilter: "blur(6px)",
        border: "none",
        padding: "20px",
        margin: 0,
        width: "100vw",
        height: "100vh",
      }}
    >
      {showError && <Error show={showError} msg={msg} />}
      {showSuccess && <Success show={showSuccess} msg={msg} />}

      <main
        onClick={(e) => e.stopPropagation()}
        className="relative hidden w-full max-w-[800px] bg-white text-[#09182C] rounded-[20px] shadow-[0_25px_80px_rgba(0,0,0,0.4)] overflow-hidden max-h-[90vh] md:grid grid-cols-2"
      >
        {/* Left Side */}
        <section style={{ padding: "32px", background: "white" }}>
          <header style={{ marginBottom: "24px" }}>
            <h1 style={{ margin: 0, fontSize: "28px", fontWeight: 700 }}>
              Buy Package
            </h1>
            <p style={{ margin: 0, color: "#09182C", opacity: 0.7 }}>
              Complete your purchase securely
            </p>
          </header>

          {/* Balances */}
          <section style={{ marginBottom: "24px" }}>
            <h2 style={{ fontSize: "18px", fontWeight: 600 }}>Your Balances</h2>

            <article
              style={{
                border: "1px solid #09182C",
                borderRadius: "12px",
                padding: "16px",
                marginBottom: "12px",
                background: "white",
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <div>
                  <h3 style={{ margin: 0, fontSize: "14px", fontWeight: 600 }}>
                    Web3 Wallet
                  </h3>
                  <p style={{ margin: 0, fontSize: "12px", opacity: 0.6 }}>
                    MetaMask Connected
                  </p>
                </div>
                <span style={{ fontSize: "16px", fontWeight: 700 }}>
                  {metmaskBalance}
                </span>
              </div>
            </article>

            {/* <article
              style={{
                border: "1px solid #09182C",
                borderRadius: "12px",
                padding: "16px",
                background: "white",
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <div>
                  <h3 style={{ margin: 0, fontSize: "14px", fontWeight: 600 }}>
                    Earning Wallet
                  </h3>
                  <p style={{ margin: 0, fontSize: "12px", opacity: 0.6 }}>
                    Available Balance
                  </p>
                </div>
                <span style={{ fontSize: "16px", fontWeight: 700 }}>
                  ${earningWalletBalance}
                </span>
              </div>
            </article> */}
          </section>

          {/* Buttons */}
          <section>
            <h2
              style={{
                fontSize: "18px",
                fontWeight: 600,
                marginBottom: "16px",
              }}
            >
              Payment Method
            </h2>
            <div
              style={{ display: "flex", flexDirection: "column", gap: "12px" }}
            >
              <button
                onClick={handleMetaMaskWallet}
                style={{
                  padding: "16px",
                  background: "#09182C",
                  color: "white",
                  fontWeight: 600,
                  borderRadius: "12px",
                  border: "none",
                  cursor: "pointer",
                  textAlign: "left",
                }}
              >
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <span>Pay with MetaMask</span>
                  <span style={{ fontSize: "12px", opacity: 0.8 }}>
                    Recommended
                  </span>
                </div>
              </button>
              {/* <button
                onClick={handelEarningWallet}
                style={{
                  padding: "16px",
                  background: "white",
                  border: "2px solid #09182C",
                  color: "#09182C",
                  fontWeight: 600,
                  borderRadius: "12px",
                  cursor: "pointer",
                  textAlign: "left",
                }}
              >
                <span>Pay with Earning Wallet</span>
              </button> */}
            </div>
          </section>
        </section>

        {/* Right Side */}
        <section
          style={{
            background: "#09182C",
            color: "white",
            padding: "32px",
            display: "flex",
            flexDirection: "column",
          }}
        >
          {/* Close Button */}
          <header
            style={{
              display: "flex",
              justifyContent: "flex-end",
              marginBottom: "24px",
            }}
          >
            <button
              onClick={closeModel}
              style={{
                background: "none",
                border: "none",
                color: "white",
                fontSize: "24px",
                cursor: "pointer",
                padding: "4px",
              }}
            >
              ×
            </button>
          </header>

          {/* Package Info */}
          <article
            style={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            <figure style={{ margin: 0, marginBottom: "24px" }}>
              <img
                src={`packages/${packageData.image}`}
                alt={packageData.title}
                style={{
                  width: "100%",
                  height: "200px",
                  objectFit: "cover",
                  borderRadius: "12px",
                }}
              />
            </figure>

            <h3
              style={{
                fontSize: "24px",
                fontWeight: 700,
                textAlign: "center",
                marginBottom: "20px",
              }}
            >
              {packageData.title}
            </h3>

            <div
              style={{
                background: "rgba(255,255,255,0.1)",
                borderRadius: "12px",
                padding: "20px",
                marginBottom: "24px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: "12px",
                }}
              >
                <span>Package Price</span>
                <span style={{ fontWeight: 700 }}>${packageData.price}</span>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: "12px",
                }}
              >
                <span>Monthly ROI</span>
                <span style={{ fontWeight: 700 }}>
                  {packageData.per_month_roi}%
                </span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span>Referral Bonus</span>
                <span style={{ fontWeight: 700 }}>
                  {packageData.referral_bonus}%
                </span>
              </div>
            </div>

            <div
              style={{
                background: "rgba(255,255,255,0.05)",
                borderRadius: "12px",
                padding: "16px",
                textAlign: "center",
              }}
            >
              <p style={{ margin: 0, fontSize: "14px", opacity: 0.8 }}>
                Secure transaction powered by blockchain technology
              </p>
            </div>
          </article>
        </section>

        {/* Loading Spinner Overlay */}
        {showSpinner && (
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              backgroundColor: "rgba(0,0,0,0.9)",
              zIndex: 100,
              width: "100%",
              height: "100%",
              borderRadius: "20px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <span className="loading loading-spinner loading-xl text-white"></span>
          </div>
        )}
      </main>

      <dialog
        open
        className="fixed inset-0 z-50 flex md:hidden items-center justify-center bg-black/70 backdrop-blur-md w-screen h-screen p-5 m-0"
      >
        {showError && <Error show={showError} msg={msg} />}
        {showSuccess && <Success show={showSuccess} msg={msg} />}

        <main
          onClick={(e) => e.stopPropagation()}
          className="relative w-full max-w-xl bg-white rounded-3xl shadow-[0_30px_100px_rgba(9,24,44,0.4)] max-h-[90vh] overflow-y-auto"
        >
          {/* Spinner Overlay */}
          {showSpinner && (
            <div className="absolute inset-0 z-50 bg-black/90 flex items-center justify-center rounded-3xl">
              <span className="loading loading-spinner loading-xl text-white"></span>
            </div>
          )}

          {/* Close Button */}
          <button
            onClick={closeModel}
            className="absolute top-5 right-5 z-10 bg-white/90 text-[#09182C] rounded-full w-10 h-10 flex items-center justify-center text-xl shadow-md"
          >
            ×
          </button>

          {/* Package Section */}
          <article className="bg-[#09182C] text-white px-6 py-3">
            <figure className="mb-2">
              <img
                src={`packages/${packageData.image}`}
                alt={packageData.title}
                className="w-full h-[180px] object-cover rounded-2xl"
              />
            </figure>
            <header className="text-center mb-2">
              <h1 className="text-2xl font-bold mb-1">{packageData.title}</h1>
              <p className="text-sm opacity-80">
                High-yield investment opportunity
              </p>
            </header>
            <section className="bg-white/10 rounded-2xl p-3 mb-2">
              <div className="grid grid-cols-3 text-center gap-4">
                <div>
                  <p className="text-[11px] uppercase opacity-70 mb-1">Price</p>
                  <p className="text-lg font-bold">${packageData.price}</p>
                </div>
                <div>
                  <p className="text-[11px] uppercase opacity-70 mb-1">
                    Monthly ROI
                  </p>
                  <p className="text-lg font-bold">
                    {packageData.per_month_roi}%
                  </p>
                </div>
                <div>
                  <p className="text-[11px] uppercase opacity-70 mb-1">
                    Referral
                  </p>
                  <p className="text-lg font-bold">
                    {packageData.referral_bonus}%
                  </p>
                </div>
              </div>
            </section>
          </article>

          {/* Wallet + Actions Section */}
          <section className="bg-white text-[#09182C] px-6 py-3">
            <header className="mb-3">
              <h2 className="text-xl font-bold mb-1">Choose Payment Method</h2>
              <p className="text-sm opacity-70">Select your preferred wallet</p>
            </header>

            <div className="grid grid-cols-1 gap-3 mb-3">
              <div className="border-2 border-[#09182C] rounded-xl p-4 text-center bg-white">
                <h3 className="text-sm font-semibold mb-1">Web3 Wallet</h3>
                <p className="text-lg font-bold">{metmaskBalance}</p>
              </div>
              {/* <div className="border-2 border-[#09182C] rounded-xl p-4 text-center bg-white">
                <h3 className="text-sm font-semibold mb-1">Earning Wallet</h3>
                <p className="text-lg font-bold">${earningWalletBalance}</p>
              </div> */}
            </div>

            <div className="flex flex-col gap-2">
              <button
                onClick={handleMetaMaskWallet}
                className="w-full py-4 bg-[#09182C] text-white font-bold text-base rounded-xl hover:brightness-110 transition"
              >
                Purchase with MetaMask
              </button>
              {/* <button
                onClick={handelEarningWallet}
                className="w-full py-4 bg-white border-2 border-[#09182C] text-[#09182C] font-bold text-base rounded-xl hover:bg-[#09182C]/10 transition"
              >
                Purchase with Earning Wallet
              </button> */}
            </div>
          </section>
        </main>
      </dialog>
    </dialog>
  );
}

export default BuyModel;
