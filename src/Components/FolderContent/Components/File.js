import React from 'react';

import useGetIcon from '../../../Hooks/useGetIcon';

function File({ file }) 
{
    const getFileLogo  = useGetIcon( file.type );

    return (
        <>
        <div className='file' title={ file.name } onClick={ () => window.createDownloadLink( file, '.link') }>
            <span className='logo'> <img src={ getFileLogo } /> </span>
            <span className='name'> { file.name } </span>
        </div>
        <span className='link hidden'></span>
        </>
    )
}

export default File
