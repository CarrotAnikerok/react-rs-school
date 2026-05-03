import { Component, type ReactNode } from "react"
import "./Card.css";

type CardProps = {
    children?: ReactNode
    name: string,
    description: string,
}

type CardState = {
    count: number
}

export class Card extends Component<CardProps, CardState> {
    constructor(props: CardProps) {
        super(props);
    }
    
    render() {
        return <>
        <div> {this.props.name} </div>
        <div>{this.props.description}</div>
        </>
    }
}