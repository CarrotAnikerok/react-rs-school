import { Component, type ChangeEvent, type ReactNode, type SubmitEvent } from "react";

type SearchProps = {
    children?: ReactNode
    onSearch: (query:string) => void;
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
        this.setState({value: event.target.value});
        localStorage.setItem('searchValue', event.target.value);
    }

    handleSubmit = (event: SubmitEvent<HTMLFormElement>) => {
        event.preventDefault();
        this.props.onSearch(this.state.value)
    }

    render() {
        console.log('render!');
        return <form onSubmit={this.handleSubmit}>
            <label>Search the pony!</label>
            <input type="search" placeholder="ditto" onChange={this.handleChange} defaultValue={this.state.value}></input>
            <button type="submit">Search</button>
        </form>
    }

    
}