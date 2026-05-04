import { Component } from "react";
import { CardList } from "./components/CardList/CardList";
import { Search } from "./components/Search/Search";

export default class App extends Component {
    state = {
        list: [],
        isLoading: false,
        limit: 30
    }

    handleSearch = async (query: string = 'all') => {
        this.setState( { isLoading: true } )
        try {
            const response = await fetch(`https://ponyapi.net/v1/character/${query}?limit=${this.state.limit}`);
            const data = await response.json();
            this.setState( { list: data.data, isLoading: false } )
        } catch (e) {
            console.log('Data not found');
            this.setState( { list: [], isLoading: false } );
            throw e;
        }
    }

    render() {
        return <>
        <Search onSearch={this.handleSearch}></Search>
        <CardList items={this.state.list} isLoading={this.state.isLoading}></CardList>
    </>
    }
}
