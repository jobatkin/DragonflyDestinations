'use client';

import React, { useState, useContext, useEffect } from "react";
import { getCookie, setCookie, deleteCookie } from 'cookies-next';
import { UserFavourites } from "@/types";

export interface GuestUser {
    highScore: number
    currentScore: number    
}

export interface User extends GuestUser {
    id: number
    token?: string
    userName: string
    profilePhoto?: string 
    email: string
    password: string // encrypted
    favourites: UserFavourites[]
}

// special type of object being provided by this context
interface UserContextProps {
    currentUser: User | GuestUser | null
    handleUpdateUser: (user: GuestUser | User) => void
    isLoggedIn: boolean
}

const UserContext = React.createContext<UserContextProps>( {} as UserContextProps ) 

// Custom provider component for this User Context - render in top layout
export const UserProvider = (props: { children: React.ReactNode }) => {

    // store the current user in state at the top level
    const [currentUser, setCurrentUser] = useState<User | GuestUser | null>(null); // default user object
    const isLoggedIn = Boolean(currentUser && 'token' in currentUser);

    // need to load user data from cookie via useEffect to prevent hydration issues
    useEffect(() => {
        const userData = getCookie('user'); // official user account in database
        const guestUserData = getCookie('guestUser'); // non-logged in user, stores scores temporarily
        const cookieUser: User = userData ? JSON.parse(userData) : (guestUserData ? JSON.parse(guestUserData) : {} as User); // turns the user cookie object into a User
        setCurrentUser(cookieUser)
    },[])    

    // sets user object in state, shared via context
    const handleUpdateUser = (user: User | GuestUser) => {
        if ('token' in user) {
            setCookie('user', JSON.stringify(user), { path: '/', maxAge: 60 * 60 * 24 * 7}) // cookie will expire in a week
        } else if (user.currentScore != undefined) {
            setCookie('guestUser', JSON.stringify(user), { path: '/', maxAge: 60 * 60 * 24 * 7}) // cookie will expire in a week
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
