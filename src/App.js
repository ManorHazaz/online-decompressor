import { useEffect, useRef, useState } from 'react';
import './App.css';
import Folder from './Components/Folder';
import File from './Components/File';

function App() 
{
	const [ directory, setDirectory ] = useState();
	const inputRef = useRef();

	function decompressFile() 
	{
		const file = inputRef.current.files[0];
		setDirectory( window.decompressFileToArray( file ) );
	}

	return (
		<div className="App">
			<div className='file-input-container'>
			<h1> Online Decompressor </h1>
				<input type="file" id="zip-file" ref={ inputRef } ></input>
				<button onClick={ () => decompressFile() }> Decompress </button>
			</div>

			<div className='container'>
			{ 	directory
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
		
		</div>
	);
}

export default App;
