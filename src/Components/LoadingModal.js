import Modal from 'react-modal';
import { BounceLoader } from 'react-spinners';

export default function LoadingModal({loading}) {

    const customStyles = {
        content: {
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'transparent',
          border: 'none',
        },
    };

    return (
        <Modal
            isOpen={loading}
            style={customStyles}
            ariaHideApp={false}
        >
            <div className='d-flex flex-column justify-content-center'>
                <p>Comanda in curs de trimitere ...</p>
                <BounceLoader size={60} color="#c29c5f" />
            </div>
        </Modal>
    )
}