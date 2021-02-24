import React, { useState } from 'react';

import useGetIcon from '../../../Hooks/useGetIcon';
import Modal from '../../Modal/Modal';

function File({ file }) 
{
    const [ modalIsOpen, setModalIsOpen ] = useState( false );
    const typesSupport = [ 'js', 'css', 'html', 'txt', 'scss', 'md', 'yml', 'png', 'jpg', 'json', 'lock', 'gitignore' ];
    const getFileLogo  = useGetIcon( file.type );
    const imgDownload  = useGetIcon( 'download' );
    const imgPreview  = useGetIcon( 'preview' );

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
