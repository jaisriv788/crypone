import { motion, AnimatePresence } from "motion/react";

export default function Error({ show, msg }) {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          role="alert"
          initial={{ x: 300, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: 300, opacity: 0 }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
          className="alert alert-error fixed  right-2 text-white bottom-2 bg-red-600/70 p-4 rounded-md flex items-center gap-2 shadow-lg"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 shrink-0 stroke-current"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span>Error! {msg}.</span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
