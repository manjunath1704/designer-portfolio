import AppRoutes from "./AppRoutes";
import { motion } from "framer-motion";

function App() {
  return (
    <motion.div
      // initial={{ opacity: 0, y: -100 }}
      // animate={{ opacity: 1, y: 0 }}
      // exit={{ opacity: 0, y: 100 }}
      // transition={{ duration: 0.7 }}
    >
      <AppRoutes />
    </motion.div>
  );
}

export default App;
