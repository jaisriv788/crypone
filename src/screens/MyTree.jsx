import { useEffect, useState, useRef } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import Tree from "react-d3-tree";
import imgSrc from "../assets/default.jpg";

function MyTree() {
  const [data, setData] = useState(null);
  const containerRef = useRef(null);
  const [translate, setTranslate] = useState({ x: 0, y: 0 });
  const baseurl = useSelector((state) => state.auth.baseurl);
  const user_id = useSelector((state) => state.auth.user.id);
  const [topId, setTopId] = useState(user_id);
  const [inputValue, setInputValue] = useState("");
  const [debouncedValue, setDebouncedValue] = useState("");

  useEffect(() => {
    fetchTree(topId);
  }, [topId]);

  useEffect(() => {
    if (containerRef.current) {
      const { width, height } = containerRef.current.getBoundingClientRect();
      setTranslate({ x: width / 2, y: height / 5 });
    }
  }, [data]);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(inputValue);
    }, 500);

    return () => clearTimeout(handler);
  }, [inputValue]);

  useEffect(() => {
    console.log("Debounced value:", debouncedValue);
    setTopId(debouncedValue);
  }, [debouncedValue]);

  function handleChange(e) {
    setInputValue(e.target.value);
  }

  const transformMLMData = (data) => {
    const rootUser = data["0"];
    const children = data["1"] || [];
    const leftChildren = data["left"]?.filter(Boolean) || [];
    const rightChildren = data["right"]?.filter(Boolean) || [];

    const buildNode = (user) => {
      if (!user) return { name: null, attributes: {}, children: [] };

      return {
        name: user.username || "Unnamed",
        attributes: {
          id: user.id,
          email: user.email,
          package: user.package_id,
          name: user.first_name,
          image: user.image,
        },
        children: [],
      };
    };

    const root = buildNode(rootUser);

    const left = children.find((c) => c.position === "L");
    const right = children.find((c) => c.position === "R");

    const leftNode = buildNode(left);
    const rightNode = buildNode(right);

    if (left) leftNode.children = leftChildren.map(buildNode);
    if (right) rightNode.children = rightChildren.map(buildNode);

    root.children.push(leftNode, rightNode); // always two slots

    return root;
  };

  const fetchTree = async (id) => {
    try {
      const response = await axios.post(`${baseurl}/api/binary_tree`, {
        user_id: id,
      });
      const res = transformMLMData(response.data.data);
      setData(res);
    } catch (error) {
      console.log(error);
    }
  };

  const renderCardNode = ({ nodeDatum }) => {
    const isUnnamed = nodeDatum.name === "Unnamed";
    const isEmpty = nodeDatum.name === null;

    return (
      <foreignObject width={180} height={170} x={-90} y={-70}>
        <div
          xmlns="http://www.w3.org/1999/xhtml"
          onClick={() => {
            if (nodeDatum.attributes.id == topId) {
              setTopId(user_id);
            }
            if (!isUnnamed && !isEmpty && nodeDatum.attributes?.id !== topId) {
              setTopId(nodeDatum.attributes.id);
            }
          }}
          className="w-[170px] h-full bg-white border border-gray-200 rounded-xl shadow-sm flex flex-col items-center justify-center cursor-pointer transition-all duration-300 hover:shadow-md hover:border-[#09182C]"
        >
          {isEmpty ? (
            <div className="text-3xl text-green-500 font-bold">+</div>
          ) : isUnnamed ? (
            <div className="text-3xl text-red-500 font-bold">×</div>
          ) : (
            <>
              <img
                src={imgSrc}
                alt="User"
                className="w-12 h-12 rounded-full border-2 border-[#09182C] mb-2 shadow-sm"
              />
              <h4 className="font-semibold text-sm text-[#09182C] truncate">
                {nodeDatum.name}
              </h4>
              <ul className="text-[11px] mt-1 text-gray-600 text-center space-y-[1px]">
                <li>
                  <span className="font-medium text-[#09182C]">ID:</span>{" "}
                  {nodeDatum.attributes.id}
                </li>
                <li>
                  <span className="font-medium text-[#09182C]">Email:</span>{" "}
                  <span className="break-words">
                    {nodeDatum.attributes.email}
                  </span>
                </li>
                <li>
                  <span className="font-medium text-[#09182C]">Package:</span>{" "}
                  {nodeDatum.attributes.package === 0
                    ? "No"
                    : nodeDatum.attributes.package}
                </li>
                <li>
                  <span className="font-medium text-[#09182C]">Name:</span>{" "}
                  {nodeDatum.attributes.name}
                </li>
              </ul>
            </>
          )}
        </div>
      </foreignObject>
    );
  };

  if (!data)
    return (
      <div className="fixed flex justify-center items-center w-full h-full bg-black/70 back top-0 left-0 z-50">
        <div className="loading loading-spinner text-white loading-xl"></div>
      </div>
    );

  return (
    <div className="bg-white min-h-[80vh] overflow-x-hidden rounded-2xl p-4 lg:px-20 lg:py-10 flex-1 ml-2 md:ml-24 mr-2 md:mr-10 sm:mb-[25px] mt-[90px] text-[#09182C] shadow-lg">
      <div className="font-semibold mb-6 text-2xl border-b border-gray-200 pb-2">
        MyTree
      </div>
      <div className="flex flex-col gap-5">
        <div className="flex flex-col md:flex-row justify-between items-center gap-3">
          <button
            onClick={() => setTopId(user_id)}
            className="text-white bg-[#09182C] w-24 py-1 cursor-pointer transition ease-in-out duration-300 rounded-lg hover:bg-[#252e3a]"
          >
            Top
          </button>

          <div className="flex flex-wrap items-center gap-3 text-[#09182C]">
            <span className="text-lg font-semibold">Search</span>
            <input
              onChange={handleChange}
              type="number"
              className="border border-[#09182C] rounded px-3 py-1 w-36"
              placeholder="User Id"
            />
          </div>
        </div>

        <div
          className="bg-gray-100 flex justify-center items-center"
          style={{ width: "100%", height: "50vh" }}
        >
          <div
            ref={containerRef}
            className="flex justify-center items-center w-full h-full"
          >
            <Tree
              data={data}
              orientation="vertical"
              translate={translate}
              zoomable
              zoom={0.7}
              collapsible
              pathFunc="elbow"
              separation={{ siblings: 1.5, nonSiblings: 1.5 }}
              nodeSize={{ x: 250, y: 170 }}
              renderCustomNodeElement={renderCardNode}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default MyTree;
