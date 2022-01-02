const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');

// Show loader 
const loading = function() {
    loader.hidden = false;
    quoteContainer.hidden = true;
}

// Show quote
const complete = function () {
    loader.hidden = true;
    quoteContainer.hidden = false;
}

// Get quote from API
async function getQuote() {
    loading();
    const APIURL = 'http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json';
    const PROXYURL = 'https://whispering-tor-04671.herokuapp.com/';

    try {
        const response = await fetch(PROXYURL + APIURL);
        const data = await response.json();

		if (data.quoteAuthor === '') {
			authorText.innerText = 'Unknown';
		} else {
			authorText.innerText = data.quoteAuthor;
		}
        
        // Reduce font size for long quotes
        if(data.quoteText.length > 120) {
            quoteText.classList.add('long-quote');
        } 

        quoteText.innerHTML = data.quoteText;
        complete();
    } 
    catch(error) {
        getQuote();
    }
}

// Event Listener
newQuoteBtn.addEventListener('click', getQuote);

getQuote();