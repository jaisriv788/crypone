import {
  LogOut,
  Home,
  Users,
  HelpCircle,
  CloudUpload,
  ChartLine,
  Luggage,
  ChevronRight,
} from "lucide-react";
import { useDispatch } from "react-redux";
import { signout } from "../../features/auth/authSlice";
import { useNavigate } from "react-router";

function Sidebar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <div className="hidden z-30 md:flex mt-16 fixed h-full items-center  w-14 text-white py-10 flex-col gap-8 bg-[#09182C]">
      <Home
        className="cursor-pointer hover:text-[#88a0bd] "
        onClick={() => {
          navigate("/dashboard");
        }}
      />
      {/* <DollarSign
        className="cursor-pointer hover:text-[#88a0bd] transition ease-in-out duration-300"
        onClick={() => {
          navigate("/deposite");
        }}
      /> */}

      <div className="relative group w-full flex justify-center">
        <CloudUpload className="cursor-pointer hover:text-[#88a0bd] transition ease-in-out duration-300" />
        <div className="absolute w-[250px] -right-[250px] -top-10 z-50 hidden group-hover:block pointer-events-auto bg-[#09182C] text-white px-3 py-2 rounded-xl whitespace-nowrap shadow-lg transition duration-300">
          <div className="font-semibold border-b-1">Mining Package</div>
          <div
            onClick={() => {
              navigate("/buypackage");
            }}
            className=" mt-2 cursor-pointer flex items-center gap-1 text-sm hover:text-[#88a0bd] transition ease-in-out duration-300"
          >
            <ChevronRight size={15} /> Buy Package
          </div>
          <div
            onClick={() => {
              navigate("/purchasehistory");
            }}
            className=" text-sm cursor-pointer flex items-center gap-1 hover:text-[#88a0bd] transition ease-in-out duration-300"
          >
            <ChevronRight size={15} /> Purchase History
          </div>
        </div>
      </div>

      <div className="relative group w-full flex justify-center">
        <Users className="cursor-pointer hover:text-[#88a0bd] transition ease-in-out duration-300" />
        <div className="absolute w-[250px]  -right-[250px] -top-10 z-50  hidden group-hover:block pointer-events-auto bg-[#09182C] text-white px-3 py-2 rounded-xl whitespace-nowrap shadow-lg transition duration-300 ">
          <div className="font-semibold border-b-1">My Team</div>
          <div
            onClick={() => {
              navigate("/myreferals");
            }}
            className=" mt-2 cursor-pointer  flex items-center gap-1 text-sm hover:text-[#88a0bd] transition ease-in-out duration-300"
          >
            <ChevronRight size={15} /> My Referrals
          </div>
          {/* <div
            onClick={() => {
              navigate("/mylevels");
            }}
            className=" text-sm cursor-pointer  flex items-center gap-1 hover:text-[#88a0bd] transition ease-in-out duration-300"
          >
            <ChevronRight size={15} /> My Levels
          </div> */}
          <div
            onClick={() => {
              navigate("/mytree");
            }}
            className=" text-sm cursor-pointer  flex items-center gap-1 hover:text-[#88a0bd] transition ease-in-out duration-300"
          >
            <ChevronRight size={15} /> My Tree
          </div>
        </div>
      </div>

      <div className="relative group w-full flex justify-center">
        <ChartLine className="cursor-pointer hover:text-[#88a0bd] transition ease-in-out duration-300" />
        <div className="absolute w-[250px]  -right-[250px] -top-10 z-50  hidden group-hover:block pointer-events-auto bg-[#09182C] text-white px-3 py-2 rounded-xl whitespace-nowrap shadow-lg transition duration-300">
          <div className="font-semibold border-b-1">Income Report</div>
          <div
            onClick={() => {
              navigate("/referalbonus");
            }}
            className=" mt-2 cursor-pointer  flex items-center gap-1 text-sm hover:text-[#88a0bd] transition ease-in-out duration-300"
          >
            <ChevronRight size={15} /> Referal Bonus
          </div>
          <div
            onClick={() => {
              navigate("/binarybonus");
            }}
            className=" text-sm cursor-pointer  flex items-center gap-1 hover:text-[#88a0bd] transition ease-in-out duration-300"
          >
            <ChevronRight size={15} /> Binary Bonus
          </div>
          <div
            onClick={() => {
              navigate("/roibonus");
            }}
            className=" text-sm cursor-pointer  flex items-center gap-1 hover:text-[#88a0bd] transition ease-in-out duration-300"
          >
            <ChevronRight size={15} /> ROI Bonus
          </div>
          <div
            onClick={() => {
              navigate("/milestonebonus");
            }}
            className=" text-sm cursor-pointer  flex items-center gap-1 hover:text-[#88a0bd] transition ease-in-out duration-300"
          >
            <ChevronRight size={15} /> Mile Stone Bonus
          </div>
          {/* <div
            onClick={() => {
              navigate("/dailypassivebonus");
            }}
            className=" text-sm cursor-pointer  flex items-center gap-1 hover:text-[#88a0bd] transition ease-in-out duration-300"
          >
            <ChevronRight size={15} /> Daily Passive Bonus
          </div> */}
          <div
            onClick={() => {
              navigate("/transactions");
            }}
            className=" text-sm cursor-pointer  flex items-center gap-1 hover:text-[#88a0bd] transition ease-in-out duration-300"
          >
            <ChevronRight size={15} /> Transactions
          </div>
        </div>
      </div>

      <div className="relative group w-full flex justify-center">
        <Luggage className="cursor-pointer hover:text-[#88a0bd] transition ease-in-out duration-300" />{" "}
        <div className="absolute w-[250px] -right-[250px] -top-10 z-50  hidden group-hover:block pointer-events-auto bg-[#09182C] text-white px-3 py-2 rounded-xl whitespace-nowrap shadow-lg transition duration-300">
          <div className="font-semibold border-b-1">Income Report</div>
          <div
            onClick={() => {
              navigate("/withdrawal");
            }}
            className=" mt-2 cursor-pointer  flex items-center gap-1 text-sm hover:text-[#88a0bd] transition ease-in-out duration-300"
          >
            <ChevronRight size={15} /> Withdrawal
          </div>
          <div
            onClick={() => {
              navigate("/history");
            }}
            className=" text-sm cursor-pointer  flex items-center gap-1 hover:text-[#88a0bd] transition ease-in-out duration-300"
          >
            <ChevronRight size={15} /> History
          </div>
        </div>
      </div>

      <HelpCircle
        className="cursor-pointer hover:text-[#88a0bd] transition ease-in-out duration-300"
        onClick={() => {
          navigate("/support");
        }}
      />
      <LogOut
        title="hello"
        className="cursor-pointer hover:text-[#88a0bd] transition ease-in-out duration-300"
        onClick={() => {
          dispatch(signout());
          sessionStorage.removeItem("user");
          sessionStorage.removeItem("isSignedIn");
        }}
      />
    </div>
  );
}

export default Sidebar;
