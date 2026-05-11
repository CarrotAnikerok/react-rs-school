import { Component } from 'react';
import { CardList } from './components/CardList/CardList';
import { Search } from './components/Search/Search';
import { ErrorBoundary } from './components/ErrorBoundary/ErrorBoundary';

export default class App extends Component {
  state = {
    list: [],
    isLoading: false,
    error: '',
    limit: 30,
  };

  handleSearch = async (query: string = 'all') => {
    this.setState({ isLoading: true });
    try {
      const response = await fetch(
        `https://ponyapi.net/v1/character/${query}?limit=${this.state.limit}`
      );
      if (!response.ok) {
        this.setState({
          list: [],
          isLoading: false,
          error: this.getErrorMessage(response.status),
        });
        return;
      }

      const data = await response.json();
      this.setState({ list: data.data, isLoading: false, error: '' });
    } catch (e) {
      this.setState({
        list: [],
        isLoading: false,
        error: 'Ошибка доступа или сети :(',
      });
    }
  };

  getErrorMessage(status: number) {
    if (status / 100 === 5) {
      return `Sorry, server error :( ${status}`;
    } else if (status / 100 === 4) {
      return `Sorry, client error :( ${status})`;
    }

    return `Sorry, some weird error has occurred :( ${status})`;
  }

  render() {
    return (
      <>
        <Search onSearch={this.handleSearch}></Search>
        <ErrorBoundary
          fallback={
            <p className="errorMessage">Something went wrong with ponies :(</p>
          }
        >
          <CardList
            items={this.state.list}
            isLoading={this.state.isLoading}
            error={this.state.error}
          ></CardList>
        </ErrorBoundary>
      </>
    );
  }
}
