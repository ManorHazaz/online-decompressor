import './Sidebar.css'

import Folder from './Components/Folder';
import File from './Components/File';

import { useSelector } from 'react-redux';

function Sidebar() {
    const directory =  useSelector( state => state.directory );

    return (
        <div className='sidebar'>
            { 
				directory.map(( file ) =>
				(
					file.type === 'folder'
					? <Folder key={ file.type + '-' + file.name } directory={ file } />
					: <File key={ file.type + '-' + file.name } file={ file } />
				))
			}
            
        </div>
    )
}

export default Sidebar
