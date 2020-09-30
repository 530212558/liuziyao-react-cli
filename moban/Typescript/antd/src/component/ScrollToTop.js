import React, { Component } from 'react';
import { Route, withRouter } from 'react-router-dom';
class ScrollToTop extends Component {
    componentDidUpdate(prevProps) {
        if (this.props.location !== prevProps.location) {
            window.scrollTo(0, 0)
        }
        // console.log( this.props )
    }
    render() {
        return this.props.children
    }
}

export default withRouter(ScrollToTop);