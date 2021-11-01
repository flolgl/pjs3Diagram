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
        fetch('/api/getChiffrePerMonth')
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
                <p style={{backgroundColor: "#e0e0e0", padding: 0.5 + "em"}} class="highcharts-description">
                    Ce diagramme permet de visualiser l'évolution du chiffre d'affaire mensuel. Le plus gros chiffre d'affaire en atteint pour le mois de Juillet.
                    Enfin, nous observons la plus importante augmentation du chiffre d'affaire mensuel entre Juin et Juillet. En effet, le chiffre d'affaire a été multiplié par 2.79.
                </p>
                {/* <BarDiagram data={this.state.data} title="Chiffre d'affaire mensuel"/> */}
            </div>
        ); 
    }
}

export default ChiffreMois;