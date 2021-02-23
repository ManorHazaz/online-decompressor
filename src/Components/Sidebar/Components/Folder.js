import { useState } from 'react';

import store from '../../../Redux/store';

import File from './File'

import folderLogo from '../../../Static/folder.svg';
import zipLogo from '../../../Static/zip.svg';
import arrowLogo from '../../../Static/css/arrow-down.svg';

function Folder({ directory }) 
{
    const [ showFolder, setShowFolder ] = useState( false );

    function toggleFolder() 
    {
        setShowFolder( !showFolder );
    }

    function changeActiveDirectory( directory ) 
    {
        store.dispatch({ type: 'setActiveDirectory', payload: directory.children });
    }

    return (
        <div className='folder'>
            <div className='info' >
                <span className='arrow' onClick={ () => toggleFolder() }> { showFolder ? <img className='rotate' src={ arrowLogo } /> : <img src={ arrowLogo } /> } </span>
                <span className='logo' onClick={ () => changeActiveDirectory( directory ) }> { directory.type === 'folder' ? <img src={ folderLogo } />: <img src={ zipLogo } /> }</span>
                <span className='name' onClick={ () => changeActiveDirectory( directory ) } > { directory.name } </span>
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
