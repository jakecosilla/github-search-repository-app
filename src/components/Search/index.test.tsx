import { render, fireEvent, screen } from '@testing-library/react';
import { Provider } from "react-redux";
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import Search from '.';

const mockStore = configureStore([thunk]);

describe('Search', () => {
    it('should display the results when a query is entered', async () => {
        const store = mockStore({
            results: {
                items: [
                    { name: 'Repository 1', description: 'Description 1', html_url: 'https://repo1.com' },
                    { name: 'Repository 2', description: 'Description 2', html_url: 'https://repo2.com' },
                ],
                total_count: 2,
            },
            loading: false,
            error: null,
            totalPages: 1,
        });

        store.dispatch = jest.fn();

       render(
            <Provider store={store}>
                <Search />
            </Provider>
        );

        const input = screen.getByPlaceholderText('🔎 Search for repositories');
        fireEvent.change(input, { target: { value: 'test' } });
        const repo1 = screen.getByText('Repository 1');
        const repo2 = screen.getByText('Repository 2');
        expect(repo1).toBeInTheDocument();
        expect(repo2).toBeInTheDocument();
    });

    it('should display an error message when an error occurs', async () => {
        const store = mockStore({
            results: null,
            loading: false,
            error: 'An error occurred',
            totalPages: 0,
        });

        store.dispatch = jest.fn();

        render(
            <Provider store={store}>
                <Search />
            </Provider>
        );

        const input = screen.getByPlaceholderText('🔎 Search for repositories');
        fireEvent.change(input, { target: { value: 'test' } });

        const error = screen.getByText('An error occurred');
        expect(error).toBeInTheDocument();
    });

    it('should display the loading spinner when loading', async () => {
        const store = mockStore({
            results: null,
            loading: true,
            error: null,
            totalPages: 0,
        });

        store.dispatch = jest.fn();

        render(
            <Provider store={store}>
                <Search />
            </Provider>
        );

        const input = screen.getByPlaceholderText('🔎 Search for repositories');
        fireEvent.change(input, { target: { value: 'test' } });

        const loader = screen.getByTestId('custom-loader');
        expect(loader).toBeInTheDocument();
    });
});
