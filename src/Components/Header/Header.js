import './Header.css';

import arrowLogo from '../../Static/css/nav-arrow.svg';

import store from '../../Redux/store';

function Header() 
{
    function handleNewFile()
    {
		store.dispatch({ type: 'setDirectory', payload: [] });
		store.dispatch({ type: 'setActiveDirectory', payload: [] });
    }
    return (
        <div className='header'>
            <div className='nav'>
                <img className='left-arrow' src={ arrowLogo } />
                <img className='right-arrow' src={ arrowLogo } />
            </div>
            <button className='btn new-file' onClick={ () => handleNewFile() } > Decompress New File </button>
        </div>
    )
}

export default Header
