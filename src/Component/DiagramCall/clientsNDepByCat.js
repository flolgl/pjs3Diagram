import React, { Component } from 'react';
import Diagram from '../Diagram/LineDiagram.js';
import qs from 'query-string';


class ChiffreCateg extends Component{
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
        fetch('/getClientsAndDepensesByCateg?categ='+this.getCateg())
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
                <Diagram data={this.state.data} xAxisNameFormat={true} sortData={true} title={"Clients ayant achétés dans la catégorie "+ this.getCateg()+", et leurs dépenses"}/>
            </div>
        ); 
    }
}

export default ChiffreCateg;