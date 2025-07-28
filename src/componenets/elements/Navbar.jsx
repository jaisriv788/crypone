import { useState } from "react";
import {
  Menu,
  TrendingUp,
  Settings,
  LogOut,
  X,
  User,
  Home,
  DollarSign,
  Users,
  HelpCircle,
  CloudUpload,
  ChartLine,
  Luggage,
  ChevronRight,
} from "lucide-react";
import { useNavigate } from "react-router";
// import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { signout } from "../../features/auth/authSlice";
import imageSrc from "../../assets/p2.jpg";

export default function Navbar() {
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [openMenus, setOpenMenus] = useState({});

  const toggleSubmenu = (name) => {
    setOpenMenus((prev) => ({ ...prev, [name]: !prev[name] }));
  };

  const navigate = useNavigate();
  const dispatch = useDispatch();

  // const userEmail = useSelector((state) => state.auth.user);

  const toggleProfileDropdown = () => {
    setIsProfileDropdownOpen(!isProfileDropdownOpen);
  };

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  const navigationLinks = [
    { name: "Dashboard", icon: Home, href: "/dashboard" },
    // { name: "Deposite", icon: DollarSign, href: "/deposite" },
    {
      name: "Mining Packages",
      icon: CloudUpload,
      subroutes: [
        { name: "Buy Package", icon: ChevronRight, href: "/buypackage" },
        {
          name: "Purchase History",
          icon: ChevronRight,
          href: "/purchasehistory",
        },
      ],
    },
    {
      name: "My Team",
      icon: Users,
      subroutes: [
        { name: "My Referal", icon: ChevronRight, href: "/myreferals" },
        // { name: "My Levels", icon: ChevronRight, href: "/mylevels" },
        { name: "My Tree", icon: ChevronRight, href: "/mytree" },
      ],
    },
    {
      name: "Income Report",
      icon: ChartLine,
      subroutes: [
        { name: "Referal Bonus", icon: ChevronRight, href: "/referalbonus" },
        { name: "Binary Bonus", icon: ChevronRight, href: "/binarybonus" },
        { name: "ROI Bonus", icon: ChevronRight, href: "/roibonus" },
        {
          name: "Mile Stone Bonus",
          icon: ChevronRight,
          href: "/milestonebonus",
        },
        // {
        //   name: "Daily Passive Bonus",
        //   icon: ChevronRight,
        //   href: "/dailypassivebonus",
        // },
        { name: "Transaction", icon: ChevronRight, href: "/transactions" },
      ],
    },
    {
      name: "Withdrawl Fund",
      icon: Luggage,
      subroutes: [
        { name: "Withdrawal", icon: ChevronRight, href: "/withdrawal" },
        { name: "History", icon: ChevronRight, href: "/history" },
      ],
    },
    { name: "Support", icon: HelpCircle, href: "/support" },
  ];

  return (
    <>
      <nav
        className="w-full shadow-lg fixed z-40"
        style={{ backgroundColor: "#09182C" }}
      >
        <div className="px-4 sm:px-6 lg:px-20">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <button
                onClick={toggleDrawer}
                className="p-2 rounded-md hover:text-[#09182C] cursor-pointer text-white hover:bg-white hover:bg-opacity-10 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50"
              >
                <Menu className="h-6 w-6" />
              </button>

              <div
                onClick={() => {
                  navigate("/dashboard");
                }}
                className="flex items-center cursor-pointer"
              >
                <div className="bg-white rounded-full p-2 mr-2">
                  <TrendingUp
                    className="h-6 w-6"
                    style={{ color: "#09182C" }}
                  />
                </div>
                <span className="text-xl font-bold text-white">EmirROI</span>
              </div>
            </div>

            <div className="relative ">
              {/* <button
                onClick={toggleProfileDropdown}
                className="flex items-center cursor-pointer hover:text-[#09182C] font-semibold space-x-3 px-3 py-2 rounded-md text-white hover:bg-white hover:bg-opacity-10 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50"
              >
                <div className="h-8 w-8 rounded-full bg-white flex items-center justify-center overflow-hidden">
                  <img
                    src={imageSrc}
                    alt="Profile"
                    className="h-full w-full object-cover rounded-full"
                    onError={(e) => {
                      e.target.style.display = "none";
                      e.target.nextSibling.style.display = "flex";
                    }}
                  />
                  <div
                    className="h-full w-full bg-gray-200 flex items-center justify-center rounded-full"
                    style={{ display: "none" }}
                  >
                    <User className="h-4 w-4 text-gray-500" />
                  </div>
                </div>

                <div className="hidden sm:block text-left">
                  <div className="text-sm">{userEmail}</div>
                </div>

                <ChevronDown
                  className={`h-4 w-4 transition-transform duration-200 ${
                    isProfileDropdownOpen ? "rotate-180" : ""
                  }`}
                />
              </button> */}
              <img
                onClick={toggleProfileDropdown}
                src={imageSrc}
                alt={imageSrc}
                className="h-12 w-12 rounded-full cursor-pointer"
              />

              {isProfileDropdownOpen && (
                <div className="absolute right-0 md:-right-16 mt-3 w-56 bg-white rounded-md shadow-lg border border-gray-200 z-50">
                  <div className="py-1">
                    <div className="px-4 py-3 border-b border-gray-100 sm:hidden">
                      <div className="text-sm font-medium text-gray-900">
                        John Doe
                      </div>
                      <div className="text-sm text-gray-500">
                        john@emirroi.com
                      </div>
                    </div>

                    <a
                      onClick={() => {
                        navigate("/profile");
                      }}
                      className="flex cursor-pointer items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors duration-200"
                    >
                      <User className="h-4 w-4 mr-3" />
                      Profile
                    </a>

                    <div className="border-t border-gray-100 my-1"></div>

                    <button
                      className="flex cursor-pointer items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors duration-200"
                      onClick={() => {
                        dispatch(signout());
                        sessionStorage.removeItem("user");
                        sessionStorage.removeItem("isSignedIn");
                      }}
                    >
                      <LogOut className="h-4 w-4 mr-3" />
                      Sign Out
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>

      <div
        className={`fixed inset-0 z-40 transition-opacity duration-300 ${
          isDrawerOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
      >
        <div
          className="absolute inset-0 bg-black/90"
          onClick={toggleDrawer}
        ></div>

        <div
          className={`absolute z-50 left-0 top-0 h-full w-80 bg-white shadow-xl transform transition-transform duration-300 ease-in-out flex flex-col ${
            isDrawerOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div
            className="flex items-center justify-between py-3 px-4 border-b border-gray-200"
            style={{ backgroundColor: "#09182C" }}
          >
            <div className="flex items-center">
              <div className="bg-white rounded-full p-2 mr-3">
                <TrendingUp className="h-6 w-6" style={{ color: "#09182C" }} />
              </div>
              <span className="text-xl font-bold text-white">EmirROI</span>
            </div>
            <button
              onClick={toggleDrawer}
              className="p-2 rounded-md text-white hover:text-[#09182C] cursor-pointer hover:bg-white hover:bg-opacity-10 transition-all duration-200"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <div className="py-4 custom-scrollbar overflow-y-auto">
            <nav className="space-y-1">
              {navigationLinks.map((link) => {
                const IconComponent = link.icon;
                const hasSubroutes = !!link.subroutes;

                return (
                  <div key={link.name}>
                    <div
                      className="flex items-center justify-between px-4 py-3 text-gray-700 hover:bg-gray-100 hover:text-gray-900 transition-colors duration-200 cursor-pointer group"
                      onClick={() => {
                        if (hasSubroutes) {
                          toggleSubmenu(link.name);
                        } else {
                          toggleDrawer();
                          navigate(link.href);
                        }
                      }}
                    >
                      <div className="flex items-center">
                        <IconComponent className="h-5 w-5 mr-3 text-gray-400 group-hover:text-gray-600" />
                        <span className="font-medium">{link.name}</span>
                      </div>
                      {hasSubroutes && (
                        <button className="text-gray-400 group-hover:text-gray-600 transition-transform duration-300">
                          <ChevronRight
                            className={`h-4 w-4 transform transition-transform duration-300 ${
                              openMenus[link.name] ? "rotate-90" : "rotate-0"
                            }`}
                          />
                        </button>
                      )}
                    </div>

                    {hasSubroutes && openMenus[link.name] && (
                      <div className="ml-8 space-y-1">
                        {link.subroutes.map((sub) => {
                          const SubIcon = sub.icon;
                          return (
                            <a
                              key={sub.name}
                              onClick={() => {
                                navigate(sub.href);
                                toggleDrawer();
                              }}
                              className="flex cursor-pointer items-center px-4 py-2 text-sm text-gray-600 hover:bg-gray-100 hover:text-gray-800 transition-colors duration-200"
                            >
                              <SubIcon className="h-4 w-4 mr-2 text-gray-400 group-hover:text-gray-600" />
                              {sub.name}
                            </a>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              })}
              <div
                className="flex items-center justify-between px-4 py-3 text-gray-700 hover:bg-gray-100 hover:text-gray-900 transition-colors duration-200 cursor-pointer group"
                onClick={() => {
                  dispatch(signout());
                  sessionStorage.removeItem("user");
                  sessionStorage.removeItem("isSignedIn");
                }}
              >
                <div className="flex items-center">
                  <LogOut className="h-5 w-5 mr-3 text-gray-400 group-hover:text-gray-600" />
                  <span className="font-medium">Signout</span>
                </div>
              </div>
            </nav>
          </div>

          <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200 bg-white">
            <div className="text-center">
              <p className="text-xs text-gray-500">© 2025 EmirROI</p>
              <p className="text-xs text-gray-400">Version 2.1.0</p>
            </div>
          </div>
        </div>
      </div>

      {isProfileDropdownOpen && (
        <div
          className="fixed inset-0 z-30"
          onClick={() => setIsProfileDropdownOpen(false)}
        ></div>
      )}
    </>
  );
}
