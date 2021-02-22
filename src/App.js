import withStore from './HOCs/withStore';

import { useEffect, useRef, useState } from 'react';
import './App.css';
import Folder from './Components/Folder';
import File from './Components/File';
import store from './Redux/store';
import { useSelector } from 'react-redux';

function App() 
{
	const directory =  useSelector( state => state.directory );
	const activeDirectory = useSelector( state => state.activeDirectory );

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
		
		</div>
	);
}

export default withStore( App );