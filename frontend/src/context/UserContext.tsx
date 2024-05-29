'use client';

import React, { useState, useContext, useEffect } from "react";
import { getCookie, setCookie, deleteCookie } from 'cookies-next';

export interface User {
    id: Number
    token?: string
    userName: string
    profilePhoto?: string 
    email: string
    password: string // encrypted
    highScore: number
    currentScore: number
}

// special type of object being provided by this context
interface UserContextProps {
    currentUser: User | null
    handleUpdateUser: (user: User) => void
    isLoggedIn: boolean
}

const UserContext = React.createContext<UserContextProps>( {} as UserContextProps ) 

// Custom provider component for this User Context - render in top layout
export const UserProvider = (props: { children: React.ReactNode }) => {

    // store the current user in state at the top level
    const [currentUser, setCurrentUser] = useState<User | null>(null); // default user object
    const isLoggedIn = Boolean(currentUser && currentUser.token);

    // need to load user data from cookie via useEffect to prevent hydration issues
    useEffect(() => {
        const userData = getCookie('user'); 
        const cookieUser: User = userData ? JSON.parse(userData) : {} as User; // turns the user cookie object into a User
        setCurrentUser(cookieUser)
    },[])    

    // sets user object in state, shared via context
    const handleUpdateUser = (user: User) => {
        if (user.token) {
            setCookie('user', JSON.stringify(user), { path: '/', maxAge: 60 * 60 * 24 * 7}) // cookie will expire in a week
        } else {
            deleteCookie('user')
        }        
        console.log(user)
        setCurrentUser(user);
    };

    const providerValue: UserContextProps = {
        currentUser, handleUpdateUser, isLoggedIn
    }

    return (
        <UserContext.Provider value={providerValue}>
            {props.children}
        </UserContext.Provider>
    );
};

// custom hook to allow easy use of the data stored in this context
export const useUserContext = () => {
    return useContext(UserContext);
};
