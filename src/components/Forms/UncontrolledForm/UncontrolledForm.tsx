import {  useId, useState } from 'react';
import '../Form.css';
import { submitFormSchema, type Submission } from '../../schemas/submissions';
import * as z from "zod";

type FormProps = {
    close: () => void;
    submit: (newSubmission: Submission) => void
}

export default function UncontrolledForm({ close, submit }: FormProps) {
    const [nameId, ageId, emailId, genderId, termsId] = [useId(), useId(), useId(), useId(), useId()];
    const [ error, setError ] = useState({
        name: '',
        age: '',
        email: '',
        gender: '',
        terms: ''
    });

    function handleSubmit(event: React.SubmitEvent<HTMLFormElement>) {
        event.preventDefault();
        const form = event.target as HTMLFormElement;
        const formData = new FormData(form);
        const rawData = Object.fromEntries(formData.entries());
        const result = submitFormSchema.safeParse(rawData)

        if (result.success) {
            const submission: Submission = result.data;
            console.log(submission);
            submit(submission)
            close();
        } else {
            const fieldErrors = z.treeifyError(result.error);
            console.log(fieldErrors);
            setError({
                name: fieldErrors.properties?.name?.errors[0] || '',
                age: fieldErrors.properties?.age?.errors[0] || '',
                email: fieldErrors.properties?.email?.errors[0] || '',
                gender: fieldErrors.properties?.gender?.errors[0] || '',
                terms: fieldErrors.properties?.terms?.errors[0] || '',
            })
        }
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label htmlFor={nameId}>
                    Name: <input id={nameId} name="name" />
                </label>
                <p>{error.name}</p>

                <label htmlFor={ageId}>
                    Age: <input id={ageId} name="age" type="number" />
                </label>
                <p>{error.age}</p>

                <label htmlFor={emailId}>
                    Email: <input id={emailId} name="email" />
                </label>
                <p>{error.email}</p>

                <label htmlFor={genderId}>
                    Gender: 
                    <select id={genderId} name="gender" defaultValue="orange">
                        <option value="apple">Apple</option>
                        <option value="banana">Banana</option>
                        <option value="orange">Orange</option>
                    </select>
                </label>
                 <p>{error.gender}</p>

                <label htmlFor={termsId}>
                    Accept Terms and Conditions: 
                    <input id={termsId} type="checkbox" name="terms" />
                </label >
                <p>{error.terms}</p>

                <button type="submit" className='submit-button'>Search</button>
            </form>
        </div>
    )
}
