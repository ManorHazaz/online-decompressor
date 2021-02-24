import ReactDOM from 'react-dom';

import './Modal.css';

function Modal({ modalIsOpen, toggleModel }) 
{
    if(modalIsOpen)
    {
        return ReactDOM.createPortal(
            <>
                <div className='overlay'></div>
                <div className='modal' >
                    <button className='exit-modal' onClick={ toggleModel }> X </button>

                    
                </div>
            </>,
            document.getElementById('modal-root')
        )
    }
    else
    return null
}

export default Modal;