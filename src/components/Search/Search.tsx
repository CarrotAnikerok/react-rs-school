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

    handleSubmit = (event: SubmitEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const value = formData.get('query')?.toString() || '';
        this.setState({ value: value });
    }

    componentDidMount(): void {
        if (this.state.value) {
            this.props.onSearch(this.state.value);
        } else {
            this.props.onSearch();
        }
    }

    componentDidUpdate(_prevProps: Readonly<SearchProps>, prevState: Readonly<SearchState>): void {
        if (this.state.value !== prevState.value) {
            const trimmedValue = this.state.value.trim();
            this.props.onSearch(trimmedValue || 'all');
            localStorage.setItem('searchValue', trimmedValue);
        }
    }

    render() {
        return <form onSubmit={this.handleSubmit}>
            <label htmlFor="search">Search the pony!</label>
            <div className="input-group">
                <input id="search" name="query" type="search" placeholder="rarity" defaultValue={this.state.value}></input>
                <button type="submit">Search</button>
            </div>
        </form>
    }

    
}