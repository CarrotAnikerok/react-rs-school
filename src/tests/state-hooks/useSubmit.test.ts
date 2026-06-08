import { useSubmit, type Submission } from "../../hooks/create";

describe('Zustand State Management (useSubmit)', () => {
  const mockSubmission: Submission = {
    name: 'John',
    age: 20,
    email: 'john@example.com',
    gender: 'male',
    picture: 'data:image/png;base64,mock',
    terms: true,
  };

  test('should return initial state correctly', () => {
    const submissions = useSubmit.getState().submissions;
    expect(submissions).toEqual([]);
  });

  test('should add new submission to the store', () => {
    useSubmit.getState().setSubmission(mockSubmission);

    const updatedSubmissions = useSubmit.getState().submissions;
    
    expect(updatedSubmissions).toHaveLength(1);
    expect(updatedSubmissions[0]).toEqual(mockSubmission);
  });

  test('should accumulate multiple submissions', () => {
    const store = useSubmit.getState();
    store.setSubmission(mockSubmission);
    store.setSubmission({ ...mockSubmission, name: 'Jane' });

    const result = useSubmit.getState().submissions;
    expect(result).toHaveLength(2);
    expect(result[0].name).toBe('John');
    expect(result[1].name).toBe('Jane');
  });
});