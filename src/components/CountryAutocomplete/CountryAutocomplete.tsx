import { useCountry } from '../../hooks/create';

export default function CountryAutocomplete() {
  const { countries } = useCountry();

  return (
    <datalist id="countries">
      {countries.map((country, index) => {
        return <option key={index} value={country}></option>;
      })}
      ;
    </datalist>
  );
}
