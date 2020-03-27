
//find locations
let randomCountryElement = document.querySelector('#random-country');
let userAnswerElement = document.querySelector("#user-answer");
let submitButton = document.querySelector("#submit-answer");
let resultTextElement = document.querySelector('#result');
let restartButton = document.querySelector('#restart');

console.log(countriesAndCodes);  // You don't need to log countriesAndCodes - just proving it is available
// begin
let attempts = 3;
start_game(attempts);

// method uses Math to randomize the object selected. Name assigned to randomCountryElement and two letter country code
// assigned. Pass code and object to user_entry function.
function start_game() {
    let randCountryObject = countriesAndCodes[Math.floor(Math.random() * countriesAndCodes.length)];
    randomCountryElement.innerHTML = randCountryObject.name;
    let randCountryCode = randCountryObject['alpha-2'];
    console.log(randCountryCode);
    user_entry(randCountryCode, randCountryObject)
}

// on submit click collect user submission and pass to get_answer method
function user_entry(countryCode, countryObject) {
    submitButton.addEventListener('click', function () {
        // validation if user doesn't enter value'
        if(!userAnswerElement.value){
            alert('Please enter a guess')
        }else {
            get_answer(userAnswerElement.value)
        }});

// allow for three attempted connections before terminating and alerting user
    function get_answer(answer) {
        // 3 attempts exceeded. Program will stop trying to connect and alert user
        if (attempts <= 0) {
            console.log('Too many errors, ending attempt');
            alert('Could not connect. Ending attempt');
            return
        }
        // connects to api using country code
        fetch(`https://api.worldbank.org/v2/country/${countryCode}?format=json`)
            // take json string and convert to an object
            .then(response => response.json()
            ).then(countryData => {
            console.log(countryData);
            // assign capital city object element
            let capital = countryData[1][0]['capitalCity'];
            console.log(capital);
            // conditional to check user submission and respond
            if (answer.toLowerCase() === capital.toLowerCase()) {
                resultTextElement.innerHTML = `Correct! the capital of ${countryObject.name} is ${capital}.`
            } else {
                resultTextElement.innerHTML = `Sorry, the correct answer is ${capital}`
            }
        })
            // if errors occur, reduce attempt counter and log
            .catch(err => {
                attempts --;
                console.log(err)
            }) //TODO is .finally required here for the attempt counter to work?
    }
}
// restart button clears all fields and calls start_game method
restartButton.addEventListener('click', function () {
    userAnswerElement.value = '';
    resultTextElement.innerHTML = '';
    start_game()
})

