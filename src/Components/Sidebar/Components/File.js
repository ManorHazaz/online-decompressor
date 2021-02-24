import React from 'react';

import useIcons from '../../../Hooks/useIcons';

function File({ file }) 
{
    const getFileLogo  = useIcons( file.type );

    return (
        <div className='file' title={ file.name } >
            <span className='logo'> <img src={ getFileLogo } /> </span>
            <span className='name'> { file.name } </span>
        </div>
    )
}

export default File
