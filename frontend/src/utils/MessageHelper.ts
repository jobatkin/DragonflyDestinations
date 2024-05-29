class MessageHelper {

    static correctResponses = [
        "Great job! You nailed it!",
        "Congratulations! You're on fire with these answers!",
        "Spot on! You've got a knack for this!",
        "Well done! You're dominating this challenge!",
        "Impressive! Keep those correct responses coming!",
        "Bravo! You're unstoppable!",
        "Fantastic! Your knowledge shines through!",
        "You're killing it! Keep up the awesome work!",
        "Outstanding! You're acing this challenge!",
        "Excellent work! Your expertise shines through!"
    ];
    
    static incorrectResponses = [
        "No worries! Better luck next time!",
        "It's okay! Keep trying, you'll get it next round!",
        "Don't sweat it! It's all part of the fun!",
        "Oops! That's alright, there's always another question!",
        "Not quite, but don't give up! You'll get the next one!",
        "Close, but not quite! You're still doing great!",
        "Nope, but that's okay! It's all about having fun!",
        "Not the right answer this time, but keep those guesses coming!",
        "Not quite there, but keep playing! You're doing awesome!",
        "Incorrect, but keep your spirits up! There's plenty more to go!"
    ];
    
    // generates a random message for the user whe they answer a quiz question
    static getQuizMessage(correct: boolean) {
        const randomResponse = Math.floor(Math.random() * 10);
        return correct ? MessageHelper.correctResponses[randomResponse] : MessageHelper.incorrectResponses[randomResponse];
    }
}

export default MessageHelper