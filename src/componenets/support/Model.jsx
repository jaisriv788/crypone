import { useSelector } from "react-redux";
// import axios from "axios";
import { useState } from "react";

function Modal({ closeModel }) {
  const userid = useSelector((state) => state.auth.user.id);

  const [ticket, setTicket] = useState({
    userid,
    subject: "",
    message: "",
  });

  function handleFileChange(event) {
    const files = event.target.files;
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      console.log("File name:", file.name);
      console.log("File type:", file.type);
      console.log("File size:", file.size, "bytes");
    }
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setTicket((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  function handleTicket() {
    console.log(ticket);
  }

  return (
    <div
      onClick={closeModel}
      className="fixed bg-black/60 backdrop-blur-xs w-screen h-screen top-0 left-0 z-50 flex items-center justify-center"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white gap-3 py-3 px-5 w-[500px] sm:w-[600px] text-[#09182C] flex flex-col rounded-xl"
      >
        <div className="text-xl pb-1 border-b-1 border-gray-400 font-semibold">
          Add New Ticket
        </div>
        <div className="flex flex-col gap-3">
          <div>
            <label htmlFor="subject" className="text-lg font-semibold">
              Subject Name<span className="text-red-500">*</span>
            </label>
            <input
              id="subject"
              name="subject"
              type="text"
              placeholder="Subject"
              value={ticket.subject}
              onChange={handleChange}
              className="focus:outline-none border-1 border-[#09182C] rounded w-full px-3 py-1"
            />
          </div>
          <div>
            <label htmlFor="message" className="text-lg font-semibold">
              Message<span className="text-red-500">*</span>
            </label>
            <textarea
              id="message"
              name="message"
              type="text"
              value={ticket.message}
              onChange={handleChange}
              placeholder="Message "
              className="focus:outline-none border-1 border-[#09182C] rounded w-full px-3 py-1"
            />
            <p className="text-sm">Message should be max 200 characters</p>
          </div>
          <div className="flex">
            <input
              type="file"
              multiple
              onChange={handleFileChange}
              className="file-input file-input-neutral w-full"
            />
          </div>

          <div className="flex gap-10 justify-between mt-3 text-white">
            <button
              onClick={handleTicket}
              className="bg-emerald-500 hover:bg-emerald-700 cursor-pointer transition ease-in-out duration-300 rounded-lg py-1 flex-1"
            >
              Raise Ticket
            </button>
            <button
              onClick={closeModel}
              className="bg-rose-500 rounded-lg py-1  cursor-pointer transition ease-in-out duration-300 flex-1 hover:bg-rose-700"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Modal;
