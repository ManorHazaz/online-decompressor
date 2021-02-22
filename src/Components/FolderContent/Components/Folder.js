import folderLogo from '../../../Static/folder.svg';

import store from '../../../Redux/store';

function Folder({ directory }) 
{
    function changeActiveDirectory( directory ) 
    {
        store.dispatch({ type: 'setActiveDirectory', payload: directory.children });
    }

    return (
        <div className='folder' onClick={ () => changeActiveDirectory( directory ) }>
                <span className='logo'> <img src={ folderLogo } /> </span>
                <span className='name'> { directory.name } </span>
        </div>
    )
}

export default Folder;