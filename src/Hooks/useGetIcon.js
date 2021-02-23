import fileText from '../Static/txt.svg';
import fileJpg from '../Static/jpg.svg';
import filePng from '../Static/png.svg';
import fileCss from '../Static/css.svg';
import fileJs from '../Static/javascript.svg';
import fileHtml from '../Static/html.svg';
import fileDefault from '../Static/file.svg';
import fileJson from '../Static/json-file.svg';
import fileMp3 from '../Static/mp3.svg';
import fileDoc from '../Static/doc.svg';
import filePdf from '../Static/pdf.svg';
import fileZip from '../Static/zip.svg';
import fileFolder from '../Static/folder.svg';

// custom hook - import logos and display by type
function useGetIcon( type )
{
    switch ( type ) {
        case 'txt':
            return fileText;
        
        case 'png':
            return filePng;
        
        case 'jpg':
            return fileJpg;
        
        case 'json':
            return fileJson;
        
        case 'html':
            return fileHtml;
        
        case 'css':
            return fileCss;
        
        case 'scss':
            return fileCss;
        
        case 'js':
            return fileJs;
        
        case 'mp3':
            return fileMp3;
        
        case 'doc':
            return fileDoc;
        
        case 'pdf':
            return filePdf;
        
        case 'zip':
            return fileZip;
        
        case 'folder':
            return fileFolder;
        
        default:
            return fileDefault;
    }
}

export default useGetIcon;