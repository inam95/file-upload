import { DownloadIcon, Play } from "lucide-react";
import { Button } from "./ui/button";
import { FileUpload } from "./file-upload";
import { useForm } from "@tanstack/react-form";
import { z } from "zod";
import { useState } from "react";
import { motion } from "motion/react";
import { HourglassIcon, CircleCheckBigIcon } from "lucide-react";

const filesSchema = z.object({
  files: z
    .array(z.instanceof(File))
    .min(1, "At least 1 file is required")
    .max(5, "Maximum 5 files are allowed"),
});

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

export const FileUploadForm = () => {
  const [step, setStep] = useState({
    started: false,
    documentsUploaded: false,
    processed: false,
    generated: false,
    completed: false,
  });
  const form = useForm({
    defaultValues: {
      files: [] as File[],
    },
    onSubmit: async ({ value }) => {
      console.log("Submitting files", value.files);

      // Keep the Promise pending while steps run
      setStep((p) => ({ ...p, started: true }));
      await sleep(1000);

      setStep((p) => ({ ...p, documentsUploaded: true }));
      await sleep(2000);

      setStep((p) => ({ ...p, processed: true }));
      await sleep(2000);

      setStep((p) => ({ ...p, generated: true }));
      await sleep(2000);

      setStep((p) => ({ ...p, completed: true }));
    },
    validators: {
      onChange: filesSchema,
    },
  });

  return (
    <>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          form.handleSubmit();
        }}
        className="flex flex-col gap-8"
      >
        <div className="flex justify-between">
          <div className="flex flex-col gap-2">
            <h1 className="text-2xl font-bold">Due Diligence Check</h1>
            <p className="text-sm text-muted-foreground max-w-4xl hidden sm:block">
              This job performs a high level analysis of from the uploaded
              company data packs(e.g. financial statements, management
              presentations, market research) to generate comprehensive IC
              (Investment Committee) documentation for investment decisions.
            </p>
          </div>

          <form.Subscribe
            selector={(state) => [state.canSubmit, state.isSubmitting]}
            children={([canSubmit, isSubmitting]) => (
              <Button type="submit" disabled={!canSubmit}>
                <Play className="w-4 h-4 mr-1" />
                {isSubmitting ? "Running..." : "Run"}
              </Button>
            )}
          />
        </div>
        {/* files upload section */}
        <div className="flex flex-col gap-2">
          <p className="text-base font-bold">Upload Files</p>
          {/* file upload component */}
          <form.Field name="files">
            {(field) => (
              <FileUpload
                value={(field.state.value as File[]) ?? []}
                onChange={(val) => field.handleChange(val)}
                onBlur={field.handleBlur}
                maxFiles={5}
                field={field}
              />
            )}
          </form.Field>
        </div>
      </form>
      {step.started && (
        <div className="flex">
          <motion.div
            className="flex flex-col gap-2 border border-secondary rounded-md rounded-br-none rounded-tr-none p-4 w-1/2"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <p className="text-base font-bold">Running Analysis</p>
            <div className="flex gap-2 justify-between">
              <div className="flex flex-col gap-2">
                <motion.div
                  className="flex flex-col gap-2"
                  initial={{ opacity: 0, y: 10, visibility: "hidden" }}
                  animate={{
                    opacity: step.documentsUploaded ? 1 : 0,
                    y: step.documentsUploaded ? 0 : 10,
                    visibility: step.documentsUploaded ? "visible" : "hidden",
                  }}
                  transition={{ duration: 0.5 }}
                >
                  {!step.documentsUploaded ? (
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
                    opacity: step.documentsUploaded ? 1 : 0,
                    y: step.documentsUploaded ? 0 : 10,
                    visibility: step.documentsUploaded ? "visible" : "hidden",
                  }}
                  transition={{ duration: 0.5 }}
                >
                  {!step.processed ? (
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
                    opacity: step.processed ? 1 : 0,
                    y: step.processed ? 0 : 10,
                    visibility: step.processed ? "visible" : "hidden",
                  }}
                  transition={{ duration: 0.5 }}
                >
                  {!step.generated ? (
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
                <Button
                  variant="outline"
                  disabled={step.processed}
                  onClick={() => {
                    setStep((p) => ({
                      ...p,
                      started: false,
                      documentsUploaded: false,
                      processed: false,
                      generated: false,
                    }));
                  }}
                >
                  Cancel
                </Button>
              </div>
            </div>
          </motion.div>
          <div className="flex flex-col gap-2 border border-secondary border-l-0 rounded-md rounded-bl-none rounded-tl-none p-4 w-1/2">
            <p className="text-base font-bold">Generated Reports</p>
            <div className="flex items-center gap-2 justify-between">
              <p>Report 1</p>
              <Button variant="ghost" size="sm">
                <DownloadIcon className="w-2 h-2" />
              </Button>
            </div>
            <div className="flex items-center gap-2 justify-between">
              <p>Report 2</p>
              <Button variant="ghost" size="sm">
                <DownloadIcon className="w-2 h-2" />
              </Button>
            </div>
            <div className="flex items-center gap-2 justify-between">
              <p>Report 2</p>
              <Button variant="ghost" size="sm">
                <DownloadIcon className="w-2 h-2" />
              </Button>
            </div>
            <div className="flex items-center gap-2 justify-between">
              <p>Report 2</p>
              <Button variant="ghost" size="sm">
                <DownloadIcon className="w-2 h-2" />
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
