import React, { createContext, useState, useContext, ReactNode, Component } from 'react';

// Define a type for your context
type UserContextType = {
    user: any; // Change 'any' to the actual type of user
    setUser: React.Dispatch<React.SetStateAction<any>>; // Change 'any' to the actual type of setUser
    theme: string;
    setTheme: React.Dispatch<React.SetStateAction<string>>;
    withNavbar: boolean;
    setWithNavbar: React.Dispatch<React.SetStateAction<boolean>>;
    page: string;
    setPage: React.Dispatch<React.SetStateAction<string>>;
    root: Component | null;
    setRoot: React.Dispatch<React.SetStateAction<Component | null>>;
    resetContext: () => void;
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export const useUserContext = () => {
    const context = useContext(UserContext);
    if (context === undefined) {
        throw new Error('useUserContext must be used within a UserProvider');
    }
    return context;
};

export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<any>(null); // Change 'any' to the actual type of user
    const [theme, setTheme] = useState<string>("dark");
    const [withNavbar, setWithNavbar] = useState<boolean>(true);

    const [page, setPage] = useState<string>("");
    const [root, setRoot] = useState<Component | null>(null);


    const resetContext = () => {
        setUser(null);
        setWithNavbar(true);
    }

    const contextValue: UserContextType = {
        user,
        setUser,
        theme,
        setTheme,
        withNavbar,
        setWithNavbar,
        page,
        setPage,
        resetContext,
        root,
        setRoot
    };

    return <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>;
};