import { render, screen } from '@testing-library/react';
import { CardList } from '../src/components/CardList/CardList';
import { cardListData } from './test-utils/mocks';
import userEvent from "@testing-library/user-event";


describe('CardList Component', () => {
    it('renders cards', () => {
        render(<CardList items={cardListData} isLoading={false} error=''/>);

        expect(screen.getByText(new RegExp(cardListData[0].name, 'i'))).toBeInTheDocument();
        expect(screen.getByText(new RegExp(cardListData[0].occupation, 'i'))).toBeInTheDocument();
        expect(screen.getAllByTestId('card-name').length).toBe(cardListData.length);
    });

    it('renders loading', () => {
        render(<CardList items={cardListData} isLoading={true} error=''/>);

        expect(screen.getByRole('generic', { name: /loader/i })).toBeInTheDocument();
    });

    it('hides loading', () => {
        render(<CardList items={cardListData} isLoading={false} error=''/>);

        expect(screen.queryByRole('generic', { name: /loader/i })).toBeNull();
    });

    it('renders error', () => {
        const error = 'I`m an error!';

        render(<CardList items={cardListData} isLoading={false} error={error}/>);

        expect(screen.getByText(new RegExp(error, 'i'))).toBeInTheDocument();
    });

    it('error button throws error', async () => {
        render(<CardList items={cardListData} isLoading={false} error=''/>);

        const button = screen.getByRole('button', {name: /Im an error button!/i});

        await expect(userEvent.click(button)).rejects.toThrow('mew im an error')
    });
});
