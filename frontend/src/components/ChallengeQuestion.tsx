'use client'

import { GuestUser, User, useUserContext } from "@/context/UserContext";
import { CountryAnswer, questionTypes } from "@/types";
import { Button, Grid, Typography } from "@mui/material"
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import { useState } from "react";
import MessageHelper from "@/utils/MessageHelper";
import RefreshButton from "./RefreshButton";
import Image from "next/image";
import APIHelper from "@/utils/APIHelper";

interface ChallengeQuestionProps {
    answers: CountryAnswer[], 
    questionType: typeof questionTypes[number]
}

function ChallengeQuestion({answers, questionType}: ChallengeQuestionProps) {

    const [chosenAnswer, setChosenAnswer] = useState(-1);
    const [userMessage, setUserMessage] = useState('');

    const hasAnswered = chosenAnswer >= 0;

    const correctAnswer = answers.find(answer => answer.correct) as CountryAnswer;
    const goalCountry = correctAnswer?.name;

    const { currentUser, isLoggedIn, handleUpdateUser } = useUserContext();

    const handleAnswerClick = async (selected: number) => {

        setChosenAnswer(selected);

        // were they correct?
        const correct = Boolean(answers[selected].correct);

        // save result in db for user if logged in
        if (currentUser && isLoggedIn && 'id' in currentUser) {
            const userResponse = { question_type: questionType, result: correct };
            const response = await APIHelper.postData(`/api/users/${currentUser.id}/answer`, userResponse);
            const updatedUser = response.data as User;
            
            handleUpdateUser({...currentUser, ...updatedUser});
        } else {
            let updatedUser:GuestUser = {highScore: 0, currentScore: 0, ...currentUser};

            // otherwise, update the user in the cookie with new scores
            if (correct) {
                updatedUser.currentScore = updatedUser.currentScore ? updatedUser.currentScore + 1: 1;
                updatedUser.highScore = updatedUser.currentScore > updatedUser.highScore ? updatedUser.currentScore : updatedUser.highScore;
            }
            else {
                updatedUser.currentScore = 0;
            }

            handleUpdateUser({...currentUser, ...updatedUser});
        }
        setUserMessage(MessageHelper.getQuizMessage(correct));
    }

    const getAnswerOption = (answer: CountryAnswer) => {
        // flag questions need an img tag to display the flag on the button
        if (questionType == 'flag') {
            return <Image src={answer.flag.svgLink} width={answer.flag.width} height={answer.flag.height} alt="Country flag" style={{padding: "1em", minWidth: "250px", maxWidth: "100%", height: "auto"}}/>;
        
        // region questions need the 'wrong' answers to come from the full list of regions, not the other countries as several could be from the same region
        } else if (questionType == 'region') {
            return answer.displayWrongRegion;
        }
        return answer[questionType];
    }

    return (
        <Grid container spacing={{lg: 10, xs: 5}}>
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
                        sx={{width: "100%", position: "relative", borderWidth: '3px', borderStyle: 'solid', 
                            borderColor: chosenAnswer == i ? 'secondary.main' : 'transparent',
                            minHeight: questionType == 'flag' ? "10em" : "4em", }}
                        onClick={() => handleAnswerClick(i)}
                    >
                        {getAnswerOption(answer)}
                    </Button>
                </Grid>
            ))}
            {hasAnswered && 
                <Grid item xs={12} sx={{textAlign: 'center'}}>
                    <Typography variant="h4" color="secondary" gutterBottom>{userMessage}</Typography>
                    <Button color="extra" href={`/discover/${correctAnswer?.code}`} sx={{my: 1}}>Discover more about {goalCountry}</Button> {' '}
                    <RefreshButton buttonText="Next Question" scrollToTop onRefresh={() => setChosenAnswer(-1)} color="info"/>
                </Grid>
            }
        </Grid>
    );
}

export default ChallengeQuestion