'use client'

import { User, useUserContext } from "@/context/UserContext";
import { CountryAnswer, questionTypes } from "@/types";
import { Button, Grid, Typography } from "@mui/material"
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import axios from "axios";
import { useState } from "react";
import MessageHelper from "@/utils/MessageHelper";
import RefreshButton from "./RefreshButton";

interface ChallengeQuestionProps {
    answers: CountryAnswer[], 
    questionType: typeof questionTypes[number]
    regions: string[]
}

function ChallengeQuestion({answers, questionType, regions}: ChallengeQuestionProps) {

    const [chosenAnswer, setChosenAnswer] = useState(-1);
    const [userMessage, setUserMessage] = useState('');

    const hasAnswered = chosenAnswer >= 0;

    const correctAnswer = answers.find(answer => answer.correct) as CountryAnswer;
    const regionOptions = regions.filter(region => region != correctAnswer.region);
    const goalCountry = correctAnswer?.name;

    const { currentUser, isLoggedIn, handleUpdateUser } = useUserContext();

    const handleAnswerClick = async (selected: number) => {

        setChosenAnswer(selected);

        // were they correct?
        const correct = Boolean(answers[selected].correct);
        let updatedUser = currentUser ? {...currentUser} : {} as User;

        // save result in db for user if logged in
        if (currentUser && isLoggedIn) {
            const userResponse = { question_type: questionType, result: correct };
            const response = await axios.post(`/api/users/${currentUser.id}/answer`, userResponse);
            const userUpdates = response.data.data as User;
            updatedUser = {...updatedUser, ...userUpdates};
        } else {
            // otherwise, update the user in the cookie with new scores
            if (correct) {
                updatedUser.currentScore = updatedUser.currentScore ? updatedUser.currentScore + 1: 1;
                updatedUser.highScore = updatedUser.currentScore > updatedUser.highScore ? updatedUser.currentScore : updatedUser.highScore;
            }
            else {
                updatedUser.currentScore = 0;
            }
        }
        handleUpdateUser(updatedUser);

        setUserMessage(MessageHelper.getQuizMessage(correct));
    }

    const getAnswerOption = (answer: CountryAnswer) => {
        // flag questions need an img tag to display the flag on the button
        if (questionType == 'flag') {
            return <img src={answer.flag} style={{maxWidth: '100%', padding: '2em'}}/>;
        
        // region questions need the 'wrong' answers to come from the full list of regions, not the other countries as several could be from the same region
        } else if (questionType == 'region' && !answer.correct) {
            const randomRegionIndex = Math.floor(Math.random() * regionOptions.length)
            const randomRegion = regionOptions[randomRegionIndex];

            // remove the region we chose from the total list so it doesn't show more than once
            regionOptions.splice(randomRegionIndex, 1);
            return randomRegion
        }
        return answer[questionType];
    }

    return (
        <Grid container spacing={10}>
            <Grid item xs={12}>
                <Typography variant="h3">
                    Q: What is the {' '}
                    <Typography component="strong" variant="inherit" color="secondary">{questionType}</Typography> of {' '}
                    <Typography component="strong" variant="inherit" color="secondary">{goalCountry}</Typography>?
                </Typography>
            </Grid>
            {answers.map((answer, i) => (
                <Grid item xs={12} md={6} key={answer.code}>
                    <Button
                        startIcon={hasAnswered && (answer.correct ? <CheckIcon /> : <CloseIcon />)}
                        size="large"
                        disabled={hasAnswered} // disable buttons once they choose an answer
                        color={hasAnswered && i == answers.indexOf(correctAnswer) ? "primary" : "extra"}
                        sx={{width: "100%", minHeight: "4em", borderWidth: '3px', borderStyle: 'solid', borderColor: chosenAnswer == i ? 'secondary.main' : 'transparent'}}
                        onClick={() => handleAnswerClick(i)}
                    >
                        {getAnswerOption(answer)}
                    </Button>
                </Grid>
            ))}
            {hasAnswered && 
                <Grid item xs={12} sx={{textAlign: 'center'}}>
                    <Typography variant="h4" color="secondary" gutterBottom>{userMessage}</Typography>
                    <Button color="extra" href={`/discover/${correctAnswer?.code}`}>Discover more about {goalCountry}</Button> {' '}
                    <RefreshButton buttonText="Next Question" color="info"/>
                </Grid>
            }
        </Grid>
    );
}

export default ChallengeQuestion