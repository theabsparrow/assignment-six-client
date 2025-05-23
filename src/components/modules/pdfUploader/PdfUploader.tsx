import { X } from "lucide-react";

type TPdfUploader = {
  setPdfFile: React.Dispatch<React.SetStateAction<File | "">>;
  setPdfName: React.Dispatch<React.SetStateAction<string | "">>;
  pdfName: string;
  label: string;
  id: string;
};

const PdfUploader = ({
  setPdfFile,
  setPdfName,
  pdfName,
  label,
  id,
}: TPdfUploader) => {
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] as File;
    setPdfFile(file);
    setPdfName(file?.name);
    e.target.value = "";
  };

  const handleRemove = () => {
    setPdfFile("");
    setPdfName("");
  };

  return (
    <div>
      <input
        type="file"
        id={id}
        accept="application/pdf"
        onChange={(e) => handleImageChange(e)}
        className="hidden"
      />
      <h1>{label}</h1>

      {pdfName ? (
        <div className="relative border">
          <h1>
            {pdfName.length > 15
              ? pdfName.split(".")[0].slice(0, 15) +
                "..." +
                pdfName.split(".")[1]
              : pdfName}
          </h1>
          <button
            type="button"
            onClick={handleRemove}
            className="bg-red-300 hover:bg-red-400 absolute -top-0 -right-0 w-6 h-6 p-0 rounded-full cursor-pointer"
          >
            <X className="w-4 h-4 mx-auto" />
          </button>
        </div>
      ) : (
        <label
          htmlFor={id}
          className="md:w-[10vw] w-[40vw] h-[10vh] flex items-center justify-center border-2 border-dashed rounded-lg cursor-pointer bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 hover:border-blue-400 transition mt-1"
        >
          {" "}
          <p className="text-gray-500 dark:text-gray-400 text-sm text-center">
            <span>
              {" "}
              Click to upload file <br /> (Only PDF)
            </span>
          </p>
        </label>
      )}
    </div>
  );
};

export default PdfUploader;
