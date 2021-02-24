import { useState } from 'react';

import store from '../../../Redux/store';
import useIcons from '../../../Hooks/useIcons';

import File from './File';

import arrowLogo from '../../../Static/css/arrow-down.svg';

function Folder({ directory }) 
{
    const [ showFolder, setShowFolder ] = useState( false );
    
    const getFileLogo  = useIcons( directory.type );

    function toggleFolder() 
    {
        setShowFolder( !showFolder );
    }

    function changeActiveDirectory( directory ) 
    {
        store.dispatch({ type: 'setActiveDirectory', payload: directory.children });
    }

    return (
        <div className={`folder ${ showFolder ? 'open' :'' }`} title={ directory.name } >
            <div className='info' >
                <span className='arrow' onClick={ () => toggleFolder() }> { showFolder ? <img className='rotate' src={ arrowLogo } /> : <img src={ arrowLogo } /> } </span>
                <span className='logo' onClick={ () => changeActiveDirectory( directory ) }> <img src={ getFileLogo } /> </span>
                <span className='name' onClick={ () => changeActiveDirectory( directory ) } > { directory.name } </span>
            </div>
            
            { 
                showFolder
                && 
                directory.children.map(( file ) =>
                (
                    file.type === 'folder' || file.type === 'zip'
                    ? <Folder key={ file.type + '-' + file.name } directory={ file } />
                    : ''
                ))
            }
            {
                showFolder
                && 
                directory.children.map(( file ) =>
                (
                    file.type !== 'folder' && file.type !== 'zip'
                    && <File key={ file.type + '-' + file.name } file={ file } />
                ))
            }
        </div>
    )
}

export default Folder
