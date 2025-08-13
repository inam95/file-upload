import { Upload, X } from "lucide-react";
import { motion } from "motion/react";
import { useRef } from "react";
import { useDropzone } from "react-dropzone";
import { FieldInfo } from "./field-info";
import type { AnyFieldApi } from "@tanstack/react-form";

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
  value = [],
  onChange,
  onBlur,
  maxFiles = 5,
  field,
}: {
  value?: File[];
  onChange?: (files: File[]) => void;
  onBlur?: () => void;
  maxFiles?: number;
  field: AnyFieldApi;
}) => {
  const files = value ?? [];
  const fileInputRef = useRef<HTMLInputElement>(null);

  const remainingSlots = Math.max(0, maxFiles - files.length);

  const mergeNewFiles = (newFiles: File[]) => {
    if (!onChange) return;
    const accepted =
      remainingSlots > 0 ? newFiles.slice(0, remainingSlots) : [];
    if (accepted.length === 0) return;
    onChange([...(files || []), ...accepted]);
  };

  const handleClick = () => {
    if (remainingSlots === 0) return;
    fileInputRef.current?.click();
  };

  const { getRootProps, isDragActive } = useDropzone({
    multiple: true,
    noClick: true,
    maxFiles: remainingSlots > 0 ? remainingSlots : undefined,
    onDrop: (droppedFiles) => {
      if (remainingSlots === 0) return;
      mergeNewFiles(droppedFiles);
    },
    onDropRejected: (error) => {
      console.log(error);
    },
  });

  const handleFileRemove = (idx: number) => {
    if (!onChange) return;
    onChange(files.filter((_, i) => i !== idx));
  };

  return (
    <div
      className="w-full border border-dashed border-secondary rounded-md"
      {...getRootProps()}
    >
      <motion.div
        onClick={handleClick}
        onBlur={onBlur}
        whileHover={remainingSlots > 0 ? "animate" : undefined}
        className={`py-10 px-4 group/file block rounded-lg w-full relative overflow-hidden ${
          remainingSlots > 0
            ? "cursor-pointer"
            : "cursor-not-allowed opacity-60"
        }`}
      >
        <input
          ref={fileInputRef}
          id="file-upload-handle"
          type="file"
          multiple
          onBlur={onBlur}
          onChange={(e) => mergeNewFiles(Array.from(e.target.files || []))}
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
                        className="text-sm text-foreground truncate max-w-xs"
                      >
                        {file.name}
                      </motion.p>
                      <X
                        className="h-4 w-4 text-foreground cursor-pointer hover:text-destructive"
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
          <div className="mt-3 w-full text-xs flex items-center justify-between text-muted-foreground">
            <span>
              {files.length}/{maxFiles} selected
            </span>
            {remainingSlots === 0 && (
              <span className="text-muted-foreground">Max files reached</span>
            )}
          </div>
          <div className="w-full text-left">
            <FieldInfo field={field} />
          </div>
        </div>
      </motion.div>
    </div>
  );
};
