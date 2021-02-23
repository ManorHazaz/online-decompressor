function _( selector )
{
    return document.querySelector( selector );
}

function __( selector )
{
    return document.querySelectorAll( selector );
}

const zip = new JSZip();
const regex = RegExp('[^.]*$');

function findFolder( currentFolder, folderName )
{
	let folder = false
	let counter = 0;
	currentFolder.forEach( e => 
	{
		if( e.name === folderName )
		{
			folder = currentFolder[counter]
		}
		counter++;
	});
	return folder;
}

function decompressFileToArray( file )
{	
	const dir = [
		{ name: file.name, type: 'folder', children: [] }
	];

	JSZip.loadAsync( file )
	.then(( zip ) => 
	{
		// go over all the files in the zip
		for (const [key, value] of Object.entries(zip.files)) 
		{
			// split name of file to find folders
			const words = key.split('/');

			// reset folder array helper
			let currentFolder = dir[0];

			words.forEach( ( e ) => 
			{
				if( e === '' )
				{
					return;
				}
				if( value.dir )
				{
					// file type is folder
					if( findFolder( currentFolder.children, e ) !== false )
					{
						// get inside folder
						currentFolder = findFolder( currentFolder.children, e );
					}
					else
					{
						// create folder
						const newFolder = { name: e, type: 'folder', children: [] }
						currentFolder.children.push( newFolder );
					}
				}
				else
				{
					// file type is not folder
					if( e === words[ words.length - 1 ] )
					{
						// last substring of name
						const file = { name: words[words.length-1], type: regex.exec(e)[0], content: value };
						currentFolder.children.push( file );
					}
					else
					{
						// folder name
						currentFolder = findFolder( currentFolder.children, e );
					}
				}
			});
		}
	})

	return dir;
};

function createDownloadLink( file, appendTo )
{
	const fileArray =  file.content._data.compressedContent;
	console.log( fileArray )
	var byteArray = new Uint8Array( fileArray );
	var a = window.document.createElement('a');

	a.href = window.URL.createObjectURL(new Blob([byteArray], { type: 'application/octet-stream' }));
	a.download = file.name;

	// Append anchor to body.
	_( appendTo ).appendChild(a)
	a.click();


	// // Remove anchor from body
	_( appendTo ).removeChild(a)
}