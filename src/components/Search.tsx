import { Component, type ChangeEvent, type ReactNode } from "react";

type SearchProps = {
    children?: ReactNode
}

type SearchState = {
    value: string
}

export class Search extends Component<SearchProps, SearchState> {
    constructor(props: SearchProps) {
        super(props);
        console.log('constructor set!');
        this.state = {
            value: localStorage.getItem('searchValue') || '',
        }
    }

    handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        localStorage.setItem('searchValue', event.target.value);
    }

    render() {
        console.log('render!');
        return <form action="/search-results" method="GET">
            <label>Search the pokemon!</label>
            <input type="search" placeholder="ditto" onChange={this.handleChange} defaultValue={this.state.value}></input>
            <button type="submit">Search</button>
        </form>
    }
}