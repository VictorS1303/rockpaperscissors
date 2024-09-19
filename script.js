"use strict"

// VARIABLES //
const buttonsContainer = document.querySelector('#buttons')
const winScreen = document.querySelector('#win_screen')
const winner = winScreen.querySelector('#winner')
const userChoiceImage = winScreen.querySelector('#user_choice_image')
const computerChoiceImage = winScreen.querySelector('#computer_choice_image')
const tryAgainButton = winScreen.querySelector('#try_again_btn')


// EVENT LISTENERS //

// Determinating user choice 
buttonsContainer.addEventListener('click', (e) => chooseUserGuess(e))

// Reset Game
tryAgainButton.addEventListener('click', resetGame)

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
    // Initializing variable userGuessNumber
    let userGuessNumber

    switch (userGuess)
    {
        // Rock = 0
        case 'rock':
            userGuessNumber = 0
            break

        // Paper = 1
        case 'paper':
            userGuessNumber = 1
            break

        // Scissors = 2
        case 'scissors':
            userGuessNumber = 2
            break
    }

    // Returning the number value of the user guess
    return userGuessNumber
}

// Randomized computer guess
function generateComputerGuess()
{
    // This returns a random number between 0 and 2 (0 and 2 inclusive)
    return Math.floor(Math.random() * 3)
}

// Determine Winner //
function determineWinner(userGuessNumber, computerGuessNumber)
{
    // If the user's guess equals the computer's guess, it's a tie
    if(userGuessNumber === computerGuessNumber)
    {
        winner.textContent = 'Tie!'
    }
    else if
    (
        /*
            Rock     = 0
            Paper    = 1
            Scissors = 2

            All below scenarios make the user wino
        */
        (userGuessNumber === 0 && computerGuessNumber === 2) ||  // Rock beats Scissors
        (userGuessNumber === 1 && computerGuessNumber === 0) ||  // Paper beats Rock
        (userGuessNumber === 2 && computerGuessNumber === 1)     // Scissors beat Paper
    )
    {
        winner.textContent = 'User won!'
    }
    /*
        If none of the above cases are true, it automatically means that the computer wins
    */
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
    /*
        Since the hand images have been brought in as a NodeList, they can be access accessed as indexes in an array.
        Here, the element at index 0 is the user.

        Adding the "shake" class to the user hand image
    */
    players[0].classList.add('shake')
    
    
    /*
        Adding the eventlistener "animationend" to determine, when the "shake" animation has ended
    */
    players[0].addEventListener('animationend', () =>
    {
        
        // Updating the image to represent the user choice
        players[0].style.backgroundImage = `url('images/hand_${userGuess}.png')`

        // Removing the "shake" class from the user hand image (ultimately removing the "shake" animation)
        players[0].classList.remove('shake')

        // Update the user choice image on the win screen
        userChoiceImage.src = `images/hand_${userGuess}.png`
    })

    // After 5 seconds, reset the user hand image to rock image
    setTimeout(() =>
    {
        players[0].style.backgroundImage = `url('images/hand_rock.png')`
    }, 5000)
}

// Update Computer Hand Image //
function updateComputerHandImage(randomIndex)
{
    // Creating an array of the possible outcomes for the computer hand image
    const choices = ['rock', 'paper', 'scissors']
    
    /*
        Since the hand images have been brought in as a NodeList, they can be accessed as indexes in an array.
        Here, the element at index 0 is the user.

        Adding the "shake" class to the computer hand image
    */
    players[1].classList.add('shake')

    // Updating the image to represent the user choice
    players[1].addEventListener('animationend', () =>
    {
        /*
            Updating the image to represent the computer choice by inserting the randomly selected choice into
            the image path.

            It works by passing the returned `randomIndex`from the as a parameter to this function "updateComputerHandImage()"
            function by inserting `randomIndex` as the element in the choices array. 
        */
        players[1].style.backgroundImage = `url('images/hand_${choices[randomIndex]}.png')`
        
        // Removing the "shake" class from the computer hand image (ultimately removing the "shake" animation)
        players[1].classList.remove('shake')

        // Update the computer choice image on the win screen
        computerChoiceImage.src = `images/hand_${choices[randomIndex]}.png`
    })  
}

// Reset Game
function resetGame()
{
    // Simply reload the window
    location.reload()
}