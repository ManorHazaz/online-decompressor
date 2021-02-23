import './UploadFile.css'

import store from '../../Redux/store';
import { useRef } from 'react';

function UploadFile() {

    const inputRef = useRef();
    
	function decompressFile() 
	{
		const file = inputRef.current.files[0];
		const dir = window.decompressFileToArray( file );
		store.dispatch({ type: 'setDirectory', payload: dir });
		store.dispatch({ type: 'setActiveDirectory', payload: dir });
	}

    return (
        <div className='upload-file'>
            <h1> Online Decompressor </h1>
            <div className='drag-and-drop'>
                <input type='file' id='zip-file' ref={ inputRef }></input>
                <span className='status'></span>
            </div>
            <button className='decompress btn' onClick={ () => decompressFile() }> Decompress </button>
        </div>
    )
}

export default UploadFile
