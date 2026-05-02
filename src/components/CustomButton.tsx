import React, { type ReactNode } from "react";

type CustomButtonProps = {
    children?: ReactNode
}

type CustomButtonState = {
    count: number
}

export class CustomButton extends React.Component<CustomButtonProps, CustomButtonState> {
    constructor(props: CustomButtonProps) {
        super(props);
        this.state = {
            count: 0
        }
    }

    onClickBtn = () => {
        this.setState({
            count: this.state.count + 1,
        })
    }

    render = () => {
        return <button onClick={this.onClickBtn}>custom button {this.state.count}</button>
    }
}