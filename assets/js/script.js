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