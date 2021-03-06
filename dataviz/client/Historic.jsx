
var roundOneDecimal = function(number) {
    if(number != undefined) {
        return Math.round( number * 10 ) / 10;    
    }
    return 0;
    
};

Historic = React.createClass({

    getInitialState: function() {
        return {
            avg: {
                "temp": 0, 
                "wind": 0, 
                "rain": 0
            },
            max: {
                "temp": 0, 
                "wind": 0,
                "rain": 0
            },
            min: {
                "temp": 0,
                "wind": 0,
                "rain": 0
            }
        };

    },

    componentWillReceiveProps : function(nextProps) {
        var result = Weather.find({"city.name": nextProps.city}).fetch();

        if(result.length > 0) {
            this.setState({
                avg: {
                    "temp": roundOneDecimal(result[0].stats.avg_temp_last5d), 
                    "wind": roundOneDecimal(result[0].stats.avg_wind_last5d),
                    "rain": roundOneDecimal(result[0].stats.avg_rain_last5d),
                },
                max: {
                    "temp": roundOneDecimal(result[0].stats.max_temp),
                    "wind": roundOneDecimal(result[0].stats.max_wind),
                    "rain": roundOneDecimal(result[0].stats.max_rain),
                },
                min: {
                    "temp": roundOneDecimal(result[0].stats.min_temp),
                    "wind": roundOneDecimal(result[0].stats.min_wind),
                    "rain": roundOneDecimal(result[0].stats.min_rain),
                }
            });
        }
    },

    render: function(){
        return (
            <div className="historic-body">
                <div className="container center-align">
                    <h2 id="statistiques">Statistiques</h2>
                    <div className="row">

                        <div className="col s12 m6 offset-m3 offset-l3">
                            <ul  className="tabs">
                                <li  className="tab col s6">
                                    <a className="active" href="#moyennes">Moyennes
                                    </a>
                                </li>
                                <li  className="tab col s6">
                                    <a className="" href="#records">Records</a>
                                </li>
                                <div className="indicator"></div>
                            </ul>
                        </div>

                        <div id="moyennes" className="col s12">
                            <div className="row">
                                <div className="col m4">
                                    <BasicCard  color={"red"} unit = {"°C"} value = { this.state.avg.temp } title = {"Températures"}/>
                                </div>
                                <div className="col m4">
                                    <BasicCard  color={"green"} unit = {"km/h"} value = { this.state.avg.wind } title = {"Vent"}/>
                                </div>
                                <div className="col m4">
                                    <BasicCard  color={"blue"} unit = {"mm"} value = { this.state.avg.rain } title = {"Précipitations"}/>
                                </div>
                            </div>
                        </div>
                        <div id="records" className="col s12">
                            <div className="row">
                                <div className="col m4">
                                    <MaxMinCard color={"red"} unit = {"°C"} max = { this.state.max.temp } min={ this.state.min.temp } title = {"Températures"}/>
                                </div>
                                <div className="col m4">
                                    <MaxMinCard color={"green"} unit = {"km/h"} max = { this.state.max.wind } min={ this.state.min.wind } title = {"Vent"}/>
                                </div>
                                <div className="col m4">
                                    <MaxMinCard color={"blue"} unit = {"mm"} max = { this.state.max.rain } min={ this.state.min.rain } title = {"Précipitations"}/>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        );
    }
});
