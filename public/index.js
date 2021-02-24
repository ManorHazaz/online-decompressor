function _( selector )
{
    return document.querySelector( selector );
}

function __( selector )
{
    return document.querySelectorAll( selector );
}

const zip = new JSZip();
const regexAfterDot = RegExp('[^.]*$');
const regexBeforeDot = RegExp('.*(?=\.)');

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
		{ name: file.name, type: 'zip', children: [] }
	];

	JSZip.loadAsync( file )
	.then(( zip ) => 
	{
		var entries = Object.keys(zip.files).map(function (name) 
		{
			return zip.files[name];
		});

		var listOfPromises = entries.map(function(entry) 
		{
			return entry.async("uint8array").then(function (u8) 
			{
				// we bind the two together to be able to match the name and the content in the last step
				return [entry.name, u8];
			});
		});
		  
		  // 3.
		var promiseOfList = Promise.all(listOfPromises);
		  
		  // 4.
		promiseOfList.then(function (list) 
		{
			// here, list is a list of [name, content]
			// let's transform it into an object for easy access
			const result = list.reduce(function (accumulator, current) 
			{
				var currentName = current[0];
				var currentValue = current[1];
				accumulator[currentName] = currentValue;
				return accumulator;
			}, {} /* initial value */);

			for (const [key, value] of Object.entries(  result )) 
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
					if( value.length === 0 )
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
						const file = { name: words[words.length-1], type: regexAfterDot.exec(e)[0], content: value };
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
			
		});
	})
	return dir;
};

// 
function createDownloadLink( file, appendTo )
{
	const fileArray =  file.content;
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