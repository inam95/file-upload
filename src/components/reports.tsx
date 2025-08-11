import { motion } from "motion/react";
import { Button } from "./ui/button";
import { DownloadIcon } from "lucide-react";

export function Reports() {
  return (
    <motion.div
      key="generated"
      className="w-full flex flex-col gap-2"
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.35, ease: "easeInOut" }}
      layout
    >
      <p className="text-base font-bold mb-2">Generated Reports</p>
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2 justify-between">
          <p>Violations Report.pdf</p>
          <Button variant="ghost" size="sm">
            <DownloadIcon className="w-2 h-2" />
          </Button>
        </div>
        <div className="flex items-center gap-2 justify-between">
          <p>Investment Committee Report.pdf</p>
          <Button variant="ghost" size="sm">
            <DownloadIcon className="w-2 h-2" />
          </Button>
        </div>
      </div>
    </motion.div>
  );
}
