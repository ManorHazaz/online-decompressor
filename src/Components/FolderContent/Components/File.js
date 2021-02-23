import React from 'react';

import useGetIcon from '../../../Hooks/useGetIcon';

function File({ file }) 
{
    const getFileLogo  = useGetIcon( file.type );
    const imgDownload  = useGetIcon( 'download' );
    const imgPreview  = useGetIcon( 'preview' );

    return (
        <>
        <div className='file' title={ file.name } >
            <span className='logo'> <img src={ getFileLogo } /> </span>
            <span className='name'> { file.name } </span>
            <div className='file-options'>
                <img src={ imgDownload } onClick={ () => window.createDownloadLink( file, '.link') } />
                <img src={ imgPreview } />
            </div>
        </div>

        <span className='link hidden'></span>
        </>
    )
}

export default File
