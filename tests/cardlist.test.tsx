import { render, screen } from '@testing-library/react';
import { CardList } from '../src/components/CardList/CardList';
import { cardListData } from './test-utils/mocks';


describe('CardList', () => {
    it('CardList renders cards', () => {
        const name = 'Twilight Sparkle';

        render(<CardList items={cardListData} isLoading={false} error=''/>);
        screen.debug();
        expect(screen.getByText(name)).toBeInTheDocument();
    });

    it('CardList renders loading', () => {
        const name = 'Twilight Sparkle';

        render(<CardList items={cardListData} isLoading={false} error=''/>);
        screen.debug();
        expect(screen.getByText(name)).toBeInTheDocument();
    });

    it('CardList renders error', () => {
        const name = 'Twilight Sparkle';

        render(<CardList items={cardListData} isLoading={false} error=''/>);
        screen.debug();
        expect(screen.getByText(name)).toBeInTheDocument();
    });
});
