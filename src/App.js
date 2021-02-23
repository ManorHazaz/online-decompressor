import './App.css';

import { Header } from './Components/Header';
import { Sidebar } from './Components/Sidebar';
import { FolderContent } from './Components/FolderContent';
import { UploadFile } from './Components/UploadFIle';

import { useSelector } from 'react-redux';
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
					<Header />
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