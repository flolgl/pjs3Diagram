import React, { Component } from 'react';
import BarDiagram from '../Diagram/BarDiagram.js';
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
            //.then(json => this.updateWithMonth(json))

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
                <BarDiagram data={this.state.data} title={"Chiffre mensuel de la catégorie " + this.getCateg()}/>
            </div>
        ); 
    }
}

export default ChiffreCateg;