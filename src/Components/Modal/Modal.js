import './Modal.css';
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/material.css';

import { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';

import { Controlled as ControlledEditor } from 'react-codemirror2';

import useCodeLanguage from '../../Hooks/useCodeLanguage';

function Modal({ toggleModel, file }) 
{
    const [ value, setValue ] = useState('');
    const codeLanguage = useCodeLanguage( file.type );
    const isImage = isFileImage( file.type );

    // check if file type is image
    function isFileImage( type ) 
    {
        const imageTypes = [ 'png', 'jpg', 'jpeg' ];
        return imageTypes.includes( type );
    }

    useEffect( async () => 
    {
        if( isImage )
        {
            window.fileToImage( file, '.image-container' );
        }
        else
        {
            const text = await window.fileToText( file );
            setValue( text );
        }
    }, [])

    return ReactDOM.createPortal(
        <>
            <div className='overlay' onClick={ toggleModel }></div>
            <div className='modal' >
                <button className='exit-modal' onClick={ toggleModel }> X </button>
                <h3> { file.name } </h3>
                { 
                    !isImage
                    ?<ControlledEditor
                        value={ value }
                        className="code-mirror-wrapper"
                        options=
                        {{
                            lineWrapping: true,
                            lint: true,
                            mode: codeLanguage,
                            theme: 'material',
                            lineNumbers: true
                        }}
                    />
                    :<div className='image-container'></div>
                }
            </div>
        </>,
        document.getElementById( 'modal-root' )
    )
}

export default Modal;