import { motion } from "framer-motion";

const FramerClient = ({ children }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      id="no-bg"
    >
      {children}
    </motion.div>
  );
};
export default FramerClient;
