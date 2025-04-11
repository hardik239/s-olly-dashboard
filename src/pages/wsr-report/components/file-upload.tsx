import { FC } from "react";
import { Button } from "../../../components/ui/button";
import { Paperclip, UploadCloud } from "lucide-react";
import {
  FileInput,
  FileUploader,
  FileUploaderItem,
} from "../../../components/file-uploader";
import { bytesToMegaBytes } from "../../../utils/utility/sharedUtils";
import { dropZoneConfig } from "../../../utils/consts";

type Props = {
  file: File | undefined;
  handleFileUpload: (file: File | undefined) => void;
};

/**
 * Not used right now. Migrated to use already uploaded sheet.
 */
const FileUpload: FC<Props> = ({ file, handleFileUpload }) => {
  return (
    <>
      <FileUploader
        value={file ? [file] : []}
        onValueChange={(files) => handleFileUpload(files?.[0])}
        reSelect={true}
        dropzoneOptions={dropZoneConfig}
      >
        <FileInput>
          <Button
            tabIndex={-1}
            variant="outline"
            className="w-full flex gap-2 border text-xs lg:text-sm"
            disabled={!!file}
          >
            <UploadCloud className="w-5 h-5" />
            Upload a sheet
          </Button>
          <span className="sr-only">Upload a sheet</span>
        </FileInput>
        {file && (
          <FileUploaderItem className="border pt-8 pb-8" index={0}>
            <div className="flex gap-4 justify-center items-center">
              <Paperclip className="-rotate-45" />
              <div className="flex flex-col gap-1 text-gray-500">
                <span className="text-base font-semibold text-gray-700">
                  {file.name.substring(0, file.name.lastIndexOf("."))}
                </span>
                <div className="flex gap-2">
                  <span>.{file.name.split(".").pop()}</span>
                  <span>|</span>
                  <span>{bytesToMegaBytes(file.size, 2)} MB</span>
                </div>
              </div>
            </div>
          </FileUploaderItem>
        )}
      </FileUploader>
    </>
  );
};

export default FileUpload;
