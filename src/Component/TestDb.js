import React, { Component } from 'react';

class TestDb extends Component{
    constructor() {
        super();
        this.state = 
        {
          allwatches : []
        };
    }
    
    componentDidMount() {
        fetch('/getWatchesList')
            .then(res => res.json())
            .then(allwatches_ => this.setState({allwatches: allwatches_}, () => console.log("successfully fetched allwatches", allwatches_)))
    }

    render() {
        return (
            <div>
            { 
                this.state.allwatches.map(
                    (product) => {
                    return <p>{product.Nomcat}</p>
                })
            } 
            </div>
        ); 
    }
}

export default TestDb;