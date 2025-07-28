import { useEffect, useState, useRef } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import Tree from "react-d3-tree";
import imgSrc from "../assets/default.jpg";
import Error from "../componenets/elements/Error";

function MyTree() {
  const [data, setData] = useState(null);
  const [showError, setShowError] = useState(false);
  const [msg, setMsg] = useState("");
  const containerRef = useRef(null);
  const [translate, setTranslate] = useState({ x: 0, y: 0 });
  const baseurl = useSelector((state) => state.auth.baseurl);
  const user_id = useSelector((state) => state.auth.user.username);
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

  // useEffect(() => {
  //   const handler = setTimeout(() => {
  //     setDebouncedValue(inputValue.toLowerCase());
  //   }, 1000);
  //   return () => clearTimeout(handler);
  // }, [inputValue]);

  useEffect(() => {
    if (debouncedValue) {
      setTopId(debouncedValue);
    } else {
      setTopId(user_id);
    }
  }, [debouncedValue]);

  // const handleChange = (e) => {
  //   setInputValue(e.target.value.toString());
  // };

  const buildNode = (
    user,
    parentId = null,
    parentName = null,
    position = null
  ) => {
    if (!user || !user.username) return null;
    return {
      name: user.username,
      attributes: {
        id: user.id,
        email: user.email,
        package: user.package_id,
        name: user.first_name,
        image: user.image,
        parentId,
        parentName,
        position,
      },
      children: [],
    };
  };

  const buildEmptyNode = (parentId, parentName, position) => ({
    name: null,
    attributes: { parentId, parentName, position },
    children: [],
  });

  const transformMLMData = (data) => {
    const rootUser = data["0"];
    const children = data["1"] || [];
    const leftGrandChildren = data["left"] || [];
    const rightGrandChildren = data["right"] || [];

    const root = buildNode(rootUser);
    if (!root) return null;

    const rootId = root.attributes.id;
    const rootName = root.name;

    const leftChild = children.find((c) => c.position === "L");
    const rightChild = children.find((c) => c.position === "R");

    let leftNode = leftChild
      ? buildNode(leftChild, rootId, rootName, "Left")
      : buildEmptyNode(rootId, rootName, "Left");

    if (leftChild) {
      const leftId = leftChild.id;
      const leftName = leftChild.username;
      const leftLeft = leftGrandChildren.find((c) => c.position === "L");
      const leftRight = leftGrandChildren.find((c) => c.position === "R");

      leftNode.children = [
        leftLeft
          ? buildNode(leftLeft, leftId, leftName, "Left")
          : buildEmptyNode(leftId, leftName, "Left"),
        leftRight
          ? buildNode(leftRight, leftId, leftName, "Right")
          : buildEmptyNode(leftId, leftName, "Right"),
      ];
    }

    let rightNode = rightChild
      ? buildNode(rightChild, rootId, rootName, "Right")
      : buildEmptyNode(rootId, rootName, "Right");

    if (rightChild) {
      const rightId = rightChild.id;
      const rightName = rightChild.username;
      const rightLeft = rightGrandChildren.find((c) => c.position === "L");
      const rightRight = rightGrandChildren.find((c) => c.position === "R");

      rightNode.children = [
        rightLeft
          ? buildNode(rightLeft, rightId, rightName, "Left")
          : buildEmptyNode(rightId, rightName, "Left"),
        rightRight
          ? buildNode(rightRight, rightId, rightName, "Right")
          : buildEmptyNode(rightId, rightName, "Right"),
      ];
    }

    root.children = [leftNode, rightNode];
    return root;
  };

  const handelClick = async () => {
    try {
      const response = await axios.post(`${baseurl}/api/binary_tree`, {
        user_id: inputValue,
      });
      // console.log(response.data);
      if (response.data.status == 200) {
        setDebouncedValue(inputValue.toLowerCase());
      } else {
        setMsg("Invalid User");
        setShowError(true);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setTimeout(() => {
        setShowError(false);
      }, 2500);
    }
  };

  const fetchTree = async (id) => {
    try {
      const response = await axios.post(`${baseurl}/api/binary_tree`, {
        user_id: id,
      });

      const data = response.data.data;
      const children = data["1"] || [];

      const grandchildrenRequests = await Promise.all(
        children.map((child) => {
          if (!child?.username) {
            return Promise.resolve({
              id: child?.id ?? "unknown",
              position: child?.position ?? "unknown",
              data: [],
            });
          }
          return axios
            .post(`${baseurl}/api/binary_tree`, { user_id: child.username })
            .then((res) => ({
              id: child.username,
              position: child.position,
              data: res.data.data["1"] || [],
            }))
            .catch(() => ({
              id: child.username,
              position: child.position,
              data: [],
            }));
        })
      );

      const fullData = {
        0: data["0"],
        1: children,
        left: grandchildrenRequests.find((g) => g.position === "L")?.data || [],
        right:
          grandchildrenRequests.find((g) => g.position === "R")?.data || [],
      };

      const tree = transformMLMData(fullData);
      setData(tree);
    } catch (error) {
      console.log(error);
    }
  };

  const renderCardNode = ({ nodeDatum, parent }) => {
    const isEmpty = nodeDatum.name === null;

    return (
      <foreignObject width={180} height={170} x={-90} y={-70}>
        <div
          xmlns="http://www.w3.org/1999/xhtml"
          onClick={() => {
            if (isEmpty) {
              const parentName =
                nodeDatum.attributes?.parentName || parent?.data?.name;
              const position = nodeDatum.attributes?.position || "Unknown";
              const basePath = "/rpro/users/";
              window.open(
                `${basePath}signup/${parentName}/${position}/true`,
                "_blank"
              );
              localStorage.setItem("tree", true);
            } else if (nodeDatum?.name !== topId) {
              setTopId(nodeDatum.name);
            } else {
              setTopId(user_id);
            }
          }}
          className="w-[170px] h-full bg-white border border-gray-200 rounded-xl shadow-sm flex flex-col items-center justify-center cursor-pointer transition-all duration-300 hover:shadow-md hover:border-[#09182C]"
        >
          {isEmpty ? (
            <div className="text-3xl text-green-500 font-bold">+</div>
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
      <div className="fixed flex justify-center items-center w-full h-full bg-black/70 backdrop-blur-sm top-0 left-0 z-50">
        <div className="loading loading-spinner text-white loading-xl"></div>
      </div>
    );

  return (
    <div className="bg-white min-h-[80vh] overflow-x-hidden rounded-2xl p-4 lg:px-20 lg:py-10 flex-1 ml-2 md:ml-24 mr-2 md:mr-10 sm:mb-[25px] mt-[90px] text-[#09182C] shadow-lg">
      {showError && <Error show={showError} msg={msg} />}
      <div className="font-semibold mb-6 text-2xl border-b border-gray-200 pb-2">
        MyTree
      </div>
      <div className="flex flex-col gap-5">
        <div className="flex flex-col md:flex-row justify-between items-center gap-3">
          <button
            onClick={() => {
              setTopId(user_id);
              setInputValue("");
            }}
            className="text-white bg-[#09182C] w-24 py-1 cursor-pointer transition ease-in-out duration-300 rounded-lg hover:bg-[#252e3a]"
          >
            Top
          </button>
          <div className="flex flex-wrap items-center gap-3 text-[#09182C]">
            <span className="text-lg font-semibold">Search</span>
            <input
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value.toString())}
              type="text"
              className="border border-[#09182C] rounded px-3 py-1 w-36"
              placeholder="User Id"
            />
            <button
              onClick={handelClick}
              className="text-white cursor-pointer bg-[#09182C] px-4 py-1 rounded-lg hover:bg-[#252e3a] transition"
            >
              Go
            </button>
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
              collapsible={false}
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
