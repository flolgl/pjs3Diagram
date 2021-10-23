
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import * as Highcharts from 'highcharts/highstock';

class ChartHighstock extends Component {
	
	componentDidMount() {
		this.createChart();
	}

	componentDidUpdate() {
        this.createChart();
    }
    

	createChart() {
		let formatData = [];
        const moisNames = ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Decembre']
		formatData = this.props.data.map(obj => {
            //console.log(obj["time"])
			return [obj['chiffre']];
		})

        if (this.props.sortData)
            formatData.sort((a,b) => a - b)

		let formatMonth = [];
		formatMonth = this.props.data.map(obj => {
            console.log("here")
			return moisNames[obj.time] +  " " + obj.y;
		})

		let formatName = [];
        formatName = this.props.data.map(obj => {
            console.log("hre")

			return obj.nom + " " + obj.prenom + " | " + obj.codecli;
		})
        

		Highcharts.chart('chart', {
            rangeSelector: {
                selected: 1
            },


            title: {
                text: this.props.title
            },

            tooltip: {
                valueDecimals: 2,
                valueSuffix: '€'
            },
            xAxis: {
                categories: this.props.xAxisNameFormat ? formatName : formatMonth,
                labels: {
                    enabled: this.props.data.length <= 20
                }
            },
            
            series: [{
                name: this.props.title,
                data: formatData,
                tooltip: {
                    valueDecimals: 2
                }
            }]
            
        });

	}

	render() {
		return (
			<div id='chart'>Highstock</div>
		);
	}
}

ChartHighstock.propTypes = {
	data: PropTypes.array,
  title: PropTypes.string
};

export default ChartHighstock;