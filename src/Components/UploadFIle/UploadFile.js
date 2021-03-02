import './UploadFile.css';

import { useRef, useState } from 'react';
import store from '../../Redux/store';

function UploadFile() 
{
    const inputRef = useRef();
    const [ canUpload, setCanUpload ] = useState( true );
    
    // Check file type and decompress
	function decompressFile() 
	{
        const regexAfterDot = RegExp('[^.]*$');
		const file = inputRef.current.files[0];
        if( file === undefined || regexAfterDot.exec( file.name )[0] != 'zip' || file.size > 52428800 )
        {
            setCanUpload( false );
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
            <p className={ !canUpload ? 'alert' : '' }>Only *.zip files are supported || Max file size: 50mb</p>
        </div>
    )
}

export default UploadFile;