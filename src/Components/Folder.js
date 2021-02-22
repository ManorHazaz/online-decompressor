import React, { useState } from 'react';

import File from './File'

import folderLogo from '../Static/folder.svg'

function Folder({ directory }) 
{
    const [ showFolder, setShowFolder ] = useState( false );

    function toggleFolder() 
    {
        setShowFolder( !showFolder );
    }
    return (
        <div className='folder'>
            <div className='info' onClick={ () => toggleFolder() }>
                <span className='logo'> <img src={ folderLogo } /> </span>
                <span className='name'> { directory.name } </span>
                <span className='arrow' > { showFolder ? '▲' : '▼' } </span>
            </div>
            { 
                showFolder &&
                directory.children.map(( file ) =>
				(
					file.type === 'folder'
					? <Folder key={ file.type + '-' + file.name } directory={ file } />
					: <File key={ file.type + '-' + file.name } file={ file } />
				))
            
            }
        </div>
    )
}

export default Folder
