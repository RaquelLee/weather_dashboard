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
    "https://api.openweathermap.org/geo/1.0/direct?q="
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

    if (c.current.uvi < 3){
        $("#now-uv").addClass("btn btn-success");
    } else if (c.current.uvi > 3) {
        $("#now-uv").addClass("bg-warning");
    } else if (c.current.uvi >= 8){
        $("#now-uv").addClass("bg-danger");
    };

    $("#date1").text(makeDate(c.daily[0].dt));
    var icon1 = c.daily[0].weather[0].icon;
    $("#icon1").attr("src","http://openweathermap.org/img/wn/" + icon1 + "@2x.png");
    $("#temp1").text("Temp: " + c.daily[0].temp.day.toFixed(1) + " F");
    $("#humidity1").text("Humidity: " + c.daily[0].humidity + "%");
    
    $("#date2").text(makeDate(c.daily[1].dt));
    var icon2 = c.daily[1].weather[0].icon;
    $("#icon2").attr("src","http://openweathermap.org/img/wn/" + icon2 + "@2x.png");
    $("#temp2").text("Temp: " + c.daily[1].temp.day.toFixed(1) + " F");
    $("#humidity2").text("Humidity: " + c.daily[1].humidity + "%");
    
    $("#date3").text(makeDate(c.daily[2].dt));
    var icon3 = c.daily[2].weather[0].icon;
    $("#icon3").attr("src","http://openweathermap.org/img/wn/" + icon3 + "@2x.png");
    $("#temp3").text("Temp: " + c.daily[2].temp.day.toFixed(1) + " F");
    $("#humidity3").text("Humidity: " + c.daily[2].humidity + "%");
    
    $("#date4").text(makeDate(c.daily[3].dt));
    var icon4 = c.daily[3].weather[0].icon;
    $("#icon4").attr("src","http://openweathermap.org/img/wn/" + icon4 + "@2x.png");
    $("#temp4").text("Temp: " + c.daily[3].temp.day.toFixed(1) + " F");
    $("#humidity4").text("Humidity: " + c.daily[3].humidity + "%");
    
    $("#date5").text(makeDate(c.daily[4].dt));
    var icon5 = c.daily[4].weather[0].icon;
    $("#icon5").attr("src","http://openweathermap.org/img/wn/" + icon5 + "@2x.png");
    $("#temp5").text("Temp: " + c.daily[4].temp.day.toFixed(1) + " F");
    $("#humidity5").text("Humidity: " + c.daily[4].humidity + "%");

});
});
}