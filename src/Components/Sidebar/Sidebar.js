import './Sidebar.css'

import Folder from './Components/Folder';
import File from './Components/File';

import { useSelector } from 'react-redux';

function Sidebar() {
    const directory =  useSelector( state => state.directory );

    return (
        <div className='sidebar'>
			{
				directory.length != 0
				&& 
				directory.map(( file ) =>
				(
					file.type === 'folder' || file.type === 'zip'
					? <Folder key={ file.type + '-' + file.name } directory={ file } />
					: ''
				))
			}
			{
				directory.length != 0
				&&
				directory.map(( file ) =>
				(
					file.type !== 'folder' && file.type !== 'zip'
					&& <File key={ file.type + '-' + file.name } file={ file } />
				))
			}
            
        </div>
    )
}

export default Sidebar
