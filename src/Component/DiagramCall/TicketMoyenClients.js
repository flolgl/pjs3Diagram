import React, { Component } from 'react';
import BarDiagram from '../Diagram/BarDiagram.js';

class TicketMoyenClients extends Component{
    constructor() {
        super();
        this.state = {
          data: [],
          dataLoaded: false
        };
    }
    

    updateWithMonth(tab){
        
        //console.log(tab)

        return tab;
    }
     
    componentDidMount() {
        fetch('/api/getTicketMoyenClients')
            .then(res => res.json())

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
                <BarDiagram data={this.state.data} title="Prix ticket moyen par client" xAxisNameFormat= {true} sortData={false}/>
            </div>
        ); 
    }
}

export default TicketMoyenClients;