import 'codemirror/mode/xml/xml';
import 'codemirror/mode/javascript/javascript';
import 'codemirror/mode/css/css';
import 'codemirror/mode/sass/sass'

// custom hook - arrange code language by file type
function useCodeLanguage( type )
{
    switch ( type ) {
        case 'html':
            return 'xml';

        case 'js':
            return 'javascript';

        case 'json':
            return 'javascript';

        case 'lock':
            return 'javascript';

        case 'scss':
            return 'css';
        
        default:
            return type;
    }
}

export default useCodeLanguage;