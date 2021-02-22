import './Sidebar.css'

import Folder from './Components/Folder';
import File from './Components/File';

import { useSelector } from 'react-redux';

function Sidebar() {
    const directory =  useSelector( state => state.directory );

    return (
        <div className='sidebar'>
            { 	directory.length != 0
				? directory.map(( file ) =>
				(
					file.type === 'folder'
					? <Folder key={ file.type + '-' + file.name } directory={ file } />
					: <File key={ file.type + '-' + file.name } file={ file } />
				))
				: <div className='welcome-msg'>
					<h2> Selcet Zip file to decompress </h2>
				</div>
			}
            
        </div>
    )
}

export default Sidebar
