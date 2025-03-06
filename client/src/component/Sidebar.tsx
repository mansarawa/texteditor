import { useDispatch, useSelector } from "react-redux";
import { addFolder, addFile, setActiveFile, deleteFolder, deleteFile } from "../redux/slices/editorSlice";
import { RootState } from "../redux/store";
import { useState } from "react";


  const Sidebar = () => {
  const dispatch = useDispatch();
  const folders = useSelector((state: RootState) => state.editor.folders);
  // const activeFile = useSelector((state: RootState) => state.editor.activeFile);

  const [folderName, setFolderName] = useState("");
  const [fileName, setFileName] = useState("");
  const [selectedFolder, setSelectedFolder] = useState(""); 
  const [isModal, setIsModal] = useState(false);
  const [isFileModal, setIsFileModal] = useState(false);

  const openModal = () => setIsModal(true);
  const openFileModal = () => setIsFileModal(true);
  const closeModal = () => {
    setIsModal(false);
    setIsFileModal(false);
  };


  const handleCreateFolder = () => {
    if (folderName.trim()) {
      dispatch(addFolder(folderName));
      setFolderName("");
      closeModal();
    }
  };

 
  const handleCreateFile = () => {
    if (!fileName.trim()) {
      alert("File name cannot be empty!");
      return;
    }
  
    if (!fileName.endsWith(".txt")) {
      alert("Only .txt files are allowed!"); 
      return;
    }
  
    if (selectedFolder) {
      dispatch(addFile({ folderName: selectedFolder, fileName }));
      setFileName("");
      closeModal();
    }
  };
  const handleDeleteFolder = (folderName: string) => {
    dispatch(deleteFolder(folderName));
  };
  const handleDeleteFile = (folderName: string,fileName:string) => {
    dispatch(deleteFile({folderName,fileName}));
  };
  

    return (
      <div className="w-100 text-start bg-gray-900  text-white p-4 h-screen">
           <button onClick={openModal} className="bg-blue-500 px-4 mr-2 py-2 mb-2">Add Folder</button>


<button onClick={openFileModal} className="bg-green-500 px-4 py-2 mb-2" >Add File</button>
        
        <ul>
          {folders.length > 0 ? folders.map((folder, index) => (
            <li key={index} className="mt-2">
              <div className="flex justify-between">
                <span className="cursor-pointer font-bold">📁 {folder.name}</span>
                <span onClick={() => handleDeleteFolder(folder.name)}>🥡</span>
              </div>
              <ul className="ml-4">
                {folder.files.map((file, fileIndex) => (
                    <div className="flex justify-between mt-1">
                    
                  <li
                    key={fileIndex}
                    className={`cursor-pointer text-gray-300 mt-1 hover:text-white`}
                    onClick={() => {
                      dispatch(setActiveFile({ folderName: folder.name, fileName: file.name }));
                      
                    }}
                  >
                    📄 {file.name}
                  
                  </li>
                    <span onClick={() => handleDeleteFile(folder.name,file.name)} className="cursor-pointer">❌</span>
                    </div>
                ))  }
              </ul> 
               
     
            </li>
          )): <h3 className="text-yellow-300">No Folder Here</h3>}
        </ul>
        {isModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 ">
          <div className="bg-yellow-300 p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-xl font-bold mb-4 text-black">Create Folder</h2>
            <input
              type="text"
              value={folderName}
              onChange={(e) => setFolderName(e.target.value)}
              placeholder="Enter folder name..."
              className="w-full text-black border-2 p-2 rounded mb-4"
            />
            <div className="flex justify-end space-x-2">
              <button onClick={closeModal} className="px-4 py-2 bg-gray-900 cursor-pointer text-white rounded ">
                Cancel
              </button>
              <button onClick={handleCreateFolder} className="px-4 py-2 cursor-pointer bg-black text-white rounded hover:bg-black-600">
                Create
              </button>
            </div>
          </div>
        </div>
      )}

      {isFileModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-xl font-bold mb-4 text-black">Create File</h2>
            <select
              value={selectedFolder}
              onChange={(e) => setSelectedFolder(e.target.value)}
              className="w-full text-black border-2 p-2 rounded mb-4"
            >
              <option value="">Select Folder</option>
              {folders.map((folder) => (
                <option key={folder.name} value={folder.name}>
                  {folder.name}
                </option>
              ))}
            </select>

           
            <input
              type="text"
              value={fileName}
              onChange={(e) => setFileName(e.target.value)}
              placeholder="Enter file name..."
              className="w-full text-black border-2 p-2 rounded mb-4"
            />

            <div className="flex justify-end space-x-2">
              <button onClick={closeModal} className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600">
                Cancel
              </button>
              <button onClick={handleCreateFile} className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600">
                Create
              </button>
            </div>
          </div>
        </div>
      )}
      </div>
    );
  };
  


export default Sidebar;
