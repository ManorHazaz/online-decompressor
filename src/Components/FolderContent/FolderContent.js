import './FolderContent.css';

import Folder from './Components/Folder';
import File from './Components/File';

import { useSelector } from 'react-redux';

function FolderContent() 
{
    const activeDirectory = useSelector( state => state.activeDirectory );

    return (
		<>
		{ 	
		activeDirectory.length != 0
			?<div className='folder-content'>
				{
					activeDirectory.map(( file ) =>
					(
						file.type === 'folder'
						? <Folder key={ file.type + '-' + file.name } directory={ file } />
						: <File key={ file.type + '-' + file.name } file={ file } />
					))
				}
			</div>
			:<div className='welcome-msg'>
				<h2> Selcet Zip file to decompress </h2>
			</div>
		}
		</>
    )
}

export default FolderContent
