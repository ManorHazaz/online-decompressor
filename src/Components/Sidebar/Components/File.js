import React from 'react';

import useGetIcon from '../../../Hooks/useGetIcon';

function File({ file }) 
{
    const getFileLogo  = useGetIcon( file.type );

    return (
        <div className='file' title={ file.name } >
            <span className='logo'> <img src={ getFileLogo } /> </span>
            <span className='name'> { file.name } </span>
        </div>
    )
}

export default File
