import { render, screen, waitFor } from "@testing-library/react";
import ControlledForm from "../components/Forms/ControlledForm/ControlledForm";
import userEvent from "@testing-library/user-event";

vi.mock('../components/utils/utils', async(importOriginal) => {
    const mod = await importOriginal<typeof import('../components/utils/utils')>();
    return {
        ...mod,
        toBase64: vi.fn().mockResolvedValue('data:image/png;base64,mocked_base64_string')
    }
}) 

describe('Controlled Form Component', () => {
    const mockClose = vi.fn();
    const mockSubmit = vi.fn();

    beforeEach(() => {
        vi.clearAllMocks();
    })

    it('renders form fields and disabled button', () => {
        render(<ControlledForm close={mockClose} submit={mockSubmit}></ControlledForm>)

        expect(screen.getByLabelText(/^name/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/^age/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/^email/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/^gender/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/^password/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/^confirm password/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/^country/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/^image/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/^accept terms and conditions/i)).toBeInTheDocument();

        expect(screen.getByRole('button', { name: /submit/i})).toBeDisabled();
    });

    describe('Validate fields', () => {
        it ('validate name', async () => {
            const user = userEvent.setup();
            render(<ControlledForm close={mockClose} submit={mockSubmit}></ControlledForm>)

            const nameInput = screen.getByLabelText(/^name/i);

            await user.type(nameInput, 'a');
            await screen.findByText(/should start with uppercase/i);

            await user.clear(nameInput);
            await screen.findByText(/field required/i);
        })

        it ('validate age', async () => {
            const user = userEvent.setup();
            render(<ControlledForm close={mockClose} submit={mockSubmit}></ControlledForm>)

            const ageInput = screen.getByLabelText(/^age/i);
            await user.type(ageInput, '-21');
            await screen.findByText(/should be positive/i);
        });

        it ('validate email', async () => {
            const user = userEvent.setup();
            render(<ControlledForm close={mockClose} submit={mockSubmit}></ControlledForm>)

            const emailInput = screen.getByLabelText(/^email/i);
            await user.type(emailInput, 'wal@com');
            await screen.findByText(/email is wrong/i);

            await user.clear(emailInput);
            await screen.findByText(/field required/i);
        });

        it ('validate password strength', async () => {
            const user = userEvent.setup();
            render(<ControlledForm close={mockClose} submit={mockSubmit}></ControlledForm>)

            const passwordInput = screen.getByLabelText(/^password/i);
            await user.type(passwordInput, 'm');
            await screen.findByText(/password is very bad/i);

            await user.type(passwordInput, 'mM');
            await screen.findByText(/password is bad/i);

            await user.type(passwordInput, 'mM2');
            await screen.findByText(/password is good/i);

            await user.type(passwordInput, 'mM2!');
            await screen.findByText(/password is perfect/i);
        });

        it ('validate password', async () => {
            const user = userEvent.setup();
            render(<ControlledForm close={mockClose} submit={mockSubmit}></ControlledForm>)

            const passwordInput = screen.getByLabelText(/^password/i);
            await user.type(passwordInput, 'm');
            await user.clear(passwordInput);
            await screen.findByText(/field required/i);
        });

        it ('validate confirm password', async () => {
            const user = userEvent.setup();
            render(<ControlledForm close={mockClose} submit={mockSubmit}></ControlledForm>)

            const passwordInput = screen.getByLabelText(/^password/i);
            const confirmPasswordInput = screen.getByLabelText(/^confirm password/i)

            await user.type(passwordInput, 'mM2!');
            await user.type(confirmPasswordInput, 'mM2!!');

            await screen.findByText(/confirm password is not the same as password/i);

            await user.clear(passwordInput);
            await screen.findByText(/field required/i);
        });

        it ('validate accept terms and conditions', async () => {
            const user = userEvent.setup();
            render(<ControlledForm close={mockClose} submit={mockSubmit}></ControlledForm>)

            const acceptCheckbox = screen.getByLabelText(/^accept terms and conditions/i);
            await user.click(acceptCheckbox);
            await user.click(acceptCheckbox);
            await screen.findByText(/should be checked/i);
        });
    })

    it ('submit', async () => {
        const user = userEvent.setup();
        render(<ControlledForm close={mockClose} submit={mockSubmit}></ControlledForm>)

        await user.type(screen.getByLabelText(/^name/i), 'John');
        await user.type(screen.getByLabelText(/^email/i), 'john@example.com');
        await user.type(screen.getByLabelText(/^password/i), 'Password123!');
        await user.type(screen.getByLabelText(/^confirm password/i), 'Password123!');
        await user.type(screen.getByLabelText(/^country/i), 'USA');
        await user.click(screen.getByLabelText(/^accept terms and conditions/i));

        const file = new File(['hello'], 'hello.png', { type: 'image/png' });
        const fileInput = screen.getByLabelText(/^image/i);
        await user.upload(fileInput, file);

        const submitButton = screen.getByRole('button', { name: /submit/i });

        await waitFor(() => {
            expect(submitButton).not.toBeDisabled();
        });

        await user.click(submitButton);

        await waitFor(() => {
            expect(mockSubmit).toHaveBeenCalledTimes(1);
            expect(mockClose).toHaveBeenCalledTimes(1);
        });

        expect(mockSubmit).toHaveBeenCalledWith(
        expect.objectContaining({
            name: 'John',
            age: 20,
            email: 'john@example.com',
            picture: 'data:image/png;base64,mocked_base64_string',
            terms: true,
        })
        );
    })
})
