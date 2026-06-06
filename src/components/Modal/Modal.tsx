import { useEffect, type ReactNode } from 'react';
import './Modal.css';

type ModalProps = {
    children?: ReactNode
    isOpen: boolean;
    close: () => void;
}

function HandleKey(event: KeyboardEvent, close: () => void) {
    if (event.key === "Escape") {
        close();
    }

    if (event.key !== 'Tab') {
        return;
    }

    const modal = document.querySelector('.modal-content');

    if (!modal) {
        return;
    }

    const focusableSelectors = 'a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), [tabindex="0"]';
    const focusableElements: HTMLElement[] = Array.from(modal.querySelectorAll(focusableSelectors));

    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1] 

    if (event.shiftKey) {
        if (document.activeElement === firstElement) {
            lastElement.focus();
            event.preventDefault();
        }
    } else {
        if (document.activeElement === lastElement) {
            firstElement.focus();
            event.preventDefault();
        }
    }
}

export default function Modal({ children, isOpen, close }: ModalProps) {
    useEffect(() => {
        const onKey = (event: KeyboardEvent) => HandleKey(event, close);
    
        document.body.addEventListener("keydown", onKey);
            return () => {
                document.body.removeEventListener("keydown", onKey);
            };
    }, [close]);

    function closeOnOutsideClick(event: React.MouseEvent) {
        if (event.target === event.currentTarget) {
            close();
        }
    }

    if (!isOpen) {
      return null;
    }

    return (
        <div className='modal' onClick={closeOnOutsideClick}>
            <div className='modal-content' role='dialog' aria-modal='true' aria-label='Modal' tabIndex={-1}>
                <button type="button" onClick={close} className='modal-close' aria-label="Close">X</button>
                {children}
                <button onClick={close} className='modal-accept'>Okay!</button>
            </div>
        </div>
    )
}
