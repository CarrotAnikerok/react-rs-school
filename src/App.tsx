import { Component } from "react";
import { CardList } from "./components/CardList/CardList";
import { Search } from "./components/Search/Search";

export default class App extends Component {
    state = {
        list: [],
        isLoading: false
    }

    handleSearch = async (query: string) => {
        this.state.isLoading = true;
        try {
            console.log('search!');
            const response = await fetch(`https://ponyapi.net/v1/character/${query}`);
            const data = await response.json();
            console.log(data);
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
        <CardList items={this.state.list}></CardList>
    </>
    }
}
