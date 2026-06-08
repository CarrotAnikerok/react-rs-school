import './App.css';
import Portal from '../Portal/Portal';
import Modal from '../Modal/Modal';
import { useState } from 'react';
import ControlledForm from '../Forms/ControlledForm/ControlledForm';
import UncontrolledForm from '../Forms/UncontrolledForm/UncontrolledForm';
import { useSubmit } from '../../hooks/create';
import CardList from '../CardList/CardList';

export function App() {
  const [isOpen, setOpen] = useState(false);
  const [isUncontrolled, setUncontrolledForm] = useState(false);
  const { submissions, setSubmission } = useSubmit();

  const switchForm = () => {
    setUncontrolledForm(!isUncontrolled);
  };

  const closeModal = () => setOpen(false);

  return (
    <section id="center">
      <div>
        <h1>Play with forms!</h1>
      </div>

      <button onClick={() => setOpen(true)}>Open modal!</button>

      <CardList submissions={submissions}></CardList>

      <Portal>
        <Modal isOpen={isOpen} close={closeModal}>
          <div>
            <button onClick={switchForm}>
              <span>switch form</span>
            </button>
          </div>
          <h1>{isUncontrolled ? 'Uncontrolled Form' : 'Controlled Form'}</h1>
          {isUncontrolled ? (
            <UncontrolledForm
              close={closeModal}
              submit={setSubmission}
            ></UncontrolledForm>
          ) : (
            <ControlledForm
              close={closeModal}
              submit={setSubmission}
            ></ControlledForm>
          )}
        </Modal>
        ,
      </Portal>
    </section>
  );
}
