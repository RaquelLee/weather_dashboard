cityName = localStorage.getItem("City");
populatePage(cityName);

$("#city-search").on("click", function(event) {
    event.preventDefault();
    var cityName = $("#city-input").val();
    localStorage.setItem("City", cityName);
    populatePage(cityName);
    var li = $("<li>");
    li.addClass("list-group-item list-group-item-action");
    li.text(cityName);
    $(li).on("click", function() {
        populatePage(cityName);
    });
    $(".list-group").prepend(li);
});

function populatePage (cn){
    var apiKey = "&appid=166935e80f8de25e6d29e85714fb2820";
    var queryURL =
    "http://api.openweathermap.org/geo/1.0/direct?q="
    + cn + apiKey;
    
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(c) {
    var cityNameObj = c[0].name;
    var lat = c[0].lat;
    var lon = c[0].lon;

    queryURL= 
    "https://api.openweathermap.org/data/2.5/onecall?lat="
    + lat + "&lon=" + lon +
    "&units=imperial&exclude=minutely,hourly,alerts" + apiKey;
    
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(c) {

    function makeDate(dt){
        var a = new Date(dt * 1000);
        var months = ["1","2","3","4","5","6","7","8","9","10","11","12"];
        var month = months[a.getMonth()];
        var date = a.getDate();
        var year = a.getFullYear();
        var time = month + "/" + date + "/" + year;
        return time;
    }

    $("#current-city").text(cityNameObj + " " + makeDate(c.current.dt));
    var icon = c.current.weather[0].icon;
    $("#now-icon").attr("src","http://openweathermap.org/img/wn/" + icon + "@2x.png");    
    $("#now-temp").text("Temp: " + (c.current.temp.toFixed(1) + " F"));
    $("#now-humidity").text("Humidity: " + c.current.humidity + "%");
    $("#now-wind").text("Wind Speed: " + c.current.wind_speed + " MPH");    
    $("#now-uv").text("UV Index: " + c.current.uvi);

});
});
}