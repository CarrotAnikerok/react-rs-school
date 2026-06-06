import {  useId, useState } from 'react';
import '../Form.css';
import { submitFormSchema, type SubmitForm } from '../../schemas/submissions';
import * as z from "zod";
import type { Submission } from '../../../hooks/create';
import { toBase64 } from '../../utils/utils';

type FormProps = {
    close: () => void;
    submit: (newSubmission: Submission) => void
}

export default function UncontrolledForm({ close, submit }: FormProps) {
    const [nameId, ageId, emailId, genderId, imageId, termsId] = [useId(), useId(), useId(), useId(), useId(), useId()];
    const [ error, setError ] = useState({
        name: '',
        age: '',
        email: '',
        gender: '',
        terms: '',
        picture: '',
    });

    async function handleSubmit(event: React.SubmitEvent<HTMLFormElement>) {
        event.preventDefault();
        const form = event.target as HTMLFormElement;
        const formData = new FormData(form);
        const rawData = Object.fromEntries(formData.entries());
        const result = submitFormSchema.safeParse(rawData)

        if (result.success) {
            const submission: SubmitForm = result.data;
            const base64picture = await toBase64(submission.picture);
            const newData = {...result.data, picture: base64picture}
    
            submit(newData)
            close();
        } else {
            const fieldErrors = z.treeifyError(result.error);
            console.log(fieldErrors);
            setError({
                name: fieldErrors.properties?.name?.errors[0] || '',
                age: fieldErrors.properties?.age?.errors[0] || '',
                email: fieldErrors.properties?.email?.errors[0] || '',
                gender: fieldErrors.properties?.gender?.errors[0] || '',
                picture: fieldErrors.properties?.picture?.errors[0] || '',
                terms: fieldErrors.properties?.terms?.errors[0] || '',
            })
        }
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label htmlFor={nameId}>
                    Name: 
                    <input id={nameId} name="name" />
                </label>
                <p>{error.name}</p>

                <label htmlFor={ageId}>
                    Age: 
                    <input id={ageId} name="age" type="number" defaultValue={20} />
                </label>
                <p>{error.age}</p>

                <label htmlFor={emailId}>
                    Email: 
                    <input id={emailId} name="email" />
                </label>
                <p>{error.email}</p>

                <label htmlFor={genderId}>
                    Gender: 
                    <select id={genderId} name="gender" defaultValue="other">
                        <option value="other">Other</option>
                        <option value="female">Female</option>
                        <option value="male">Male</option>
                    </select>
                </label>
                 <p>{error.gender}</p>

                <label htmlFor={imageId}>
                    Image: 
                    <input id={imageId} name="picture" type='file' accept="image/*"></input>
                </label>
                <p>{error.picture}</p>

                <label htmlFor={termsId}>
                    Accept Terms and Conditions: 
                    <input id={termsId} type="checkbox" name="terms" value="yes" />
                </label >
                <p>{error.terms}</p>

                <button type="submit" className='submit-button'>Submit</button>
            </form>
        </div>
    )
}
