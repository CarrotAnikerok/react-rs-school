import { act, screen, waitFor } from '@testing-library/react';
import { mockSearchData } from './test-utils/mocks';
import { Home } from '../src/components/Home/Home';
import { renderWithReduxAndRouter } from './test-utils/utils';
import * as ponyApiModule from '../src/services/pony';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router';

const useGetItemListQuerySpy = vi.spyOn(ponyApiModule, 'useGetItemListQuery');
type FullHookResult = ReturnType<typeof ponyApiModule.useGetItemListQuery>;
type GetItemListQueryResult = Partial<FullHookResult>;

describe('Home Component', () => {
  beforeEach(() => {
    vi.resetAllMocks();
    localStorage.clear();
  });

  describe('API Integration', () => {
    it('call api with correct parameters', async () => {
      useGetItemListQuerySpy.mockReturnValue({
        data: [],
        isLoading: false,
        isFetching: false,
      } as Partial<GetItemListQueryResult> as FullHookResult);

      renderWithReduxAndRouter(<Home />);

      expect(useGetItemListQuerySpy).toHaveBeenCalledWith(
        expect.objectContaining({ query: 'all' })
      );
    });

    it('handles successful API response', async () => {
      useGetItemListQuerySpy.mockReturnValue({
        data: { data: mockSearchData }, 
        error: undefined,
        isLoading: false,
        isFetching: false,
      } as Partial<GetItemListQueryResult> as FullHookResult);

      renderWithReduxAndRouter(<Home />);

      await waitFor(() => {
        expect(
          screen.getByText(new RegExp(mockSearchData[0].name, 'i'))
        ).toBeInTheDocument();
      });
    });

    it('handles client error API response', async () => {
      useGetItemListQuerySpy.mockReturnValue({
        data: undefined,
        error: { status: 400, data: {} },
        isLoading: false,
        isFetching: false,
      } as Partial<GetItemListQueryResult> as FullHookResult);

      renderWithReduxAndRouter(<Home />);

      expect(
        await screen.findByText(/sorry, client error/i)
      ).toBeInTheDocument();
    });

    it('handles server error API response', async () => {
      useGetItemListQuerySpy.mockReturnValue({
        data: undefined,
        error: { status: 500, data: {} },
        isLoading: false,
        isFetching: false,
      } as Partial<GetItemListQueryResult> as FullHookResult);

      renderWithReduxAndRouter(<Home />);

      expect(
        await screen.findByText(/sorry, server error/i)
      ).toBeInTheDocument();
    });

    it('handles error API response', async () => {
      useGetItemListQuerySpy.mockReturnValue({
        data: undefined,
        error: { status: 300, data: {} },
        isLoading: false,
        isFetching: false,
      } as Partial<GetItemListQueryResult> as FullHookResult);

      renderWithReduxAndRouter(<Home />);

      expect(
        await screen.findByText(/sorry, some weird error has occurred/i)
      ).toBeInTheDocument();
    });

    it('handles error of access or network', async () => {
      useGetItemListQuerySpy.mockReturnValue({
        data: undefined,
        error: { status: 'FETCH_ERROR', error: 'Failed to fetch' },
        isLoading: false,
        isFetching: false,
      } as Partial<GetItemListQueryResult> as FullHookResult);

      renderWithReduxAndRouter(<Home />);

      expect(
        await screen.findByText(/no internet connection/i)
      ).toBeInTheDocument();
    });
  });
});
