import { useState } from "react";
import { Eye, EyeOff, Lock, Mail, TrendingUp } from "lucide-react";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { signin } from "../features/auth/authSlice";
import Error from "../componenets/elements/Error";
import axios from "axios";

export default function Signin() {
  const [showPassword, setShowPassword] = useState(false);
  const [showError, setShowError] = useState(false);
  const [username, setusername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const baseurl = useSelector((state) => state.auth.baseurl);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await axios.post(`${baseurl}/api/login`, {
      username,
      password,
    });

    console.log("ites me ", response.data.user);

    if (response.data.status == 200) {
      const data = {
        username,
        id: response.data.user.id,
        sponsorId: response.data.user.sponsor_id,
        accountStatus: response.data.user.status,
        name: response.data.user.first_name,
        email: response.data.user.email,
        activePackage: response.data.user.package_id,
        wallet_address: response.data.user.wallet_address,
        registrationData: response.data.user.created_at,
      };
      dispatch(signin(data));
      sessionStorage.setItem("isSignedIn", true);
      sessionStorage.setItem("user", JSON.stringify(data));
      navigate("/dashboard");
    } else {
      setShowError(true);
      setTimeout(() => {
        setShowError(false);
      }, 3000);
    }
  };

  return (
    <div
      className="min-h-screen over flex items-center justify-center p-4"
      style={{ backgroundColor: "#09182C" }}
    >
      {showError && (
        <Error show={showError} msg="Invalid Username or Password" />
      )}
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <div className="bg-white rounded-full p-3 mr-3">
              <TrendingUp className="h-8 w-8" style={{ color: "#09182C" }} />
            </div>
            <h1 className="text-3xl font-bold text-white">EmirROI</h1>
          </div>
          <p className="text-gray-300">Your Gateway to Crypto Success</p>
        </div>

        <div className="bg-white rounded-lg shadow-2xl overflow-hidden">
          <div className="px-6 pt-6 pb-4">
            <h2
              className="text-2xl font-bold text-center mb-2"
              style={{ color: "#09182C" }}
            >
              Welcome Back
            </h2>
            <p className="text-center text-gray-600">
              Sign in to your EmirROI account
            </p>
          </div>

          <div className="px-6 pb-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <label
                  htmlFor="username"
                  className="block text-sm font-medium"
                  style={{ color: "#09182C" }}
                >
                  Username
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <input
                    id="username"
                    type="Text"
                    placeholder="Enter your username"
                    value={username}
                    onChange={(e) => setusername(e.target.value)}
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
                  htmlFor="password"
                  className="block text-sm font-medium"
                  style={{ color: "#09182C" }}
                >
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-opacity-50 focus:border-transparent transition-all duration-200"
                    style={{
                      focusRingColor: "#09182C",
                      "--tw-ring-color": "#09182C",
                    }}
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-3 text-gray-400 hover:text-gray-600 focus:outline-none"
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                className="w-full cursor-pointer text-white font-semibold py-3 px-4 rounded-md transition-all duration-200 hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2"
                style={{
                  backgroundColor: "#09182C",
                  "--tw-ring-color": "#09182C",
                }}
              >
                Sign In
              </button>
            </form>

            <div className="text-center mt-6">
              <p className="text-sm text-gray-600">
                Don't have an account?{" "}
                <a
                  onClick={() => navigate("/signup")}
                  className="font-semibold cursor-pointer hover:underline transition-all duration-200"
                  style={{ color: "#09182C" }}
                >
                  Sign up now
                </a>
              </p>
            </div>
          </div>
        </div>

        <div className="text-center mt-8">
          <p className="text-xs text-gray-400">
            © 2025 EmirROI. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
}
