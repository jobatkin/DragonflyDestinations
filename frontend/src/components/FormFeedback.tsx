import { Alert, Snackbar } from "@mui/material"

function FormFeedback({message, isError = false, onClose}: {message: string, isError?: boolean, onClose: () => void}) {
    return (
        <Snackbar open={message != ''} autoHideDuration={5000}>
            <Alert onClose={onClose}
                severity={isError ? 'error' : 'success'}
                variant="filled" sx={{ width: '100%' }}>
                {message}
            </Alert>
        </Snackbar>
    )
}

export default FormFeedback