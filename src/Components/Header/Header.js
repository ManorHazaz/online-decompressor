import './Header.css';

import store from '../../Redux/store';
import { useSelector } from 'react-redux';

import arrowLogo from '../../Static/css/nav-arrow.svg';

function Header() 
{
    const pastActiveDirectory = useSelector( state => state.pastActiveDirectory );
    const futureActiveDirectory = useSelector( state => state.futureActiveDirectory );


    function handleNewFile()
    {
        window.location.reload();
    }

    function handleUndo() 
    {
        if(  pastActiveDirectory.length !== 0 )
        {
            store.dispatch({ type: 'undo' });
        }
    }

    function handleRedo() 
    {
        if(  futureActiveDirectory.length !== 0 )
        {
            store.dispatch({ type: 'redo' });
        }

    }

    return (
        <div className='header'>
            <div className='nav'>
                <img className='left-arrow active' src={ arrowLogo } onClick={ handleUndo } />
                <img className='right-arrow active' src={ arrowLogo } onClick={ handleRedo } />
            </div>
            <button className='btn new-file' onClick={ handleNewFile } > Decompress New File </button>
        </div>
    )
}

export default Header;