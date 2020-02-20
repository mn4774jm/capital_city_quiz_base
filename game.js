let randomCountryElement = document.querySelector('#random-country')
let userAnswerElement = document.querySelector("#user-answer")
let submitButton = document.querySelector("#submit-answer")
let resultTextElement = document.querySelector('#result')

// TODO finish the script to challenge the user about their knowledge of capital cities.
// An array of country codes is provided in the countries.js file. 
// Your browser treats all JavaScript files as one big file, o
// organized in the order of the script tags so the countriesAndCodes array is available to this script.

console.log(countriesAndCodes)  // You don't need to log countriesAndCodes - just proving it is available


// TODO when the page loads, select an element at random from the countriesAndCodes array
// TODO display the country's name in the randomCountryElement
//Call rand_country and for country name and pass to randCountryElement

let randCountryObject = rand_country()
randomCountryElement.innerHTML = randCountryObject.name
let randCountryCode = randCountryObject['alpha-2']
console.log(randCountryCode)

//created function to randomly select the name object element using Math.random
function rand_country() {
    return countriesAndCodes[Math.floor(Math.random() * countriesAndCodes.length)]
}

// TODO add a click event handler to the submitButton.  When the user clicks the button,
//  * read the text from the userAnswerElement 
//  * Use fetch() to make a call to the World Bank API with the two-letter country code (from countriesAndCodes, example 'CN' or 'AF')
//  * Verify no errors were encountered in the API call. If an error occurs, display an alert message. 
//  * If the API call was successful, extract the capital city from the World Bank API response.
//  * Compare it to the user's answer. 
//      You can decide how correct you require the user to be. At the minimum, the user's answer should be the same
//      as the World Bank data - make the comparison case insensitive.
//      If you want to be more flexible, include and use a string similarity library such as https://github.com/hiddentao/fast-levenshtein 
//  * Finally, display an appropriate message in the resultTextElement to tell the user if they are right or wrong. 
//      For example "Correct! The capital of Germany is Berlin" or "Wrong - the capital of Germany is not G, it is Berlin"

submitButton.addEventListener('click', function() {
    let user_answer = userAnswerElement.value;
    let max_attempts = 3
    get_answer(user_answer, max_attempts)
})

function get_answer(answer, attempts){
    if (attempts <= 0 ) {
        console.log('Too many errors, ending attempt')
        return
    }
    fetch(`https://api.worldbank.org/v2/country/${randCountryCode}?format=json`)
        .then((response) => {
            console.log(response)
            return response.json()
        }).then(countryData => {
            console.log(countryData)
            let capital = countryData[1][0]['capitalCity']
            console.log(capital)
            if (answer.toLowerCase() === capital.toLowerCase()) {
                resultTextElement.innerHTML = `Correct! the capital of ${randCountryObject.name} is ${capital}.`
            } else {
                resultTextElement.innerHTML = 'Boooooooo!'
            }

    })
        .catch(err => {
        console.log(err)
    })
        // .finally( () =>
        //     randCountryObject = rand_country()
        //     randomCountryElement.innerHTML = randCountryObject.name
        //     let randCountryCode = randCountryObject['alpha-2']
        //     userAnswerElement.innerHTML = ''
        //     console.log(randCountryCode)
        // )
}
// TODO finally, connect the play again button. Clear the user's answer, select a new random country, 
// display the country's name, handle the user's guess. If you didn't use functions in the code you've 
// already written, you should refactor your code to use functions to avoid writing very similar code twice. 
