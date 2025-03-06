// import React, { useState } from 'react';
import Sidebar from './Sidebar';
import Editor from './Editor';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';

function Home() {
    const folders = useSelector((state: RootState) => state.editor.folders);
    //const [isEditorOpen, setIsEditorOpen] = useState(false);

    console.log(folders);

    return (
        <div className="w-full h-screen flex flex-col bg-gray-900 text-white">
            <h1 className='text-2xl sm:text-4xl text-center py-4 text-yellow-300'>Welcome To Text Editor</h1>

            <div className="flex flex-col sm:flex-row flex-grow bg-gray-900 text-white">
                <div className="w-full sm:w-1/4 bg-yellow-400 p-3">
                    <Sidebar />
                </div>
                <div className="w-full h-full bg-gray-900 text-start text-black p-4">
                    <Editor />
                </div>


            </div>
        </div>
    );
}

export default Home;
