import './App.css';

import store from './Redux/store';

import { Sidebar } from './Components/Sidebar';
import { FolderContent } from './Components/FolderContent';
import { UploadFile } from './Components/UploadFIle';

import { useRef } from 'react';
import withStore from './HOCs/withStore';


function App() 
{
	const directory =  useSelector( state => state.directory );

	return (
		<div className="App">
	{
				directory.length === 0
	 
				?<UploadFile />

				:<div className='file-manager'>
			<div className='container'>
				<Sidebar />
				<FolderContent />
			</div>
				</div>
			}
		</div>
	);
}

export default withStore( App );