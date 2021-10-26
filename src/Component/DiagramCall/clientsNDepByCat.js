import React, { Component } from 'react';
import Diagram from '../Diagram/StackedBarDiagram.js';
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

    groupClient(tab){

        //console.log(tab);
        var newTab = [];

        tab.forEach(element => {
            if (!newTab.includes(element.codecli))
                newTab[element.codecli] = [element.nom, element.prenom]
        })

        Object.entries(newTab).forEach(([key, value]) =>{
            value.push(this.getClientStuff(tab, key));
            console.log("push")
        })
        //console.log(newTab)

        return newTab;
    }

    getClientStuff(tab, clientId){
        var client = [];
        tab.forEach(element =>{
            if (element.codecli === clientId)
                client.push({"chiffre" : element.chiffre, "month" : element.m, "year" : element.y});
        })
        return client;
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
            .then(json => this.groupClient(json))

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
        console.log(this.state.data)
        //console.log(this.getCateg())
        return (
            <div>
                <Diagram data={this.state.data} xAxisNameFormat={true} sortData={true} title={"Clients ayant achétés dans la catégorie "+ this.getCateg()+", et leurs dépenses"}/>
            </div>
        ); 
    }
}

export default ChiffreCateg;

