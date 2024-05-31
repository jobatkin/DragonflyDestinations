'use client'
import { Dialog, DialogContent, DialogTitle, Typography } from "@mui/material"
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";

function AuthenticationDialog({isOpen, isLogin, handleClose}: {isOpen: boolean, isLogin: boolean, handleClose: () => void}) {
    const dialogTitle = isLogin ? 'Login' : 'Register';

    return (
        <Dialog
            open={isOpen}
            onClose={handleClose}
            aria-labelledby={dialogTitle + '-dialog'}
        >
        <DialogTitle id={dialogTitle + '-dialog'} sx={{textAlign: 'center'}} component="h3" variant="h3">{dialogTitle}</DialogTitle>
        <DialogContent>
          { isLogin ? <LoginForm handleClose={handleClose} /> : <RegisterForm handleClose={handleClose} /> }
        </DialogContent>
      </Dialog>        
    )
}

export default AuthenticationDialog