//common imports
import { Routes, Route } from "react-router";
import { useEffect, useState } from "react";
//screen imports
import Signin from "./screens/Signin";
import Signup from "./screens/Signup";
import Dashboard from "./screens/Dashboard";
import Deposite from "./screens/Deposite";
import BuyPackage from "./screens/BuyPackage";
import PurchaseHistory from "./screens/PurchaseHistory";
import MyReferal from "./screens/MyReferals";
import Mylevels from "./screens/MyLevels";
import MyTree from "./screens/MyTree";
import ReferalBonus from "./screens/ReferralBonus";
import BinaryBonus from "./screens/BinaryBonus";
import RoiBonus from "./screens/RoiBonus";
import MileStoneBonus from "./screens/MileBonus";
import DailyPassiveBonus from "./screens/DailyPassiveBonus";
import Transaction from "./screens/Transaction";
import Withdrawal from "./screens/Withdrawl";
import History from "./screens/History";
import Support from "./screens/Support";
import Profile from "./screens/Profile";
//components import
import ProtectedLayout from "./componenets/common/ProtectedLayout";
import Model from "./componenets/signup/OneTimeShowDetails/Model";
//redux imports
import { useDispatch } from "react-redux";
import { signin, signout } from "./features/auth/authSlice";

function App() {
  const [showModel, setShowModel] = useState(false);
  const [details, setDetails] = useState(null);
  const dispatch = useDispatch();

  function toggleModel(val) {
    setShowModel(val);
  }

  function getDetails(val) {
    setDetails(val);
  }

  useEffect(() => {
    const isSignedIn = sessionStorage.getItem("isSignedIn");
    const user = sessionStorage.getItem("user");
    if (isSignedIn && user) {
      const data = JSON.parse(user);
      dispatch(signin(data));
    } else {
      dispatch(signout());
      sessionStorage.removeItem("user");
      sessionStorage.removeItem("isSignedIn");
    }
  }, []);

  return (
    <>
      {showModel && (
        <Model
          getDetails={getDetails}
          details={details}
          toggleModel={toggleModel}
        />
      )}
      <Routes>
        <Route path="/" element={<Signin />} />
        <Route
          path="/signup"
          element={<Signup getDetails={getDetails} toggleModel={toggleModel} />}
        />
        <Route
          path="/signup/:sponsorId/:position/:disable"
          element={<Signup getDetails={getDetails} toggleModel={toggleModel} />}
        />

        {/*These are the routes to the sidebar*/}
        <Route element={<ProtectedLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          {/* <Route path="/deposite" element={<Deposite />} /> */}
          <Route path="/buypackage" element={<BuyPackage />} />
          <Route path="/purchasehistory" element={<PurchaseHistory />} />
          <Route path="/myreferals" element={<MyReferal />} />
          {/* <Route path="/mylevels" element={<Mylevels />} /> */}
          <Route path="/mytree" element={<MyTree />} />
          <Route path="/referalbonus" element={<ReferalBonus />} />
          <Route path="/binarybonus" element={<BinaryBonus />} />
          <Route path="/roibonus" element={<RoiBonus />} />
          <Route path="/milestonebonus" element={<MileStoneBonus />} />
          {/* <Route path="/dailypassivebonus" element={<DailyPassiveBonus />} /> */}
          <Route path="/transactions" element={<Transaction />} />
          <Route path="/withdrawal" element={<Withdrawal />} />
          <Route path="/history" element={<History />} />
          <Route path="/support" element={<Support />} />
          <Route path="/profile" element={<Profile />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
