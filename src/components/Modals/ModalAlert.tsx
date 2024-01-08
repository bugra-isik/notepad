import { motion } from "framer-motion";

export default function ModalAlert() {
  return (
    <motion.div className="toast" exit={{ opacity: 0 }}>
      <div className="alert alert-error">
        <p>Use a different file name.</p>
      </div>
    </motion.div>
  );
}
