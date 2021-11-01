import React, { Component } from 'react';
import BarDiagram from '../Diagram/BarDiagram.js';

class TicketMoyenMois extends Component{
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
        fetch('/api/getTicketMoyenPerMonth')
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
                <BarDiagram data={this.state.data} addLine={true} title="Prix mensuel moyen du ticket "/>
                <p style={{backgroundColor: "#e0e0e0", padding: 0.5 + "em"}} class="highcharts-description">
                    Ce diagramme permet de visualiser l'évolution du ticket moyen mensuel. Le plus gros ticket moyen est atteint pour le mois d'Août. Pour autant, le plus gros chiffre d'affaire n'est pas atteinte au mois d'Août
                    mais au mois d'Août.
                    Enfin, nous observons la plus importante augmentation du ticket moyen mensuel entre Juin et Juillet. En effet, le ticket moyen a été multiplié par 2.22 pendant cette période.
                </p>
            </div>
        ); 
    }
}

export default TicketMoyenMois;