import { create } from 'zustand';

export type Submission = {
  name: string;
  age: number;
  email: string;
  gender: string;
  picture: string;
  terms: boolean;
};

type SubmitStoreState = {
  submissions: Submission[];
};

type SubmitStoreActions = {
  setSubmission: (newSubmission: Submission) => void;
};

type SubmitStore = SubmitStoreState & SubmitStoreActions;

export const useSubmit = create<SubmitStore>((set) => ({
  submissions: [],
  setSubmission: (submission) =>
    set((state) => ({ submissions: [...state.submissions, submission] })),
}));

type CountryStoreState = {
  countries: string[];
};

type CountryStoreActions = {
  setCountry: (newCountry: string) => void;
  setCountries: (countries: string[]) => void;
};

type CountryStore = CountryStoreState & CountryStoreActions;

export const useCountry = create<CountryStore>((set) => ({
  countries: [
    "Australia", "Austria", "Belarus", "Brazil", "Canada", 
    "China", "France", "Germany", "India", "Italy", 
    "Japan", "Kazakhstan", "Russia", "Spain", "United Kingdom", 
    "United States"
  ],
  setCountry: (country) =>
    set((state) => ({ countries: [...state.countries, country] })),
  setCountries: (countryList) =>
    set((state) => ({ countries: [...state.countries, ...countryList] })),
  }
));
