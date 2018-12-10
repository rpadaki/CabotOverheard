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

function setEntry(entry, data) {
    entry.getElementsByClassName("quote")[0].innerHTML = "&ldquo;" + data.quote + "&rdquo;";
    entry.getElementsByClassName("attribution")[0].innerHTML = data.attribution;
    entry.getElementsByClassName("time")[0].innerHTML = new Date(Date.parse(data.time)).toLocaleString("en-us", {weekday: "long", month: "long", day: "numeric", hour: "numeric", minute:"2-digit"});
    entry.hash = JSON.stringify(data);
}

function updateEntry(number) {
    var entries = Array.from(document.getElementsByClassName("entry"));
    var displayed = entries.map(e => e.hash);
    var quotes = getQuotes();
    var updates = quotes.filter(q => !displayed.includes(JSON.stringify(q)));
    var update = updates[Math.floor(Math.random()*updates.length)];
    if (update) {
        setEntry(entries[number], update);
    }
}

fetchQuotes();
setInterval(function() {fetchQuotes();}, 10000);
setInterval(function() {
    num = Math.floor(Math.random() * 4);
    updateEntry(num);
}, 10000);
