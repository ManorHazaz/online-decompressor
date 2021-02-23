import './UploadFile.css'

import store from '../../Redux/store';
import { Children, useRef } from 'react';

function UploadFile() {

    const inputRef = useRef();
    
	function decompressFile() 
	{
		const file = inputRef.current.files[0];
        if( file === undefined )
        {
            return;
        }
		const dir = window.decompressFileToArray( file );
		store.dispatch({ type: 'setDirectory', payload: dir });
		store.dispatch({ type: 'setActiveDirectory', payload: dir });
	}

    function imgClick()
    {
        inputRef.current.click();
    }

    return (
        <div className='upload-file'>
            <h1> Online Decompressor </h1>
            <div className='drag-and-drop'>
                <input type='file' id='zip-file' accept='.zip' ref={ inputRef }></input>
                <span className='status' onClick={ imgClick }></span>
            </div>
            <button className='decompress btn' onClick={ () => decompressFile() }> Decompress </button>
        </div>
    )
}

export default UploadFile
