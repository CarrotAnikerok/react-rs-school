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
}

type CardListState = {
    count: number
}

export class CardList extends Component<CardListProps, CardListState> {
    constructor(props: CardListProps) {
        super(props);
    }
    
    render() {
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
                </div>

    }
}