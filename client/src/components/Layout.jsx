import React, { Component } from 'react'
import Header from "../components/Header/Header";

export default class Layout extends Component {
    render() {
        return (
            <>
                <Header />
                {this.props.children}
            </>
        );
    }
}
