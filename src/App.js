import './App.css';

import store from './Redux/store';

import { Sidebar } from './Components/Sidebar';
import { FolderContent } from './Components/FolderContent';

import { useRef } from 'react';
import withStore from './HOCs/withStore';


function App() 
{
	const inputRef = useRef();

	function decompressFile() 
	{
		const file = inputRef.current.files[0];
		const dir = window.decompressFileToArray( file );
		store.dispatch({ type: 'setDirectory', payload: dir });
		store.dispatch({ type: 'setActiveDirectory', payload: dir });
	}
	 
	return (
		<div className="App">
			{  }
			<div className='file-input-container'>
			<h1> Online Decompressor </h1>
				<input type="file" id="zip-file" ref={ inputRef } ></input>
				<button onClick={ () => decompressFile() }> Decompress </button>
			</div>

			<div className='container'>
				<Sidebar />
				<FolderContent />
			</div>
		
		</div>
	);
}

export default withStore( App );