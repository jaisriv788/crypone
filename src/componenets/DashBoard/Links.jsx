import { Copy } from "lucide-react";
import { useSelector } from "react-redux";

function Links() {
  const username = useSelector((state) => state.auth.user.username);
  const links = [
    `https://worldofsoftware.in/rpro/users/signup/${username}/left/true`,
    `https://worldofsoftware.in/rpro/users/signup/${username}/right/true`,
  ];

  return (
    <div className="bg-gray-100 text-[#09182C] rounded-2xl p-6 shadow-[10px_10px_20px_#d1d9e6,_-10px_-10px_20px_#ffffff]">
      <div className="flex flex-wrap gap-4  lg:gap-10 md:flex-row flex-col">
        {links.map((link, index) => (
          <div
            key={index}
            className="flex-1 min-w-[200px] max-w-full flex items-center 
                   rounded-xl bg-white 
                   shadow-[6px_6px_12px_#d1d9e6,_-6px_-6px_12px_#ffffff] 
                   overflow-hidden border border-gray-200"
          >
            <div className="px-3 sm:px-4 text-sm font-medium text-gray-800 py-2 truncate w-full">
              {link}
            </div>
            <div
              onClick={() => navigator.clipboard.writeText(link)}
              className="group px-3 sm:px-4 py-2 border-l border-gray-200 cursor-pointer transition-all duration-200"
            >
              <Copy
                className="text-gray-600 transition ease-in-out duration-300 group-hover:text-blue-700"
                size={18}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Links;
