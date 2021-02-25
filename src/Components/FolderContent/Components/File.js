import React, { useState } from 'react';

import useIcons from '../../../Hooks/useIcons';
import Modal from '../../Modal/Modal';

function File({ file }) 
{
    const [ modalIsOpen, setModalIsOpen ] = useState( false );
    const typesSupport = [ 'js', 'css', 'html', 'txt', 'scss', 'md', 'yml', 'png', 'jpg', 'json', 'lock', 'gitignore', 'pdf' ];
    const getFileLogo  = useIcons( file.type );
    const imgDownload  = useIcons( 'download' );
    const imgPreview  = useIcons( 'preview' );

    // Open and close modal
	function toggleModel() 
	{
        setModalIsOpen( !modalIsOpen );
	}

    return (
        <>
        <div className='file' title={ file.name } >
            <span className='logo'> <img src={ getFileLogo } /> </span>
            <span className='name'> { file.name } </span>
            <div className='file-options'>
                <img src={ imgDownload } onClick={ () => window.createDownloadLink( file, '.link') } />
                {
                    typesSupport.includes( file.type ) &&
                    <img src={ imgPreview } onClick={() => toggleModel() } />
                }
                {
                    modalIsOpen && <Modal toggleModel={ toggleModel } file={ file } />
                }
            </div>
        </div>

        <span className='link hidden'></span>
        </>
    )
}

export default File
