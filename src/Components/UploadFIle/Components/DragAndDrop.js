import React from 'react'

function DragAndDrop() 
{
    return (
        <>
            <div className='drag-and-drop'>
                <input type="file" id="zip-file"></input>
                <span className='status'></span>
            </div>
            <button className='decompress btn'> Decompress </button>
        </>
    )
}

export default DragAndDrop
