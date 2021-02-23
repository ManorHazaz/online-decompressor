const initialState = 
{
    directory: [],
    activeDirectory: [],
    pastActiveDirectory: [],
    futureActiveDirectory: []
}

export default function reducer( state = initialState , action ) 
{
    switch (action.type) 
    {
        case 'setDirectory':
            return { ...state, directory: action.payload }

        case 'setActiveDirectory':
        {
            if( state.activeDirectory.length !== 0 && state.activeDirectory !== state.pastActiveDirectory[ state.pastActiveDirectory.length -1 ])
            {
                state.pastActiveDirectory.push( state.activeDirectory );
            }
            return { ...state, activeDirectory: action.payload }
        }

        case 'undo':
        {
            state.futureActiveDirectory.push( state.activeDirectory );
            return { ...state, activeDirectory: state.pastActiveDirectory.pop() }
        }

        case 'redo':
        {
            state.pastActiveDirectory.push( state.activeDirectory );
            return { ...state, activeDirectory: state.futureActiveDirectory.pop() }
        }
    
        default:
            return state;
    }
}