function Modal({ toggleModel, details, getDetails }) {
  return (
    <div
      onClick={() => toggleModel(false)}
      className="fixed bg-black/60 backdrop-blur-xs w-screen h-screen top-0 left-0 z-50 flex items-center justify-center"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-xl shadow-2xl p-6 w-[90%] max-w-[500px] text-[#09182C] flex flex-col gap-5"
      >
        <div className="text-2xl font-bold border-b border-gray-300 pb-2">
          Account Details
        </div>

        <div className="bg-yellow-100 border-l-4 border-yellow-500 p-3 rounded-md text-sm text-yellow-800">
          <strong>Important:</strong> These details will only be shown once.
          Please save them securely for future reference.
        </div>

        <div className="space-y-2 text-base">
          <div>
            <span className="font-semibold text-gray-700">Username: </span>
            <span className="text-gray-900">{details.username}</span>
          </div>
          <div>
            <span className="font-semibold text-gray-700">Password: </span>
            <span className="text-gray-900">{details.password}</span>
          </div>
        </div>

        <div className="flex justify-end">
          <button
            onClick={() => {
              toggleModel(false);
              getDetails(null);
            }}
            className="bg-rose-600 hover:bg-rose-700 cursor-pointer text-white font-semibold px-5 py-2 rounded-md transition duration-300"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

export default Modal;
