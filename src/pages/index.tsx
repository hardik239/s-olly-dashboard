import React, { useCallback, useState } from "react";
import {
  FileUploader,
  FileUploaderContent,
  FileUploaderItem,
  FileInput,
} from "../components/file-uploader";
import { Loader, Paperclip } from "lucide-react";
import { useNavigate } from "react-router-dom";
import * as XLSX from "xlsx";
import {
  Card,
  CardHeader,
  CardContent,
  CardTitle,
  CardFooter,
} from "../components/ui/card";
import { Button } from "../components/ui/button";
import { bytesToMegaBytes } from "../utils/utility/sharedUtils";
import { dropZoneConfig } from "../utils/consts";
import FileSvgDraw from "../utils/icons/DropFile";
import { storeDataInIndexedDB } from "../client/IndexDB";
import Rules from "../components/rules";

type SheetResponseType = {
  headers: string[];
  data: string[];
};

const ExcelUploader = () => {
  const [files, setFiles] = useState<File[] | null>([]);
  const [_, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const file = files?.[0];

  const handleDBTransaction = useCallback(
    async (data: any) => {
      try {
        const isNoData = Object.keys(data).every(
          (record) => data[record].data.length === 0
        );
        if (isNoData) {
          navigate("/no-data");
        } else {
          await storeDataInIndexedDB(data);
          navigate("/dashboard");
        }
      } catch (error) {
        setError("Failed to store data in IndexedDB.");
      }
    },
    [navigate]
  );

  const handleProcessFile = useCallback(async () => {
    const reader = new FileReader();
    reader.onload = async (event) => {
      const binaryStr = event?.target?.result;
      const workbook = XLSX.read(binaryStr, { type: "binary" });
      const data = {} as Record<string, SheetResponseType>;

      workbook.SheetNames.forEach((sheetName) => {
        const sheetData = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName], {
          header: 1,
          blankrows: false,
        });
        const headers = sheetData[0] as any[];

        const rows = sheetData.slice(1).map((row: any) => {
          let rowData = {} as any;
          headers.forEach((header, index) => {
            rowData[header] = row[index];
          });
          return rowData;
        });

        data[sheetName] = {
          headers: headers,
          data: rows,
        };
      });

      handleDBTransaction(data);
    };
    reader.readAsBinaryString(file as File);
  }, [file, handleDBTransaction]);

  return (
    <div className="">
      <div className="overflow-hidden h-[100vh] grid place-content-center bg-[ghostwhite]">
        <Card className="shadow-lg w-[600px]">
          <CardHeader>
            <CardTitle className="text-2xl text-gray-900">
              Upload Internal Sheet
            </CardTitle>
          </CardHeader>
          <CardContent>
            <FileUploader
              value={files}
              onValueChange={(uploadedFiles) =>
                setFiles(uploadedFiles?.[0] ? [uploadedFiles[0]] : [])
              }
              dropzoneOptions={dropZoneConfig}
              className="relative"
            >
              <FileInput className="border-dashed border-2 border-gray-300 rounded-lg h-[250px] hover:border-black">
                <div className="flex items-center justify-center flex-col pb-4 w-full h-full">
                  <FileSvgDraw />
                </div>
              </FileInput>
              <FileUploaderContent className="mt-2">
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
              </FileUploaderContent>
            </FileUploader>
          </CardContent>
          <CardFooter>
            <ProcessedButton
              isDisabled={files?.length === 0}
              onClick={handleProcessFile}
            />
          </CardFooter>
        </Card>
      </div>
      <Rules />
    </div>
  );
};

export default ExcelUploader;

type ProcessedButtonProps = {
  isDisabled?: boolean;
  onClick: () => Promise<void>;
};

const ProcessedButton: React.FC<ProcessedButtonProps> = React.memo(
  ({ isDisabled, onClick }) => {
    const [isProcessing, setIsProcessing] = useState(false);

    return (
      <Button
        className="w-full font-medium text-lg bg-gray-800 text-white disabled:cursor-not-allowed disabled:pointer-events-auto hover:text-white hover:bg-gray-900"
        variant="outline"
        disabled={isDisabled || isProcessing}
        onClick={async () => {
          setIsProcessing(true);
          await onClick();
          setTimeout(() => {
            setIsProcessing(false);
          }, 1000);
        }}
      >
        {isProcessing && (
          <Loader className="mr-2 animate-spin transition-all duration-1000" />
        )}
        Process sheet
      </Button>
    );
  }
);
