import './FolderContent.css';

import Folder from './Components/Folder';
import File from './Components/File';

import { useSelector } from 'react-redux';

function FolderContent() 
{
    const activeDirectory = useSelector( state => state.activeDirectory );

    return (
		<div className='folder-content'>
			{
				activeDirectory.length != 0
				
				&& activeDirectory.map(( file ) =>
				(
					file.type === 'folder' || file.type === 'zip'
					? <Folder key={ file.type + '-' + file.name } directory={ file } />
					: <File key={ file.type + '-' + file.name } file={ file } />
				))
			}
		</div>
    )
}

export default FolderContent
