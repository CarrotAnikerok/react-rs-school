import { useId } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import { submitFormSchema, type SubmitForm } from '../../schemas/submissions';
import { zodResolver } from '@hookform/resolvers/zod';
import type { Submission } from '../../../hooks/create';
import { getColoredStrength, toBase64 } from '../../utils/utils';
import CountryAutocomplete from '../../CountryAutocomplete/CountryAutocomplete';

type FormProps = {
  close: () => void;
  submit: (newSubmission: Submission) => void;
};

export default function ControlledForm({ close, submit }: FormProps) {
  const [
    nameId,
    ageId,
    emailId,
    genderId,
    imageId,
    termsId,
    passwordId,
    copyPasswordId,
    countryId,
  ] = [
    useId(),
    useId(),
    useId(),
    useId(),
    useId(),
    useId(),
    useId(),
    useId(),
    useId(),
  ];
  const {
    register,
    handleSubmit,
    formState: { isValid, errors, isSubmitting },
    control,
  } = useForm({
    defaultValues: {
      name: '',
      age: 20,
      gender: 'other',
    },
    resolver: zodResolver(submitFormSchema),
    mode: 'onChange',
  });

  async function submitForm(data: SubmitForm) {
    const base64picture = await toBase64(data.picture);
    const newData = { ...data, picture: base64picture };
    submit(newData);

    close();
  }

  const password = useWatch({ control, name: 'password' });

  return (
    <div>
      <form onSubmit={handleSubmit(submitForm)}>
        <label htmlFor={nameId}>
          Name
          <input id={nameId} {...register('name')} />
        </label>
        <p>{errors.name?.message}</p>

        <label htmlFor={ageId}>
          Age
          <input id={ageId} {...register('age')} type="number" />
        </label>
        <p>{errors.age?.message}</p>

        <label htmlFor={emailId}>
          Email
          <input id={emailId} {...register('email')} />
        </label>
        <p>{errors.email?.message}</p>

        <label htmlFor={genderId}>
          Gender
          <select id={genderId} {...register('gender')}>
            <option value="other">Other</option>
            <option value="female">Female</option>
            <option value="male">Male</option>
          </select>
        </label>
        <p>{errors.gender?.message}</p>

        <label htmlFor={passwordId}>
          Password
          <input id={passwordId} {...register('password')} />
        </label>
        {errors.password?.message && <p>{errors.password?.message}</p>}
        {password ? <p>Password is {getColoredStrength(password)}</p> : ''}

        <label htmlFor={copyPasswordId}>
          Confirm password
          <input id={copyPasswordId} {...register('copyPassword')} />
        </label>
        <p>{errors.copyPassword?.message}</p>

        <label htmlFor={countryId}>
          Country
          <input list="countries" id={countryId} {...register('country')} />
          <CountryAutocomplete></CountryAutocomplete>
        </label>
        <p>{errors.country?.message}</p>

        <label className="image-input" htmlFor={imageId}>
          Image
          <input
            id={imageId}
            {...register('picture')}
            type="file"
            accept="image/*"
          ></input>
        </label>
        <p>{errors.picture?.message}</p>

        <label className="checkbox-label" htmlFor={termsId}>
          Accept Terms and Conditions
          <input id={termsId} type="checkbox" {...register('terms')} />
        </label>
        <p>{errors.terms?.message}</p>

        <button
          type="submit"
          disabled={!isValid || isSubmitting}
          className="submit-button"
        >
          Submit
        </button>
      </form>
    </div>
  );
}
