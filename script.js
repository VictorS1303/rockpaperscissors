"use strict"

// VARIABLES //
const buttonsContainer = document.querySelector('#buttons')
const winScreen = document.querySelector('#win_screen')
const winner = winScreen.querySelector('#winner')
const userChoiceImage = winScreen.querySelector('#user_choice_image')
const computerChoiceImage = winScreen.querySelector('#computer_choice_image')
const tryAgainButton = winScreen.querySelector('#try_again_btn')


// EVENT LISTENERS //
buttonsContainer.addEventListener('click', (e) => chooseUserGuess(e))
tryAgainButton.addEventListener('click', () => {
    location.reload()
})

// CORE LOGIC //

// FUNCTIONS //
function chooseUserGuess(e)
{
    // Get the id of the clicked button (user's choice)
    let userGuess = e.target.id

    // Get numeric value of user guess
    let userGuessNumber = userGuessNumberValue(userGuess)
    
    // Get numeric value of computer guess
    let computerGuessNumber = generateComputerGuess() 

    // Now pass the computer's guess to update the computer's hand image
    updateComputerHandImage(computerGuessNumber)
    
    // Pass the user's guess to update the user's hand image
    updateUserHandImage(userGuess)

    // Determine winner
    determineWinner(userGuessNumber, computerGuessNumber)
}

// Map choices to numbers //
function userGuessNumberValue(userGuess)
{
    let userGuessNumber

    switch (userGuess)
    {
        case 'rock':
            userGuessNumber = 0
            break

        case 'paper':
            userGuessNumber = 1
            break

        case 'scissors':
            userGuessNumber = 2
            break
    }

    return userGuessNumber
}

// Randomized computer guess
function generateComputerGuess()
{
    return Math.floor(Math.random() * 3);  // 0 = rock, 1 = paper, 2 = scissors
}

// Determine Winner //
function determineWinner(userGuessNumber, computerGuessNumber)
{
    if(userGuessNumber === computerGuessNumber)
    {
        winner.textContent = 'Tie!'
    }
    else if
    (
        (userGuessNumber === 0 && computerGuessNumber === 2) ||  // Rock beats Scissors
        (userGuessNumber === 1 && computerGuessNumber === 0) ||  // Paper beats Rock
        (userGuessNumber === 2 && computerGuessNumber === 1)     // Scissors beat Paper
    )
    {
        winner.textContent = 'User won!'
    }
    else
    {
        winner.textContent = 'Computer won!'
    }

    // Show the win screen with the result
    setTimeout(() => {
        winScreen.classList.add('active')
    }, 3000)
}

/*** UI ***/
const players = document.querySelectorAll('.player')

// Update User Hand Image //
function updateUserHandImage(userGuess)
{
    players[0].classList.add('shake')

    players[0].addEventListener('animationend', () =>
    {
        players[0].style.backgroundImage = `url('images/hand_${userGuess}.png')`
        players[0].classList.remove('shake')

        // Update the user choice image on the win screen
        userChoiceImage.src = `images/hand_${userGuess}.png`
    })
}

// Update Computer Hand Image //
function updateComputerHandImage(randomIndex)
{
    const choices = ['rock', 'paper', 'scissors']
    
    players[1].classList.add('shake')

    players[1].addEventListener('animationend', () =>
    {
        players[1].style.backgroundImage = `url('images/hand_${choices[randomIndex]}.png')`
        players[1].classList.remove('shake')

        // Update the computer choice image on the win screen
        computerChoiceImage.src = `images/hand_${choices[randomIndex]}.png`
    })  
}
