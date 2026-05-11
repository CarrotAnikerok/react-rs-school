import { render, screen } from '@testing-library/react';
import userEvent from "@testing-library/user-event";
import { ErrorBoundary } from '../src/components/ErrorBoundary/ErrorBoundary';
import { CardList } from '../src/components/CardList/CardList';
import { cardListData } from './test-utils/mocks';


describe('ErrorBoundary Component', () => {
    it('error button throws error', async () => {
        const fallback = 'Something went wrong with ponies';
        render(<ErrorBoundary fallback={<p className="errorMessage">{fallback}</p>}>
            <CardList items={cardListData} isLoading={false} error=''/>
        </ErrorBoundary>)

        const button = screen.getByRole('button', {name: /Im an error button!/i});
        await userEvent.click(button);

        expect(screen.getByText(new RegExp(fallback, 'i'))).toBeInTheDocument();
    });

    it.todo('logs error to console', async () => {
        const fallback = 'Something went wrong with ponies';
        render(<ErrorBoundary fallback={<p className="errorMessage">{fallback}</p>}>
            <CardList items={cardListData} isLoading={false} error=''/>
        </ErrorBoundary>)

        const button = screen.getByRole('button', {name: /Im an error button!/i});
        await userEvent.click(button);

        expect(screen.getByText(new RegExp(fallback, 'i'))).toBeInTheDocument();
    });
});
