import { Component, type ReactNode } from "react"
import "./CardList.css"
import { Card } from "../Card/Card"

type data = {
    id: number;
    name: string;
    occupation: string;
};

type CardListProps = {
    children?: ReactNode
    items: data[]
    isLoading: boolean
    error: string
}

type CardListState = {
    count: number
}

export class CardList extends Component<CardListProps, CardListState> {
    constructor(props: CardListProps) {
        super(props);
    }

    renderLoading = () => {
        return <div className="loader-wrapper">
                <div className="loader" aria-label="loader"></div>
            </div>
    }

    renderError = (errorMessage: string) => {
        return <div>
                <h3>Pony results!</h3>
                <div>{errorMessage}</div>
            </div>
    }

    throwError = () => {
        try {
            throw new Error('mew im an error')
        } catch(error) {
            this.setState(() => {throw error});
        }
    }
    
    render() {
        if (this.props.isLoading) {
            return this.renderLoading();
        }

        if (this.props.error) {
            return this.renderError(this.props.error);
        }

        return <div>
                    <h3>Pony results!</h3>
                    <div className="card_grid">
                        <div>Name</div>
                        <div>Description</div>
                        {this.props.items.map((element) => {
                            return <Card
                                key={element.id}
                                name={element.name}
                                description={element.occupation}
                            ></Card>
                        })}
                    </div>
                    <button className="errorButton" onClick={this.throwError}>Im an error button!</button>
                </div>

    }
}