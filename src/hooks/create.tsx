import { create } from 'zustand'
import type { Submission } from '../components/schemas/submissions'

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