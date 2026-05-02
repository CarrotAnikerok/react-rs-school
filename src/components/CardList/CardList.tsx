import { Component, type ReactNode } from "react"
import "./CardList.css"
import { Card } from "../Card/Card"

type CardListProps = {
    children?: ReactNode
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
                    <h3>Pokemon results!</h3>
                    <div className="card_grid">
                        <div>Name</div>
                        <div>Description</div>
                        <Card></Card>
                        <Card></Card>
                    </div>
                </div>

    }
}