import React, { Component } from 'react';
import BarDiagram from './BarDiagram';

class TestDb extends Component{
    monthNames = ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Decembre"];
    constructor() {
        super();
        this.state = {
          data: [],
          dataLoaded: false
        };
    }

    updateWithMonth(tab){
        
        //console.log(tab)
        tab.forEach(element => {
            element.year = this.monthNames[element.mois] + " " + element.year;
        });
        return tab;
    }
     
    componentDidMount() {
        fetch('/getChiffrePerMonth')
            .then(res => res.json())
            .then(json => this.updateWithMonth(json))

            .then(json =>{
                this.setState({
                    data: json,
                    dataLoaded: true
                })
            }
        );
    }


    
    render() {
        return (
            <div>
                <BarDiagram data={this.state.data} />
            </div>
        ); 
    }
}

export default TestDb;