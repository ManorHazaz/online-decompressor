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

// check if folder exist in array
function findFolder( currentFolder, folderName )
{
	let folder = false
	let counter = 0;
	currentFolder.forEach( e => 
	{
		if( e.name === folderName )
		{
			folder = currentFolder[ counter ]
		}
		counter++;
	});
	return folder;
}

// decompress file and arange in array
function decompressFileToArray( file )
{	
	const dir = [
		{ name: file.name, type: 'zip', children: [] }
	];

	JSZip.loadAsync( file )
	.then(( zip ) => 
	{
		const entries = Object.keys( zip.files ).map(( name ) => 
		{
			return zip.files[ name ];
		});

		const listOfPromises = entries.map(( entry ) => 
		{
			return entry.async( "uint8array" ).then(( u8 ) => 
			{
				// bind the two together to be able to match the name and the content in the last step
				return [ entry.name, u8 ];
			});
		});
		  
		const promiseOfList = Promise.all( listOfPromises );
		  
		promiseOfList.then(( list ) =>
		{
			// transform it into an object for easy access
			const result = list.reduce( ( accumulator, current ) => 
			{
				const currentName = current[0];
				const currentValue = current[1];
				accumulator[ currentName ] = currentValue;
				return accumulator;
			}, {});

			for (const [ key, value ] of Object.entries(  result )) 
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
							const file = { name: words[ words.length-1 ], type: regexAfterDot.exec( e )[0], content: value };
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

// get file and download
function createDownloadLink( file, appendTo )
{
	const fileArray =  file.content;
	const byteArray = new Uint8Array( fileArray );
	const a = window.document.createElement( 'a' );

	a.href = window.URL.createObjectURL( new Blob([ byteArray ], { type: 'application/octet-stream' }));
	a.download = file.name;

	// Append to html.
	_( appendTo ).appendChild( a )

	a.click();

	// // Remove from html
	_( appendTo ).removeChild( a )
}

// get file and return - promise
async function fileToText( file ) 
{
	const fileArray =  file.content;
	const byteArray = new Uint8Array( fileArray );

	const blob = new Blob([ byteArray ], { type: 'application/octet-stream' });
	return await blob.text();
}

// get file ( image type ) and inject img to the html
function fileToImage( file, appendTo ) 
{
	const fileArray =  file.content;
	const type = 'image/'+ file.type ;

	const blob = new Blob([ fileArray ], { 'type': type });
	const url = URL.createObjectURL( blob );
	const image = document.createElement( 'img' );
    image.src = url;

	_( appendTo ).appendChild( image )
}