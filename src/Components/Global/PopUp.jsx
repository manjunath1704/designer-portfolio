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

  // close button
  const initialScale = 1;
  const hoverScale = 1.2;

  const hoverTransition = {
    type: "spring", // Use spring animation for a bouncy effect
    stiffness: 200, // Adjust stiffness for the spring animation
    damping: 20, // Adjust damping for the spring animation
  };
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
            className="sid-popUp__container p-8 position-relative"
            variants={popupVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            onClick={(e) => e.stopPropagation()} // Prevent clicks inside the modal from closing it
          >
            <motion.button
              onClick={onClose}
              whileHover={{ scale: hoverScale }} // Scale to 120% on hover
              whileTap={{ scale: initialScale }} // Reset to the initial size on click (optional)
              initial={{ scale: initialScale }} // Initial size
              transition={hoverTransition}
              className="sid-popUp__button p-2 d-flex align-items-center justify-content-center position-absolute end-0"
            >
              <img
                src="./assets/icons/icon-close.svg"
                alt=""
                className="img-fluid"
              />
            </motion.button>
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
export default PopUp;
