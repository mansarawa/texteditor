import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface File {
  name: string;
  content: string;
}

interface Folder {
  name: string;
  files: File[];
}


interface ActiveFile extends File {
  folderName: string;
}

interface EditorState {
  folders: Folder[];
  activeFile: ActiveFile[] ; 
}

const loadFromLocalStorage = (): EditorState => {
  const storedData = localStorage.getItem("folders");
  return storedData ? { folders: JSON.parse(storedData), activeFile: [] } : { folders: [], activeFile: [] };
};

const initialState: EditorState = loadFromLocalStorage();

const editorSlice = createSlice({
  name: "editor",
  initialState,
  reducers: {
    
    addFolder: (state, action: PayloadAction<string>) => {
      state.folders.push({ name: action.payload, files: [] });
      localStorage.setItem("folders", JSON.stringify(state.folders));
    },

  
    addFile: (state, action: PayloadAction<{ folderName: string; fileName: string }>) => {
      const { folderName, fileName } = action.payload;
      const folder = state.folders.find((f) => f.name === folderName);
      if (folder) {
        folder.files.push({ name: fileName, content: "" });
      }
      localStorage.setItem("folders", JSON.stringify(state.folders));
    },

  
    setActiveFile: (state, action: PayloadAction<{ folderName: string; fileName: string }>) => {
      const { folderName, fileName } = action.payload;
      const folder = state.folders.find((f) => f.name === folderName);
      const file = folder?.files.find((file) => file.name === fileName);
    
      if (file) {
       
        const isAlreadyOpen = state.activeFile.some(
          (active) => active.name === fileName && active.folderName === folderName
        );
    
        if (!isAlreadyOpen) {
          state.activeFile.push({ ...file, folderName });
        }
      }
    },

    updateFileContent: (state, action: PayloadAction<{ folderName: string; fileName: string; content: string }>) => {
      const { folderName, fileName, content } = action.payload;
      const folder = state.folders.find((f) => f.name === folderName);
      const file = folder?.files.find((file) => file.name === fileName);
    
      if (file) {
        console.log("Updating file:", file.name);
        file.content = content;
    
       
        const activeFileIndex = state.activeFile.findIndex(
          (active) => active.name === fileName && active.folderName === folderName
        );
    
        if (activeFileIndex !== -1) {
          state.activeFile[activeFileIndex].content = content;
        }
        state.activeFile = state.activeFile.filter((active) => active.name !== fileName);
      }
    
      localStorage.setItem("folders", JSON.stringify(state.folders));
    },
    
    deleteFile: (state, action: PayloadAction<{ folderName: string; fileName: string }>) => {
      const { folderName, fileName } = action.payload;
  
     
      const folder = state.folders.find((f) => f.name.trim() === folderName.trim());
  
      if (!folder) {
          console.error(`❌ Folder "${folderName}" not found in state.folders`);
          return; 
      }
      folder.files = folder.files.filter((file) => file.name !== fileName); 
     
      state.activeFile = state.activeFile.filter((active) => !(active.name === fileName && active.folderName === folderName));
  
      localStorage.setItem("folders", JSON.stringify(state.folders));
  },
  
  
    
    goBack: (state, action: PayloadAction<string>) => {
      
      state.activeFile = state.activeFile.filter((active) => active.name !== action.payload);
    },
    
    deleteFolder: (state, action: PayloadAction<string>) => {
      state.folders = state.folders.filter((folder) => folder.name !== action.payload);
    
  
      state.activeFile = state.activeFile.filter((active) => active.folderName !== action.payload);
    
      localStorage.setItem("folders", JSON.stringify(state.folders));
    },
    
  },
});

export const { addFolder, addFile, setActiveFile, updateFileContent,deleteFile, goBack,deleteFolder } = editorSlice.actions;
export default editorSlice.reducer;