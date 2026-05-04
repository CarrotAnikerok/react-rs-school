import { Component, type ReactNode, type SubmitEvent } from "react";
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
        this.setState({ value: value.trim()});
    }

    componentDidMount(): void {
        if (this.state.value) {
            this.props.onSearch(this.state.value.replaceAll(' ', '_'));
        } else {
            this.props.onSearch();
        }
    }

    componentDidUpdate(_prevProps: Readonly<SearchProps>, prevState: Readonly<SearchState>): void {
        if (this.state.value !== prevState.value) {
            this.props.onSearch(this.state.value.replaceAll(' ', '_') || 'all');
            localStorage.setItem('searchValue', this.state.value);
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