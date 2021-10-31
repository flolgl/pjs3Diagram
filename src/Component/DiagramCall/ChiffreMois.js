import React, { Component } from 'react';
import ChartHighstock from "../Diagram/BarDiagram"


class ChiffreMois extends Component{
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
                <ChartHighstock data={this.state.data} title="Chiffre d'affaire mensuel" addLine={true}/>
                {/* <BarDiagram data={this.state.data} title="Chiffre d'affaire mensuel"/> */}
            </div>
        ); 
    }
}

export default ChiffreMois;