import React, { Component } from 'react'
import Header from '../components/Header/Header'
import Footer from '../components/Footer/Footer'

export default class Layout extends Component {

    render() {
        return (
            <>
                <Header is_logged_in ={false}/>
                <Footer />
            </>
        )
    }
}
