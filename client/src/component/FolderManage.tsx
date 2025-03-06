import { useState } from "react";

interface FileData {
  fileName: string;
  fileText: string;
}

interface FolderData {
  folderName: string;
  files: FileData[];
}

export default function FolderFileManager() {
  const [folders, setFolders] = useState<FolderData[]>([]);
  const [folderName, setFolderName] = useState<string>("");
  const [fileData, setFileData] = useState<{
    folderIndex: number | null;
    fileName: string;
    fileText: string;
  }>({
    folderIndex: null,
    fileName: "",
    fileText: "",
  });

  // Add a new folder
  const addFolder = () => {
    if (!folderName.trim()) return;
    setFolders([...folders, { folderName, files: [] }]);
    setFolderName("");
  };

  
  const addFile = () => {
    if (fileData.folderIndex === null || !fileData.fileName.trim()) return;

    const updatedFolders = [...folders];
    updatedFolders[fileData.folderIndex].files.push({
      fileName: fileData.fileName,
      fileText: fileData.fileText,
    });

    setFolders(updatedFolders);
    setFileData({ folderIndex: null, fileName: "", fileText: "" });
  };

  // Update file text
  const updateFileText = (folderIndex: number, fileIndex: number, newText: string) => {
    const updatedFolders = [...folders];
    updatedFolders[folderIndex].files[fileIndex].fileText = newText;
    setFolders(updatedFolders);
  };

  return (
    <div>
      <h2>Folder & File Manager</h2>

      {/* Add Folder */}
      <input
        type="text"
        placeholder="Folder Name"
        value={folderName}
        onChange={(e) => setFolderName(e.target.value)}
      />
      <button onClick={addFolder}>Add Folder</button>

      
      <select
        value={fileData.folderIndex ?? ""}
        onChange={(e) =>
          setFileData({
            ...fileData,
            folderIndex: e.target.value ? Number(e.target.value) : null,
          })
        }
      >
        <option value="">Select Folder</option>
        {folders.map((folder, index) => (
          <option key={index} value={index}>
            {folder.folderName}
          </option>
        ))}
      </select>
      <input
        type="text"
        placeholder="File Name"
        value={fileData.fileName}
        onChange={(e) => setFileData({ ...fileData, fileName: e.target.value })}
      />
      <textarea
        placeholder="File Text"
        value={fileData.fileText}
        onChange={(e) => setFileData({ ...fileData, fileText: e.target.value })}
      />
      <button onClick={addFile}>Add File</button>

      {/* Display Folders and Files */}
      <div>
        {folders.map((folder, folderIndex) => (
          <div
            key={folderIndex}
            style={{ marginTop: "10px", border: "1px solid black", padding: "10px" }}
          >
            <h3>{folder.folderName}</h3>
            {folder.files.map((file, fileIndex) => (
              <div key={fileIndex} style={{ paddingLeft: "20px" }}>
                <strong>{file.fileName}</strong>
                <textarea
                  value={file.fileText}
                  onChange={(e) =>
                    updateFileText(folderIndex, fileIndex, e.target.value)
                  }
                />
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
