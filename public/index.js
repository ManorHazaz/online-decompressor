function _( selector )
{
    return document.querySelector( selector );
}

function __( selector )
{
    return document.querySelectorAll( selector );
}

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
