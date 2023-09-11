const quotes = [
    'Success is not final, failure is not fatal: It is the courage to continue that counts. - Winston Churchill',
    'The only way to do great work is to love what you do. - Steve Jobs',
    'Believe you can and you\'re halfway there. - Theodore Roosevelt',
    'The future belongs to those who believe in the beauty of their dreams. - Eleanor Roosevelt',
    'Don\'t watch the clock; do what it does. Keep going. - Sam Levenson',
    'You are never too old to set another goal or to dream a new dream. - C.S. Lewis',
    'The harder you work for something, the greater you\'ll feel when you achieve it. - Unknown',
    'Your time is limited, don\'t waste it living someone else\'s life. - Steve Jobs',
    'The only limit to our realization of tomorrow will be our doubts of today. - Franklin D. Roosevelt',
    'Success is walking from failure to failure with no loss of enthusiasm. - Winston Churchill',
    'The best revenge is massive success. - Frank Sinatra',
    'In the middle of every difficulty lies opportunity. - Albert Einstein',
    'Believe in yourself and all that you are. Know that there is something inside you that is greater than any obstacle. - Christian D. Larson',
    'The only person you are destined to become is the person you decide to be. - Ralph Waldo Emerson',
    'Your time is now. Start where you stand and never back down. - Tom Hopkins'
];

let words = [];
let wordIndex = 0;
let startTime = Date.now();
let totalWordsTyped = 0;

const quoteElement = document.getElementById('quote');
const messageElement = document.getElementById('message');
const typedValueElement = document.getElementById('typed-value');
const wpmElement = document.getElementById('wpm');

document.getElementById('typed-value').value = '';

document.getElementById('start').addEventListener('click', function () {
    const quoteIndex = Math.floor(Math.random() * quotes.length);
    const quote = quotes[quoteIndex];
    words = quote.split(' ');
    wordIndex = 0;
    totalWordsTyped = 0;

    const spanWords = words.map(function (word) { return `<span>${word} </span>` });
    quoteElement.innerHTML = spanWords.join('');
    quoteElement.childNodes[0].className = 'highlight';
    messageElement.innerText = '';
    typedValueElement.value = '';
    typedValueElement.focus();

    startTime = new Date().getTime();
});

typedValueElement.addEventListener('input', (e) => {
    const currentWord = words[wordIndex];
    const typedValue = typedValueElement.value;

    if (typedValue === currentWord && wordIndex === words.length - 1) {
        const elapsedTime = new Date().getTime() - startTime;
        const minutes = elapsedTime / 60000;
        const wpm = Math.round((totalWordsTyped + 1) / minutes);
        const message = `CONGRATULATIONS! You finished in ${elapsedTime / 1000} seconds. Your WPM: ${wpm}`;
        messageElement.innerText = message;
        //wpmElement.innerText = `Words per Minute (WPM): ${wpm}`;
		// Show the user info modal when the test is completed
        $('#userInfoModal').modal('show');
		
    } else if (typedValue.endsWith(' ') && typedValue.trim() === currentWord) {
        typedValueElement.value = '';
        wordIndex++;
        totalWordsTyped++;
        for (const wordElement of quoteElement.childNodes) {
            wordElement.className = '';
        }
        quoteElement.childNodes[wordIndex].className = 'highlight';
    } else if (currentWord.startsWith(typedValue)) {
        typedValueElement.className = 'form-control';
        typedValueElement.style.backgroundColor = 'white';
    } else {
        typedValueElement.style.backgroundColor = 'red';
    }
});

document.getElementById('reset').addEventListener('click', function () {
    // Clear the quote
    quoteElement.innerHTML = '';
    // Clear the typed value
    typedValueElement.value = '';
    // Reset word tracking
    wordIndex = 0;
    totalWordsTyped = 0;
    // Clear messages
    messageElement.innerText = '';
});

// Add event listener for the "Save" button in the user info modal
document.getElementById('saveUserInfo').addEventListener('click', function () {
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const wpm = Math.round((totalWordsTyped + 1) / minutes);

    // Prepare data for saving (you can customize the format)
    const userData = `Name: ${name}\nEmail: ${email}\nWPM: ${wpm}`;

    // Save the data to a text file (you may need server-side code to do this)
    // Example: send a POST request to your server to save the data

    // Close the modal
    $('#userInfoModal').modal('hide');
});

