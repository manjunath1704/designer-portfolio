import { useInView,motion } from "framer-motion";
import { useRef } from "react";
const AnimatingElement = ({children}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <motion.section ref={ref}  style={{
      transform: isInView ? "none" : "translateY(-200px)",
      opacity: isInView ? 1 : 0,
      transition: "all 0.9s cubic-bezier(0.17, 0.55, 0.55, 1) 0.5s"
    }}>
       {children}
    </motion.section>
  );
}
export default AnimatingElement