import React, { useState } from 'react';

import useGetIcon from '../../../Hooks/useGetIcon';
import Modal from '../../Modal/Modal';

function File({ file }) 
{
    const [ modalIsOpen, setModalIsOpen ] = useState( false )
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
                <img src={ imgPreview } onClick={() => toggleModel() } />
                <Modal modalIsOpen={ modalIsOpen } toggleModel={ toggleModel } />
            </div>
        </div>

        <span className='link hidden'></span>
        </>
    )
}

export default File
