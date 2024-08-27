'use client'

import { UserScores } from "@/app/dashboard/page";
import { Gauge, gaugeClasses } from '@mui/x-charts/Gauge';
import { useTheme } from '@mui/material/styles';
import { Box, Typography } from "@mui/material";
import TextHelper from "@/utils/TextHelper";

export default function ScoreChart({scoreResult}: {scoreResult: UserScores}) {

    const theme = useTheme();

    const percent = Math.round(scoreResult.correct / scoreResult.total * 100);
    const arcColor = percent < 40 ? theme.palette.secondary.dark : percent < 70 ? theme.palette.secondary.main : theme.palette.primary.main;
    const summary = percent < 40 ? 'could be better!' : percent < 70 ? 'doing well!' : 'excellent result!';

    return (
        <Box display="flex" flexDirection="column" alignItems="center">
            <Typography variant="h4" id={scoreResult.question_type + "_label"} color="extra.main">{TextHelper.ucFirst(scoreResult.question_type)} Questions</Typography>
            <Gauge width={200} height={120} value={percent} startAngle={-90} endAngle={90} innerRadius="70%" aria-labelledby={scoreResult.question_type + "_label"}
                text={({ value }) => `${value} %`} sx={{
                    [`& .${gaugeClasses.valueArc}`]: {
                        fill: arcColor,
                    },
                    [`& .${gaugeClasses.valueText}`]: {
                        fontSize: 20,
                        transform: 'translate(0px, -10px)',
                    },
                }}/>
            <Typography variant="caption">{scoreResult.correct}/{scoreResult.total} correct answers, {summary}</Typography>
        </Box>
    )
}