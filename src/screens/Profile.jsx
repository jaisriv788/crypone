import { useSelector } from "react-redux";
import imageSrc from "../assets/p2.jpg";

function Profile() {
  const email = useSelector((state) => state.auth.user);
  return (
    <div className="bg-white overflow-x-hidden rounded-2xl p-4 lg:px-20 lg:py-10 flex-1 ml-2 md:ml-24 mr-2 md:mr-10 sm:mb-[25px] mt-[90px] text-[#09182C] shadow-lg">
      <div className="font-semibold mb-6 text-2xl border-b border-gray-200 pb-2">
        Profile
      </div>
      <div className="flex flex-col gap-5">
        <div className="">
          <header className="mb-8">
            <div
              className="flex items-center justify-between p-6 bg-white rounded-2xl shadow-sm border-l-4"
              style={{ borderLeftColor: "#09182C" }}
            >
              <div className="flex items-center space-x-6">
                <div className="relative">
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
                  <h1
                    className="text-3xl font-bold"
                    style={{ color: "#09182C" }}
                  >
                    {email}
                  </h1>
                </div>
              </div>
            </div>
          </header>

          <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <article className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between mb-4">
                <div
                  className="p-3 rounded-xl"
                  style={{ backgroundColor: "#09182C" }}
                >
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
                <span className="text-xs px-2 py-1 bg-blue-100 text-blue-800 rounded-full font-medium">
                  ID
                </span>
              </div>
              <h3
                className="text-lg font-semibold mb-2"
                style={{ color: "#09182C" }}
              >
                UserId
              </h3>
              <p className="text-2xl font-bold text-gray-900">PRO1234567</p>
              <p className="text-sm text-gray-500 mt-2">
                Unique system identifier
              </p>
            </article>

            <article className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between mb-4">
                <div
                  className="p-3 rounded-xl"
                  style={{ backgroundColor: "#09182C" }}
                >
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
                <span className="text-xs px-2 py-1 bg-purple-100 text-purple-800 rounded-full font-medium">
                  WALLET
                </span>
              </div>
              <h3
                className="text-lg font-semibold mb-2"
                style={{ color: "#09182C" }}
              >
                Wallet Address
              </h3>
              <p className="text-sm font-mono text-gray-900 break-all bg-gray-50 p-2 rounded-lg">
                0x742d35Cc....
              </p>
              <p className="text-sm text-gray-500 mt-2">Ethereum mainnet</p>
            </article>

            <article className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between mb-4">
                <div
                  className="p-3 rounded-xl"
                  style={{ backgroundColor: "#09182C" }}
                >
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
                <span className="text-xs px-2 py-1 bg-green-100 text-green-800 rounded-full font-medium">
                  STATUS
                </span>
              </div>
              <h3
                className="text-lg font-semibold mb-2"
                style={{ color: "#09182C" }}
              >
                Account Status
              </h3>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-sm font-medium text-green-700">
                    Verified Account
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span className="text-sm font-medium text-blue-700">
                    Active Subscription
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

export default Profile;
