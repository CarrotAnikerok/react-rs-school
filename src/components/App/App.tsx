import './App.css'
import Portal from '../CreateModal/Portal'
import Modal from '../Modal/Modal'
import { useState } from 'react';

function App() {
    const [isOpen, setOpen] = useState(false);

    return (
      <section id="center">
            <div>
            <h1>Play with forms!</h1>
            </div>

            <button onClick={() => setOpen(true)}>
                Open modal!
            </button>
    
            <Portal>
                <Modal isOpen={isOpen} close={() => setOpen(false)}>
                    Hello i&apos;m modal!
                </Modal>,
            </Portal>
        </section>
    )
}

export default App
