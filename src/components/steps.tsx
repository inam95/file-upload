import { motion } from "motion/react";
import { HourglassIcon, CircleCheckBigIcon } from "lucide-react";
import { Button } from "./ui/button";

type StepProps = {
  documentsUploaded: boolean;
  processed: boolean;
  generated: boolean;
  onCancel: () => void;
};

export function Steps({
  documentsUploaded,
  processed,
  generated,
  onCancel,
}: StepProps) {
  return (
    <motion.div
      key="running"
      className="flex flex-col gap-2 w-full"
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.35, ease: "easeInOut" }}
      layout
    >
      <p className="text-base font-bold mb-2">Running Analysis</p>
      <div className="flex justify-between">
        <div className="flex flex-col gap-4 items-start justify-start md:flex-row">
          <motion.div
            className="flex flex-col gap-2"
            initial={{ opacity: 0, y: 10, visibility: "hidden" }}
            animate={{ opacity: 1, y: 0, visibility: "visible" }}
            transition={{ duration: 0.5 }}
          >
            {!documentsUploaded ? (
              <div className="flex items-center gap-2">
                <HourglassIcon className="w-4 h-4 animate-spin text-primary" />
                <p>Uploading documents...</p>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <CircleCheckBigIcon className="w-4 h-4 text-primary" />
                <p>Documents Uploaded</p>
              </div>
            )}
          </motion.div>
          <motion.div
            className="flex flex-col gap-2"
            initial={{ opacity: 0, y: 10, visibility: "hidden" }}
            animate={{
              opacity: documentsUploaded ? 1 : 0,
              y: documentsUploaded ? 0 : 10,
              visibility: documentsUploaded ? "visible" : "hidden",
            }}
            transition={{ duration: 0.5 }}
          >
            {!processed ? (
              <div className="flex items-center gap-2">
                <HourglassIcon className="w-4 h-4 animate-spin text-primary" />
                <p>Processing documents...</p>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <CircleCheckBigIcon className="w-4 h-4 text-primary" />
                <p>Documents Processed</p>
              </div>
            )}
          </motion.div>
          <motion.div
            className="flex flex-col gap-2"
            initial={{ opacity: 0, y: 10, visibility: "hidden" }}
            animate={{
              opacity: processed ? 1 : 0,
              y: processed ? 0 : 10,
              visibility: processed ? "visible" : "hidden",
            }}
            transition={{ duration: 0.5 }}
          >
            {!generated ? (
              <div className="flex items-center gap-2 flex-1">
                <HourglassIcon className="w-4 h-4 animate-spin text-primary" />
                <p>Generating report...</p>
              </div>
            ) : (
              <div className="flex items-center gap-2 flex-1">
                <CircleCheckBigIcon className="w-4 h-4 text-primary" />
                <p>Report Generated</p>
              </div>
            )}
          </motion.div>
        </div>
        <div className="self-end">
          <Button variant="outline" disabled={processed} onClick={onCancel}>
            Cancel
          </Button>
        </div>
      </div>
    </motion.div>
  );
}
