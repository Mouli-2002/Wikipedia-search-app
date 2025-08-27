let searchInputEl = document.getElementById("searchInput");
let searchResultsEl = document.getElementById("searchResults");
let spinnerEl = document.getElementById("spinner");

function createAndAppend(result) {
    let {
        description,
        link,
        title
    } = result;

    let resultEl = document.createElement("div");
    resultEl.classList.add("result-item");
    searchResultsEl.appendChild(resultEl);

    let resulttitleEl = document.createElement("a");
    resulttitleEl.classList.add("result-title");
    resulttitleEl.textContent = title;
    resulttitleEl.href = link;
    resulttitleEl.target = "_blank";
    resultEl.appendChild(resulttitleEl);

    let titlebreakEl = document.createElement("br");
    resultEl.appendChild(titlebreakEl);

    let urlEl = document.createElement("a")
    urlEl.classList.add("result-url");
    urlEl.href = link;
    urlEl.target = "_blank";
    urlEl.textContent = link;
    resultEl.appendChild(urlEl);

    let linebreakEl = document.createElement("br");
    resultEl.appendChild(linebreakEl);

    let descriptionEl = document.createElement("p");
    descriptionEl.classList.add("line-description");
    descriptionEl.textContent = description;
    resultEl.appendChild(descriptionEl);

}

function displayResults(searchResults) {
    spinnerEl.classList.toggle("d-none");
    for (let result of searchResults) {
        createAndAppend(result);
    }
}

function searchWikipedia(event) {
    if (event.key === "Enter") {
        spinnerEl.classList.toggle("d-none");
        searchResultsEl.textContent = "";
        let searchInputElValue = searchInputEl.value;
        let url = "https://apis.ccbp.in/wiki-search?search=" + searchInputElValue;
        let options = {
            method: "GET"
        }
        fetch(url, options)
            .then(function(response) {
                return response.json();
            })
            .then(function(jsonData) {
                let {
                    search_results
                } = jsonData;
                displayResults(search_results);
            });
    }
}
searchInputEl.addEventListener("keydown", searchWikipedia);