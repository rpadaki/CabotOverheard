quotesManagement = (function() {
    var quotes;
    return([
        function() {
            return(quotes);
        },
        function(update) {
            quotes = update;
        }
    ]);
})();
getQuotes = quotesManagement[0];
setQuotes = quotesManagement[1];

function fetchQuotes(set = setQuotes) {
    var xhttp = new XMLHttpRequest();
    xhttp.addEventListener("load", function() {
        set(JSON.parse(xhttp.responseText));
    });
    xhttp.open("GET", "https://cors-anywhere.herokuapp.com/https://drive.google.com/uc?export=download&id=1buTZD3t9f_hpQyXN1q4EntdEdXuoAToO");
    xhttp.send();
}
