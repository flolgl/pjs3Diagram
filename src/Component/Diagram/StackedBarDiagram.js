
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Highcharts from 'highcharts';
import HC_more from 'highcharts/highcharts-more';
HC_more(Highcharts);

class BarDiagramBis extends Component {
	
	componentDidMount() {
		this.createChart();
	}

	componentDidUpdate() {
        this.createChart();
    }

	createChart() {
        //console.log(this.props.data)
        const moisNames = ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Decembre']


        function roundOf(n, p) {
            const n1 = n * Math.pow(10, p + 1);
            const n2 = Math.floor(n1 / 10);
            if (n1 >= (n2 * 10 + 5)) {
                return (n2 + 1) / Math.pow(10, p);
            }
            return n2 / Math.pow(10, p);
        }

        var formatData = []
        let formatName = []
        var compteur = 0;
        var color = [
            "#fcba03", "#03f0fc", "#f803fc"
        ]
        let categ = this.props.categ

        Object.entries(this.props.data).forEach(([key, value]) =>{
            var e = [{}]
            var chiffre = 0
            Object.entries(value[2]).forEach(([i, valeur]) =>{
                e[i]={"x" : compteur, "name" : moisNames[valeur.month] + " " + valeur.year, "high" : roundOf(chiffre+valeur.chiffre,2), "low" : chiffre, color:color[i], stack: 'male'}
                chiffre += roundOf(valeur.chiffre,2);

            })
            formatName[key] = [value[0], value[1], key, chiffre]
            formatData.push({"data" : e})
            compteur++;
        })
        // console.log("format data")
        // console.log(JSON.stringify(formatData))
        // console.log(formatData)

        //if (this.props.sortData)
            //formatData.sort((a,b) => a - b)





        // console.log("names:")
        // console.log(formatName)

        // console.log("data : ")
        // console.log(Object.keys(this.props.data))

        Highcharts.chart('container', {

            chart: {
                type: 'columnrange',
                zoomType: 'xy'
            },
        
            legend: {
                enabled: false
            },

            title: {
                text: this.props.title
            },


            xAxis: {
                min:0,
                categories: Object.keys(this.props.data),
                max: Object.keys(this.props.data).length-1
            },
        
            yAxis: {
                allowDecimals: false,
                min: 0,
                title: {
                    text: "Chiffre d'afffaire en €"
                }
            },
            
            tooltip: {
                valueDecimals: 2,
                valueSuffix: '€',
                formatter: function () {
                    //console.log(this.point)
                    return "<b>Client : </b>" + formatName[this.x][0] + " " + formatName[this.x][1] + " | " + formatName[this.x][2] + "<br>"+
                    "<b>Chiffre d'affaire sur le mois pour la catégorie "+categ+" : </b>" + roundOf(parseFloat(this.point.high-this.point.low),2) + "€<br>" +
                    "<b>Date : </b>" + this.point.name + "<br>" +
                    "<b>Total chiffre d'affaire pour la catégorie "+categ+" : </b>" + roundOf(formatName[this.x][3],2) + "€"
                }
            },
        
            /*
            tooltip: {
                formatter: function () {
                    return '<b>' + this.x + '</b><br/>' +
                        this.series.name + ': ' + this.y + '<br/>' +
                        'Total: ' + this.point.stackTotal;
                }
            },
            */
        
            plotOptions: {
                column: {
                    stacking: 'normal'
                },
                series: {
        	        grouping: false,
                }
            },
        
            series: formatData
        });
        

	}

	render() {
		return (
			<div id='container'>Highstock</div>
		);
	}
}

BarDiagramBis.propTypes = {
	data: PropTypes.array,
    title: PropTypes.string
};

export default BarDiagramBis;

