import React, { Component } from 'react';

class TestDb extends Component{
    constructor() {
        super();
        this.state = {
          data: [],
          dataLoaded: false
        };
    }
    
    componentDidMount() {
        fetch('/getChiffrePerMonth')
            .then(res => res.json())
            .then(json =>{
                this.setState({
                    data: json,
                    dataLoaded: true
                })
            }
        )
    }

    render() {
        return (
            <div>
            { 
                this.state.data.map(
                    (product) => {
                    return <p>Mois : {product.mois} Prix : {product.totalPrix}</p>
                })
            } 
            </div>
        ); 
    }
}

export default TestDb;