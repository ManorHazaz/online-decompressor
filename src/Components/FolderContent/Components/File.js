import React from 'react'

import fileText from '../../../Static/text.svg';
import fileImage from '../../../Static/picture.svg';
import fileDll from '../../../Static/dll.svg';
import fileCss from '../../../Static/css.svg';
import fileJs from '../../../Static/js.svg';
import fileHtml from '../../../Static/html.svg';
import fileDefault from '../../../Static/default.svg'

function File({ file }) 
{
    function getFileLogo( type )
    {
        switch (type) {
            case 'txt':
                return fileText;
            
            case 'gif':
                return fileImage;
            
            case 'png':
                return fileImage;
            
            case 'jpg':
                return fileImage;
            
            case 'peng':
                return fileImage;
            
            case 'dll':
                return fileDll;
            
            case 'html':
                return fileHtml;
            
            case 'css':
                return fileCss;
            
            case 'js':
                return fileJs;
            
            default:
                return fileDefault;
        }

    }

    return (
        <>
        <div className='file' onClick={ () => window.createDownloadLink( file, '.link') }>
            <span className='logo'> <img src={ getFileLogo( file.type ) } /> </span>
            <span className='name'> { file.name } </span>
        </div>
        <span className='link hidden'></span>
        </>
    )
}

export default File
