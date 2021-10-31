
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import * as Highcharts from 'highcharts/highstock';

class BarDiagramBis extends Component {
	
	componentDidMount() {
		this.createChart();
	}

	componentDidUpdate() {
        this.createChart();
    }

	createChart() {
		let formatData = [];
		formatData = this.props.data.map(obj => {
            //console.log(obj["time"])

			return [obj['chiffre']];
		})

        if (this.props.sortData)
            formatData.sort((a,b) => a - b)

		let formatMonth = [];
        const moisNames = ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Decembre']
		formatMonth = this.props.data.map(obj => {
			return moisNames[obj.time] +  " " + obj.y;
		})


        console.log(this.props.data);
        let formatName = [];
        formatName = this.props.data.map(obj => {
            //console.log("hre")

			return obj.nom + " " + obj.prenom + " | " + obj.codecli;
		})


        Highcharts.chart('container', {
            chart: {
                alignTicks: false
            },
    
            rangeSelector: {
                selected: 1
            },
    
            title: {
                text: this.props.title
            },

            xAxis: {
                categories: this.props.xAxisNameFormat ? formatName : formatMonth,
                labels: {
                    enabled: this.props.data.length <= 20
                }
            },

            tooltip: {
                valueDecimals: 2,
                valueSuffix: '€'
                
            },
            
    
            series: [{
                type: 'column',
                name: this.props.title,
                data: formatData,
            }]
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