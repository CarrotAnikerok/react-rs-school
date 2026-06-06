import { create } from 'zustand'

export type Submission = {
    name: string;
    age: number;
    email: string;
    gender: string;
    picture: string;
    terms: string;
}

type SubmitStoreState = {
    submissions: Submission[]
}

type SubmitStoreActions = {
    setSubmission: (newSubmission: Submission) => void
}

type SubmitStore = SubmitStoreState & SubmitStoreActions

export const useSubmit = create<SubmitStore>((set) => ({
    submissions: [],
    setSubmission: (submission) => set((state) => ({ submissions: [...state.submissions, submission] })),
}))