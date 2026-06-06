import { useId } from "react";
import { useForm } from "react-hook-form";
import { submitFormSchema, type Submission } from "../../schemas/submissions";
import { zodResolver } from "@hookform/resolvers/zod";

type FormProps = {
    close: () => void;
    submit: (newSubmission: Submission) => void
}

export default function ControlledForm({ close, submit}: FormProps) {
    const [nameId, ageId, emailId, genderId, termsId] = [useId(), useId(), useId(), useId(), useId()];
    const { register, handleSubmit, formState: { errors }  } = useForm({
      defaultValues: {
        name: '',
        age: 0,
        gender: 'orange',
        terms: false
      },
      resolver: zodResolver(submitFormSchema)
    });

    function submitForm(data: Submission) {
        submit(data);
        close();
    }

    console.log(errors);

    return (
      <div>
          <form onSubmit={handleSubmit(submitForm)}>
                  <label htmlFor={nameId}>
                      Name: 
                      <input id={nameId} {...register('name', {required: 'Name is required'})} />
                  </label>
                  <p>{errors.name?.message}</p>

                  <label htmlFor={ageId}>
                      Age: 
                      <input id={ageId} {...register('age')} type="number" />
                  </label>
                  <p>{errors.age?.message}</p>

                  <label htmlFor={emailId}>
                      Email: 
                      <input id={emailId} name="email" />
                  </label>
                  <p>{errors.email?.message}</p>

                  <label htmlFor={genderId}>
                      Gender: 
                      <input id={genderId} {...register('gender')} />
                  </label>
                  <p>{errors.gender?.message}</p>

                  <label htmlFor={termsId}>
                      Accept Terms and Conditions: 
                      <input id={termsId} type="checkbox" {...register('terms')}/>
                  </label>
                  <p>{errors.terms?.message}</p>
                  
                  <button type="submit" className='submit-button'>Search</button>
              </form>
      </div>
    )
}
