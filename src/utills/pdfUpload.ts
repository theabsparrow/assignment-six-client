import { useEdgeStore } from "@/lib/edgestore";

export const pdfUpload = async (
  file: File,
  edgestore: ReturnType<typeof useEdgeStore>["edgestore"]
): Promise<string | null> => {
  try {
    const res = await edgestore.publicFiles.upload({ file });
    return res?.url;
  } catch (error) {
    console.error("PDF Upload Error:", error);
    return null;
  }
};

export default pdfUpload;
