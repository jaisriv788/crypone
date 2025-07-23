import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { CircleCheck, Mail, TrendingUp, User, Users } from "lucide-react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import axios from "axios";

export default function Signup({ toggleModel, getDetails }) {
  const [sponsorFound, setSponsorFound] = useState(false);
  const [foundUser, setFoundUser] = useState("");
  const [formData, setFormData] = useState({
    sponsor_id: "",
    name: "",
    email: "",
    phone_no: "",
    country_code: "+91",
    position: "",
  });

  const navigate = useNavigate();
  const baseurl = useSelector((state) => state.auth.baseurl);
  const { sponsorId, position } = useParams();

  useEffect(() => {
    if (sponsorId && position) {
      setFormData((prev) => ({
        ...prev,
        sponsor_id: sponsorId,
        position: position.toLowerCase() === "left" ? "L" : "R",
      }));
    }
  }, [sponsorId, position]);

  useEffect(() => {
    if (formData.sponsor_id.trim() === "") return;
    setFoundUser(false);
    const delayDebounce = setTimeout(() => {
      fetchUsername(formData.sponsor_id);
    }, 300);

    return () => clearTimeout(delayDebounce);
  }, [formData.sponsor_id]);

  const fetchUsername = async () => {
    const response = await axios.post(`${baseurl}/api/checkUsername`, {
      username: formData.sponsor_id,
    });
    console.log(response.data);
    if (response.data.status == 200) {
      setSponsorFound(true);
      setFoundUser(response.data.user.first_name);
    }
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        `${baseurl}/api/registration`,
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      // console.log(response.data.user);
      getDetails({
        username: response.data.user.username,
        password: response.data.user.show_password,
      });
      navigate("/");
      toggleModel(true);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center p-3"
      style={{ backgroundColor: "#09182C" }}
    >
      <div className="w-full max-w-md">
        <div className="text-center mb-4">
          <div className="flex items-center justify-center mb-2">
            <div className="bg-white rounded-full p-3 mr-3">
              <TrendingUp className="h-8 w-8" style={{ color: "#09182C" }} />
            </div>
            <h1 className="text-3xl font-bold text-white">ProjectName</h1>
          </div>
          <p className="text-gray-300">Join the Future of Crypto Success</p>
        </div>

        <div className="bg-white rounded-lg shadow-2xl overflow-hidden">
          <div className="px-6 pt-3 pb-4">
            <h2
              className="text-2xl font-bold text-center mb-2"
              style={{ color: "#09182C" }}
            >
              Create Account
            </h2>
            <p className="text-center text-gray-600">
              Start your ProjectName journey today
            </p>
          </div>

          <div className="px-6 pb-3">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <label
                  htmlFor="sponsor"
                  className="text-sm font-medium flex justify-between"
                  style={{ color: "#09182C" }}
                >
                  <div>
                    Sponsor ID
                    <span className="text-red-500 ">*</span>
                  </div>
                  {formData.sponsor_id === "" ? (
                    <div></div>
                  ) : foundUser ? (
                    <div className="text-emerald-500">
                      {/*foundUser*/} User Found
                    </div>
                  ) : (
                    <div className="text-red-500">
                      {/*foundUser*/} User Not Found
                    </div>
                  )}
                </label>
                <div className="relative">
                  <Users className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <input
                    id="sponsor"
                    name="sponsor_id"
                    type="text"
                    placeholder="Enter sponsor ID"
                    value={formData.sponsor_id}
                    onChange={handleInputChange}
                    className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-opacity-50 focus:border-transparent transition-all duration-200"
                    style={{
                      focusRingColor: "#09182C",
                      "--tw-ring-color": "#09182C",
                    }}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="name"
                  className="block text-sm font-medium"
                  style={{ color: "#09182C" }}
                >
                  Full Name<span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <input
                    id="name"
                    name="name"
                    type="text"
                    placeholder="Enter your full name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-opacity-50 focus:border-transparent transition-all duration-200"
                    style={{
                      focusRingColor: "#09182C",
                      "--tw-ring-color": "#09182C",
                    }}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium"
                  style={{ color: "#09182C" }}
                >
                  Email Address<span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="true"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-opacity-50 focus:border-transparent transition-all duration-200"
                    style={{
                      focusRingColor: "#09182C",
                      "--tw-ring-color": "#09182C",
                    }}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="phone_no"
                  className="block text-sm font-medium"
                  style={{ color: "#09182C" }}
                >
                  Phone Number<span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-2.5 text-gray-500 text-sm">
                    +91
                  </span>
                  <input
                    id="phone_no"
                    name="phone_no"
                    type="tel"
                    placeholder="Enter your phone number"
                    value={formData.phone_no}
                    onChange={handleInputChange}
                    className="w-full pl-14 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-opacity-50 focus:border-transparent transition-all duration-200"
                    style={{
                      focusRingColor: "#09182C",
                      "--tw-ring-color": "#09182C",
                    }}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label
                  className="block text-sm font-medium"
                  style={{ color: "#09182C" }}
                >
                  Position<span className="text-red-500">*</span>
                </label>
                <div className="flex space-x-6">
                  <div className="flex items-center">
                    <input
                      id="left"
                      name="position"
                      type="radio"
                      value="L"
                      checked={formData.position === "L"}
                      onChange={handleInputChange}
                      className="h-4 w-4 border-gray-300 "
                      style={{
                        accentColor: "#09182C",
                        "--tw-ring-color": "#09182C",
                      }}
                      required
                    />
                    <label
                      htmlFor="left"
                      className="ml-2 text-sm text-gray-700"
                    >
                      Left
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input
                      id="right"
                      name="position"
                      type="radio"
                      value="R"
                      checked={formData.position === "R"}
                      onChange={handleInputChange}
                      className="h-4 w-4 border-gray-300 "
                      style={{
                        accentColor: "#09182C",
                        "--tw-ring-color": "#09182C",
                      }}
                      required
                    />
                    <label
                      htmlFor="right"
                      className="ml-2 text-sm text-gray-700"
                    >
                      Right
                    </label>
                  </div>
                </div>
              </div>

              <button
                type="submit"
                className={`w-full ${
                  sponsorFound
                    ? "bg-[#09182C] cursor-pointer"
                    : "bg-gray-500 cursor-not-allowed"
                } text-white font-semibold py-3 px-4 rounded-md transition-all duration-200 hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2`}
                style={{
                  "--tw-ring-color": "#09182C",
                }}
                disabled={sponsorFound ? false : true}
              >
                Create Account
              </button>
            </form>

            <div className="text-center mt-6">
              <p className="text-sm text-gray-600">
                Already have an account?{" "}
                <a
                  href="/"
                  className="font-semibold hover:underline transition-all duration-200"
                  style={{ color: "#09182C" }}
                  onClick={() => (window.location.href = "/signin")}
                >
                  Sign in here
                </a>
              </p>
            </div>
          </div>
        </div>

        <div className="text-center mt-4">
          <p className="text-xs text-gray-400">
            © 2025 ProjectName. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
}
