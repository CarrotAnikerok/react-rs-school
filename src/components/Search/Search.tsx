import { Component, type ChangeEvent, type ReactNode, type SubmitEvent } from "react";
import "./Search.css"

type SearchProps = {
    children?: ReactNode
    onSearch: (query?:string) => void;
}

type SearchState = {
    value: string
}

export class Search extends Component<SearchProps, SearchState> {
    constructor(props: SearchProps) {
        super(props);
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
        this.props.onSearch(this.state.value || 'all');
    }

    componentDidMount(): void {
        if (this.state.value) {
            this.props.onSearch(this.state.value);
        } else {
            this.props.onSearch();
        }
    }

    render() {
        return <form onSubmit={this.handleSubmit}>
            <label htmlFor="search">Search the pony!</label>
            <div className="input-group">
                <input id="search" type="search" placeholder="rarity" onChange={this.handleChange} defaultValue={this.state.value}></input>
                <button type="submit">Search</button>
            </div>
        </form>
    }

    
}