
City = new Mongo.Collection('city');
Weather = new Mongo.Collection("forecast");

if (Meteor.isServer) {
	Meteor.publish("weatherData", function(city) {
		var weatherData = Weather.find({"city.name": city});
		if (weatherData) {
			return weatherData;
		}
		return this.ready();
	});

	Meteor.publish("cities", function(search) {
		search = search.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g, "\\$&");
		var cities = City.find({"city.name":{$regex: search, $options: "i"}}, {limit:6});
		
		if(cities) {
			return cities;
		}
		return this.ready();
	});
}
