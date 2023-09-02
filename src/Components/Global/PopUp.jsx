import { motion, AnimatePresence } from "framer-motion";
import { useEffect } from "react";
const PopUp = ({ isOpen, onClose, children }) => {
  const popupVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1 },
  };

  useEffect(() => {
    // Add the class to the body when the pop-up is open
    if (isOpen) {
      document.body.classList.add("body-no-scroll");
    } else {
      // Remove the class when the pop-up is closed
      document.body.classList.remove("body-no-scroll");
    }

    // Cleanup effect when the component unmounts
    return () => {
      document.body.classList.remove("body-no-scroll");
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="position-fixed w-100 h-100 top-0 bottom-0 start-0 end-0 d-flex align-items-center justify-content-center sid-popUp__overlay" // Apply the overlay class
          onClick={onClose}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="sid-popUp__container p-8"
            variants={popupVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            onClick={(e) => e.stopPropagation()} // Prevent clicks inside the modal from closing it
          >
            <div className="text-end">
            <button onClick={onClose}>Close</button>
            </div>
           {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
export default PopUp;
