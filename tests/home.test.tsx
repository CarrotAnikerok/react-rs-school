import { screen, waitFor } from '@testing-library/react';
import { mockSearchData } from './test-utils/mocks';
import { Home } from '../src/Home/Home';
import { renderWithRouter } from './test-utils/utils';

describe('Home Component', () => {
  beforeAll(() => {
    vi.stubGlobal('fetch', vi.fn());
    localStorage.clear();
  });

  afterAll(() => {
    vi.unstubAllGlobals();
  });

  describe('State Management', () => {
    it('manages loading states during API calls', async () => {
      let resolveFetch: (value: Response) => void;
      const pendingPromise = new Promise<Response>((resolve) => {
        resolveFetch = resolve;
      });

      const fetchMock = vi.mocked(fetch);
      fetchMock.mockReturnValue(pendingPromise);

      renderWithRouter(<Home />);

      expect(
        screen.getByRole('generic', { name: /loader/i })
      ).toBeInTheDocument();

      resolveFetch!({
        ok: true,
        json: async () => ({ data: [] }),
      } as Response);

      expect(
        await screen.findByRole('generic', { name: /loader/i })
      ).not.toBeInTheDocument();
    });

    it('manage error state', () => {});
  });

  describe('API Integration', () => {
    it('call api with correct parameters', async () => {
      const fetchMock = vi.mocked(fetch);

      renderWithRouter(<Home />);

      await waitFor(() => {
        expect(fetchMock).toHaveBeenCalledWith(
          expect.stringContaining(`/character/all`)
        );
      });
    });

    it('handles successful API response', async () => {
      const fetchMock = vi.mocked(fetch);
      fetchMock.mockResolvedValue({
        ok: true,
        json: async () => ({ data: mockSearchData }),
      } as Response);

      renderWithRouter(<Home />);

      expect(
        await screen.findByText(new RegExp(mockSearchData[0].name, 'i'))
      ).toBeInTheDocument();
    });

    it('handles client error API response', async () => {
      const fetchMock = vi.mocked(fetch);

      fetchMock.mockResolvedValue({
        ok: false,
        status: 400,
      } as Response);

      renderWithRouter(<Home />);

      expect(
        await screen.findByText(/sorry, client error/i)
      ).toBeInTheDocument();
    });

    it('handles server error API response', async () => {
      const fetchMock = vi.mocked(fetch);

      fetchMock.mockResolvedValue({
        ok: false,
        status: 500,
      } as Response);

      renderWithRouter(<Home />);

      expect(
        await screen.findByText(/sorry, server error/i)
      ).toBeInTheDocument();
    });

    it('handles error API response', async () => {
      const fetchMock = vi.mocked(fetch);

      fetchMock.mockResolvedValue({
        ok: false,
        status: 300,
      } as Response);

      renderWithRouter(<Home />);

      expect(
        await screen.findByText(/sorry, some weird error has occurred/i)
      ).toBeInTheDocument();
    });

    it('handles error of access or network', async () => {
      const fetchMock = vi.mocked(fetch);

      fetchMock.mockRejectedValue(new Error('Failed to fetch'));

      renderWithRouter(<Home />);

      expect(
        await screen.findByText(/error of access or network/i)
      ).toBeInTheDocument();
    });
  });
});
