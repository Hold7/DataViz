var dataSub;
App = React.createClass({
    search: function(e,searchedCity) {
        e.preventDefault();

        if (dataSub && (searchedCity != this.state.city)){
            dataSub.stop();
        }
        dataSub = Meteor.subscribe("weatherData", searchedCity, {
            onReady: function(){
                console.log("we subscribed to weatherData " + searchedCity + " :) ");
            }
        });

        this.setState({city: searchedCity, loaderState: 'open'});


        //document.getElementById("loadscreen-wrapper").open();
      //  while(Weather.find({"city.name" : searchedCity}).fetch().length == 0){};
        (function(self) {
            setTimeout(function(){
                self.setState({scenarioState: '', loaderState: 'closing'});
            }, 3000);
        })(this);
    },

    getInitialState: function() {
        return {
            city: '',
            scenarioState: 'start',
            loaderState: 'closed',
            windowWidth: window.innerWidth,
            windowHeight: window.innerHeight
        };
    },

    handleResize: function(e) {
        this.setState({windowWidth: window.innerWidth,windowHeight: window.innerHeight});
    },

    componentDidMount: function() {
        window.addEventListener('resize', this.handleResize);
    },

    componentWillUnmount: function() {
        window.removeEventListener('resize', this.handleResize);
    },
    
    render: function() {
        console.log("hey, we are rendering app.jsx");
        console.log(this.state.city);
        return (
            <div className="weather-cover">
                <Loader state={this.state.loaderState}/>
                <OrganicSearch searchHandler={ this.search } scenarioState={ this.state.scenarioState } />
                <main className={ this.state.scenarioState }>
                    <div style={{height: this.state.windowHeight+ 'px',width: this.state.windowWidth+ 'px'}} className=" weather-wrapper">
                        <WeatherData city={ this.state.city} />
                    </div>
                    <div className="historic-wrapper">
                        <Historic />
                    </div>
                </main>
            </div>
        );
    }
});