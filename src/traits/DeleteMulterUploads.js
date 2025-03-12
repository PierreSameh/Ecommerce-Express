import fs from "fs";
import path from "path";

export const deleteFile = (filePath) => {
  const absolutePath = path.join(process.cwd(), filePath.replace(/^\/+/, ""));

  if (fs.existsSync(absolutePath)) {
    fs.unlink(absolutePath, (err) => {
      if (err) {
        throw err;
      }
    });
  } else {
    const error = new Error(`File Not Found: ${filePath}`);
    throw error;
  }
};

export const deleteMultipleFiles = (filePaths) => {
  filePaths.forEach((filePath) => deleteFile(filePath));
};
