import { useSelector, useDispatch } from "react-redux";
import { goBack, updateFileContent } from "../redux/slices/editorSlice";
import { RootState } from "../redux/store";
import { useState, useEffect } from "react";

const Editor = () => {
  const dispatch = useDispatch();
  const activeFiles = useSelector((state: RootState) => state.editor.activeFile); 

  const [content, setContent] = useState(activeFiles.length > 0 ? activeFiles[0].content : ""); 
  const [selectedFileIndex, setSelectedFileIndex] = useState(0); 

  useEffect(() => {
    if (activeFiles.length > 0) {
      setContent(activeFiles[selectedFileIndex]?.content || ""); 
    }
  }, [activeFiles, selectedFileIndex]);

  if (activeFiles.length === 0) {
    return <div className="w-3/4 p-4 text-white">Select a file to edit</div>;
  }

  const handleUpdate = () => {
    dispatch(updateFileContent({ 
      folderName: activeFiles[selectedFileIndex].folderName, 
      fileName: activeFiles[selectedFileIndex].name, 
      content 
    }));
  };

  const handleClose = (fileName: string) => {
    dispatch(goBack(fileName));

   if (activeFiles.length > 1) {
      setSelectedFileIndex(0);
    }
  };

  return (
    <div className="h-full bg-gray-900 text-white p-4">

      <div className="flex space-x-4 border-b border-gray-700 pb-2 mb-2">
        {activeFiles.map((file, index) => (
          <div 
            key={index} 
            className={`cursor-pointer px-4 py-2 rounded-t-md ${
              index === selectedFileIndex ? "bg-gray-700 text-amber-400" : "bg-gray-800"
            }`}
            onClick={() => setSelectedFileIndex(index)}
          >
            {file.name} 
            <button 
              onClick={() => handleClose(activeFiles[selectedFileIndex].name)} 
              className="ml-2 text-red-400 hover:text-red-600"
            >
              ✕
            </button>
          </div>
        ))}
      </div>

      {/* File Content Editor */}
      <h2 className="text-xl font-bold mb-2">{activeFiles[selectedFileIndex].name}</h2>
      <textarea
        className="w-full h-64 p-2 border-none bg-gray-800 text-white"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />

      <div className="flex w-full justify-center gap-10 mt-4">
        <button 
          className="bg-amber-500 cursor-pointer text-white px-4 py-2"
          onClick={handleUpdate}
        >
          Update
        </button>
        <button 
          className="bg-black text-white cursor-pointer px-4 py-2"
          onClick={() => handleClose(activeFiles[selectedFileIndex].name)}
        >
          Close Tab
        </button>
      </div>
    </div>
  );
};

export default Editor;
