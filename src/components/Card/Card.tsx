import { Component, type ReactNode } from "react"
import "./Card.css";

type CardProps = {
    children?: ReactNode
}

type CardState = {
    count: number
}

export class Card extends Component<CardProps, CardState> {
    constructor(props: CardProps) {
        super(props);
    }
    
    render() {
        return <div className="card">
            <div>
                Ditto
            </div>
            <div>
                Ditto description
            </div>
        </div>
    }
}