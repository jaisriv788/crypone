import { Copy } from "lucide-react";
import { useSelector } from "react-redux";

function Links() {
  const username = useSelector((state) => state.auth.user.username);
  const links = [
    `http://localhost:5173/signup/${username}/left`,
    `http://localhost:5173/signup/${username}/right`,
  ];

  return (
    <div className="flex flex-wrap gap-4 lg:gap-10 md:flex-row flex-col">
      {links.map((link, index) => (
        <div
          key={index}
          className="flex-1 min-w-[200px] max-w-full flex items-center border border-gray-300 rounded-xl bg-white shadow-sm overflow-hidden"
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
  );
}

export default Links;
