
export default function reducer( state = { directory: [], activeDirectory: [] }, action ) 
{
    switch (action.type) 
    {
        case 'setDirectory':
            return { ...state, directory: action.payload }

        case 'setActiveDirectory':
        return { ...state, activeDirectory: action.payload }
    
        default:
            return state;
    }
}