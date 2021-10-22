import React, { Component } from 'react';
import BarDiagram from './BarDiagram.js';
import qs from 'query-string';


class ChiffreCateg extends Component{
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

    getCateg(){
        //console.log(value.categ);
        const categ = qs.parse(this.props.location.search).categ;
        //console.log(categ)
        return categ == null || categ === "" ? "bio" : categ;
    }

    componentDidMount() {
        fetch('/getChiffreCateg?categ='+this.getCateg())
            .then(res => res.json())
            .then(json => this.updateWithMonth(json))

            .then(json =>{
                this.setState({
                    data: json,
                    dataLoaded: true
                })
            })
        ;
    }



    
    render() {
        if(!this.state.dataLoaded)
            return(
                <div className="">Loading...</div>
            )

        //console.log(this.getCateg())
        return (
            <div>
                <h3>{this.getCateg()}</h3>
                <BarDiagram data={this.state.data} echelle={100}/>
            </div>
        ); 
    }
}

export default ChiffreCateg;