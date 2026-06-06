import { useId } from "react";
import { useForm } from "react-hook-form";
import { submitFormSchema, type Submission } from "../../schemas/submissions";
import { zodResolver } from "@hookform/resolvers/zod";

type FormProps = {
    close: () => void;
    submit: (newSubmission: Submission) => void
}

export default function ControlledForm({ close, submit}: FormProps) {
    const ageInputId = useId();
    const genderInputId = useId();
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
                  <label>
                      Name: <input {...register('name', {required: 'Name is required'})} />
                  </label>
                  <p>{errors.name?.message}</p>
                  <label htmlFor={ageInputId}>
                      Age: <input id={ageInputId} {...register('age')} type="number" />
                  </label>
                  <p>{errors.age?.message}</p>
                  <label>
                      Email: <input name="email" />
                  </label>
                  <label htmlFor={genderInputId}>
                      Gender: <input id={genderInputId} {...register('gender')} />
                  </label>
                  <p>{errors.gender?.message}</p>
                  <label>
                      Accept Terms and Conditions: <input type="checkbox" {...register('terms')}/>
                  </label>
                  <p>{errors.terms?.message}</p>
                  <button type="submit" className='submit-button'>Search</button>
              </form>
      </div>
    )
}
