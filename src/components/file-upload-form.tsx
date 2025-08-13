import { Play } from "lucide-react";
import { Button } from "./ui/button";
import { FileUpload } from "./file-upload";
import { useForm } from "@tanstack/react-form";
import { z } from "zod";
import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Steps } from "./steps";
import { Reports } from "./reports";

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
      await sleep(5000);

      setStep((p) => ({ ...p, generated: true, completed: true }));
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
            selector={(state) => [
              state.canSubmit,
              state.isSubmitting,
              state.values.files.length,
            ]}
            children={([canSubmit, isSubmitting, filesLength]) => {
              return (
                <Button
                  type="submit"
                  disabled={!canSubmit || filesLength === 0}
                >
                  <Play className="w-4 h-4 mr-1" />
                  {isSubmitting ? "Running..." : "Run"}
                </Button>
              );
            }}
          />
        </div>
        {/* files upload section */}
        <div className="flex flex-col gap-2">
          <p className="text-base font-bold mb-2">
            Upload Files{" "}
            <span className="text-xs text-muted-foreground">
              (at least 1 file is required)
            </span>
          </p>
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
      <motion.div layout className="w-full">
        <AnimatePresence mode="wait">
          {step.started && !step.completed && (
            <Steps
              documentsUploaded={step.documentsUploaded}
              processed={step.processed}
              generated={step.generated}
              onCancel={() =>
                setStep((p) => ({
                  ...p,
                  started: false,
                  documentsUploaded: false,
                  processed: false,
                  generated: false,
                  completed: false,
                }))
              }
            />
          )}
          {step.completed && <Reports />}
        </AnimatePresence>
      </motion.div>
    </>
  );
};
