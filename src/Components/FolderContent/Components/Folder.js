import store from '../../../Redux/store';
import useGetIcon from '../../../Hooks/useGetIcon';

function Folder({ directory }) 
{
    const getFileLogo  = useGetIcon( directory.type );

    function changeActiveDirectory( directory ) 
    {
        store.dispatch({ type: 'setActiveDirectory', payload: directory.children });
    }

    return (
        <div className='folder' title={ directory.name } onClick={ () => changeActiveDirectory( directory ) }>
                <span className='logo'> <img src={ getFileLogo } /> </span>
                <span className='name'> { directory.name } </span>
        </div>
    )
}

export default Folder;