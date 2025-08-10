import { Upload, X } from "lucide-react";
import { motion } from "motion/react";
import { useRef, useState } from "react";
import { useDropzone } from "react-dropzone";

const mainVariant = {
  initial: {
    x: 0,
    y: 0,
  },
  animate: {
    x: 8,
    y: -8,
    opacity: 0.9,
  },
};

const secondaryVariant = {
  initial: {
    opacity: 0,
  },
  animate: {
    opacity: 1,
  },
};

export const FileUpload = ({
  onChange,
}: {
  onChange?: (files: File[]) => void;
}) => {
  const [files, setFiles] = useState<File[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (newFiles: File[]) => {
    setFiles((prevFiles) => [...prevFiles, ...newFiles]);
    if (onChange) {
      onChange(newFiles);
    }
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const { getRootProps, isDragActive } = useDropzone({
    multiple: true,
    noClick: true,
    onDrop: handleFileChange,
    onDropRejected: (error) => {
      console.log(error);
    },
  });

  const handleFileRemove = (idx: number) => {
    setFiles((prevFiles) => prevFiles.filter((_, i) => i !== idx));
  };

  return (
    <div
      className="w-full border border-dashed border-secondary rounded-md"
      {...getRootProps()}
    >
      <motion.div
        onClick={handleClick}
        whileHover="animate"
        className="py-10 px-4 group/file block rounded-lg cursor-pointer w-full relative overflow-hidden"
      >
        <input
          ref={fileInputRef}
          id="file-upload-handle"
          type="file"
          onChange={(e) => handleFileChange(Array.from(e.target.files || []))}
          className="hidden"
        />
        <div className="flex flex-col items-center justify-center">
          <p className="relative font-normal text-muted-foreground mt-2 text-sm">
            Drag or drop your files here or click to upload
          </p>
          <div className="relative mt-10 w-full">
            <div className="flex items-start justify-start gap-2 flex-wrap">
              {files.length > 0 &&
                files.map((file, idx) => (
                  <motion.div
                    key={"file" + idx}
                    layoutId={idx === 0 ? "file-upload" : "file-upload-" + idx}
                    className="relative overflow-hidden z-40 bg-white dark:bg-neutral-900 flex items-start justify-start w-fit p-2 rounded-md shadow-sm"
                  >
                    <div className="flex justify-between items-center gap-4 w-full">
                      <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        layout
                        className="text-xs text-primary truncate max-w-xs"
                      >
                        {file.name}
                      </motion.p>
                      <X
                        className="h-4 w-4 text-primary cursor-pointer hover:text-destructive"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleFileRemove(idx);
                        }}
                      />
                    </div>
                  </motion.div>
                ))}
            </div>
            {!files.length && (
              <motion.div
                layoutId="file-upload"
                variants={mainVariant}
                transition={{
                  type: "spring",
                  stiffness: 300,
                  damping: 20,
                }}
                className="relative group-hover/file:shadow-2xl z-40 bg-white dark:bg-neutral-900 flex items-center justify-center h-16 w-16 mx-auto rounded-md"
              >
                {isDragActive ? (
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-muted-foreground text-sm flex flex-col items-center"
                  >
                    Drop it
                    <Upload className="h-4 w-4 text-muted-foreground mt-2" />
                  </motion.p>
                ) : (
                  <Upload className="h-4 w-4 text-muted-foreground" />
                )}
              </motion.div>
            )}

            {!files.length && (
              <motion.div
                variants={secondaryVariant}
                className="absolute opacity-0 border border-dashed border-secondary inset-0 z-30 bg-transparent flex items-center justify-center h-16 w-16 mx-auto rounded-md"
              ></motion.div>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
};
