import './UploadFile.css'

import store from '../../Redux/store';
import { Children, useRef } from 'react';

function UploadFile() {

    const inputRef = useRef();
    
	function decompressFile() 
	{
        const regexAfterDot = RegExp('[^.]*$');
		const file = inputRef.current.files[0];

        if( file === undefined || regexAfterDot.exec(file.name)[0] != 'zip')
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
            <div className='field'>
                <input type='file' id='zip-file' accept='.zip' ref={ inputRef } onChange={ decompressFile }></input>
                <span className='status' onClick={ imgClick }></span>
            </div>
            <p>only *.zip files are supported</p>
        </div>
    )
}

export default UploadFile
