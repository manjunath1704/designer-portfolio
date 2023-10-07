// import { useState, useEffect } from "react";
// import { AnimatePresence, motion } from "framer-motion";

// const texts = ["Hello", "Hola", "Bonjour","Guten Tag","Namaste"];
// const variants = {
//   enter: direction => {
//     return {
//       y: -20,
//       opacity: 0
//     };
//   },
//   center: {
//     zIndex: 1,
//     y: 0,
//     opacity: 1
//   },
//   exit: direction => {
//     return {
//       zIndex: 0,
//       opacity: 0
//     };
//   }
// };

// const LoopingHello = () => {
//   const [index, setIndex] = useState(0);

//   useEffect(() => {
//     setTimeout(() => {
//       let next = index + 1;
//       if (next === texts.length) {
//         next = 0;
//       }
//       setIndex(next);
//     }, 3 * 1000);
//   }, [index, setIndex]);
//   return(
//     <div className="d-flex justify-content-center">
//        <div className=" text-end position-relative"><AnimatePresence>
//         <motion.div
//           variants={variants}
//           key={index}
//           initial="enter"
//           animate="center"
//           exit="exit"
//           transition={{
//             y: { type: "spring", stiffness: 500, damping: 200 },
//             opacity: { duration: 0.5 }
//           }}
//           className="position-absolute end-0 text-nowrap"
//         >
//           {texts[index]}
//         </motion.div>
//       </AnimatePresence></div>
//       <div className=" text-start">
//       <div className="ms-3">there, I am</div>
//       </div>
//     </div>
//   )
// }

// export default LoopingHello;
import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";

const texts = ["Hello", "Hola", "Bonjour", "Guten Tag", "Namaste"];
const variants = {
  enter: {
    y: -20,
    opacity: 0,
  },
  center: {
    zIndex: 1,
    y: 0,
    opacity: 1,
  },
  exit: {
    zIndex: 0,
    opacity: 0,
  },
};

const LoopingHello = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      let next = index + 1;
      if (next === texts.length) {
        next = 0;
      }
      setIndex(next);
    }, 3 * 1000);

    // Clear the interval when the component unmounts
    return () => clearInterval(intervalId);
  }, [index]);

  return (
    <div className="d-flex justify-content-center">
      <div className="text-end position-relative" style={{width:"97px"}}>
        <AnimatePresence mode='wait'>
          <motion.div
            variants={variants}
            key={index}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ 
              y: {  stiffness: 300, damping: 200 },
              opacity: { duration: 0.5 },
            }}
            className="position-absolute end-0 text-nowrap sid-gradient__text sid-font__body text-2xl text-lg-4xl font-semibold"
          >
            {texts[index]}
          </motion.div>
        </AnimatePresence>
      </div>
      <div className="text-start">
        <div className="ms-3">there, I am</div>
      </div>
    </div>
  );
};

export default LoopingHello;
