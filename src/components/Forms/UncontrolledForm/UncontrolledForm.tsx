import {  useId, useState } from 'react';
import '../Form.css';
import { submitFormSchema, type Submission } from '../../schemas/submissions';
import * as z from "zod";

type FormProps = {
    close: () => void;
    submit: (newSubmission: Submission) => void
}

export default function UncontrolledForm({ close, submit }: FormProps) {
    const ageInputId = useId();
    const genderInputId = useId();
    const [ error, setError ] = useState({
        name: '',
        age: '',
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
                gender: fieldErrors.properties?.gender?.errors[0] || '',
                terms: fieldErrors.properties?.terms?.errors[0] || '',
            })
        }
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label>
                    Name: <input name="name" />
                </label>
                <p>{error.name}</p>
                <label htmlFor={ageInputId}>
                    Age: <input id={ageInputId} name="age" type="number" />
                </label>
                <p>{error.age}</p>
                <label>
                    Email: <input name="email" />
                </label>
                <label htmlFor={genderInputId}>
                    Gender: 
                    <select id={genderInputId} name="gender" defaultValue="orange">
                        <option value="apple">Apple</option>
                        <option value="banana">Banana</option>
                        <option value="orange">Orange</option>
                    </select>
                </label>
                <label>
                    Accept Terms and Conditions: <input type="checkbox" name="terms" />
                </label>
                <p>{error.terms}</p>
                <button type="submit" className='submit-button'>Search</button>
            </form>
        </div>
    )
}
