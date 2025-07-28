import imageSrc from "../../assets/p2.jpg";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import axios from "axios";

function DashboardData() {
  const [data, setData] = useState(null);

  const baseurl = useSelector((state) => state.auth.baseurl);
  const user_id = useSelector((state) => state.auth.user.id);

  const fetchPackages = async () => {
    try {
      const response = await axios.post(`${baseurl}/api/user_data`, {
        user_id,
      });
      setData(response.data.data);
      // console.log(response.data.data);
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

  const colors = {
    0: "border-x-gray-500",
    1: "border-x-blue-700",
    2: "border-x-emerald-700",
    3: "border-x-orange-600",
    4: "border-indigo-700",
    5: "border-x-[#FFD700]",
  };
  const textClr = {
    0: "text-gray-500",
    1: "text-blue-700",
    2: "text-emerald-600",
    3: "text-orange-600",
    4: "text-indigo-700",
    5: "text-white",
  };
  const bgColor = {
    0: "bg-gray-200",
    1: "bg-blue-200",
    2: "bg-emerald-200",
    3: "bg-orange-200",
    4: "bg-indigo-200",
    5: "bg-yellow-400",
  };

  if (!data) {
    return (
      <div className="fixed flex justify-center items-center w-full h-full bg-black/70 backdrop-blur-sm top-0 left-0 z-50">
        <div className="loading loading-spinner text-white loading-xl"></div>
      </div>
    );
  }

  return (
    <div className="bg-gray-100 text-[#09182C] rounded-2xl p-8 shadow-[10px_10px_20px_#d1d9e6,_-10px_-10px_20px_#ffffff]">
      <div className="flex flex-col gap-5 ">
        <div>
          <header className="mb-8 ">
            <div
              className={`flex bg-white ${
                colors[data.package_id]
              } items-center overflow-hidden justify-between p-4  rounded-2xl shadow-[8px_8px_16px_#d1d9e6,_-8px_-8px_16px_#ffffff] border-x-4 border-[#2C3E50]`}
            >
              <div className="flex  sm:flex-row gap-3 sm:gap-0 flex-col items-center space-x-8">
                <div className="relative self-start">
                  <img
                    src={imageSrc}
                    alt="User Profile"
                    className="w-20 h-20 rounded-2xl object-cover border-2 border-gray-200"
                  />
                  <div className="absolute -top-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-3 border-white flex items-center justify-center">
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                  </div>
                </div>
                <div>
                  <h1 className="text-2xl md:text-3xl font-bold text-[#09182C]">
                    {data.first_name}
                  </h1>
                  <h1 className="text-lg sm:text-xl md:text-2xl font-bold text-[#09182C]">
                    {data.email}
                  </h1>
                  <h1 className="sm:hidden text-wrap mt-1 text-sm font-semibold text-gray-600">
                    {data.created_at
                      .slice(0, 10)
                      .split("-")
                      .reverse()
                      .join("-")}
                  </h1>
                </div>
              </div>

              <div className="hidden sm:block text-right text-sm font-semibold text-gray-600">
                {data.created_at.slice(0, 10).split("-").reverse().join("-")}
              </div>
            </div>
          </header>

          <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* CARD 1 */}
            <article className="bg-white rounded-2xl p-6 shadow-[6px_6px_12px_#d1d9e6,_-6px_-6px_12px_#ffffff] transition-shadow">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 rounded-xl bg-[#09182C]">
                  <svg
                    className="w-6 h-6 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V4a2 2 0 114 0v2m-4 0a2 2 0 104 0m-2 5v6m0 0l-2-2m2 2l2-2"
                    />
                  </svg>
                </div>
                <span
                  className={`text-[10px] lg:text-xs px-2 py-1 ${
                    bgColor[data.package_id]
                  } ${textClr[data.package_id]} rounded-full font-bold`}
                >
                  ID
                </span>
              </div>
              <h3 className="text-md lg:text-lg font-semibold mb-2 text-[#09182C]">
                UserId
              </h3>
              <p className=" text-xl lg:text-2xl font-bold text-gray-900">
                {data.username}
              </p>
            </article>

            {/* CARD 2 */}
            <article className="bg-white rounded-2xl p-6 shadow-[6px_6px_12px_#d1d9e6,_-6px_-6px_12px_#ffffff] transition-shadow">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 rounded-xl bg-[#09182C]">
                  <svg
                    className="w-6 h-6 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>
                </div>
                <span
                  className={`text-[10px] lg:text-xs px-2 py-1 ${
                    bgColor[data.package_id]
                  } ${textClr[data.package_id]} rounded-full font-bold`}
                >
                  SPONSORID
                </span>
              </div>
              <h3 className="text-md lg:text-lg font-semibold mb-2 text-[#09182C]">
                Sponsor Id
              </h3>
              <div className="text-xl lg:text-2xl font-bold text-gray-900">
                {data.sponsor_id.toUpperCase()}
              </div>
            </article>

            {/* CARD 3 */}
            <article className="bg-white rounded-2xl p-6 shadow-[6px_6px_12px_#d1d9e6,_-6px_-6px_12px_#ffffff] transition-shadow">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 rounded-xl bg-[#09182C]">
                  <svg
                    className="w-6 h-6 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <span
                  className={`text-[10px] lg:text-xs px-2 py-1 ${
                    bgColor[data.package_id]
                  } ${textClr[data.package_id]} rounded-full font-bold`}
                >
                  PACKAGE
                </span>
              </div>
              <h3 className="text-md lg:text-lg font-semibold mb-2 text-[#09182C]">
                Active Package
              </h3>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <span className="text-xl lg:text-2xl font-bold text-gray-900">
                    Package {data.package_id}
                  </span>
                </div>
              </div>
            </article>
          </section>
        </div>
      </div>
    </div>
  );
}

export default DashboardData;
