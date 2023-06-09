import { createContext, useEffect, useState } from 'react';
import useAuth from '../hooks/useAuth';
import useInfoCard from '../hooks/useInfoCard';
import { CurrentUserDataContextProps } from '../types/currentUserDataContextTypes';
import { CurrentUserDataType } from '../types/currentUserDataType';
import { fetchUserData } from '../utilities/fetchUserData';

const CurrentUserDataContext = createContext<CurrentUserDataContextProps>({
    currentUserData: null,
    setCurrentUserData: () => null,
    handleFetchUserData: () => null,
});

export const CurrentUserDataContextProvider = ({
    children,
}: {
    children: React.ReactNode;
}) => {
    // Retrieve token, authenticated user and authentication status from the useAuth hook
    const { token, authUser, isAuth } = useAuth();

    // Retrieve setInfo function from the useInfoCard hook
    const { setInfo } = useInfoCard();

    // Declare userData state with initial value of null
    const [currentUserData, setCurrentUserData] =
        useState<CurrentUserDataType | null>(null);

    // Define trigger function
    const handleFetchUserData = async () => {
        if (authUser && token) {
            const response = await fetchUserData(token, setInfo);
            setCurrentUserData(response);
        }
    };

    // Clear userData state if authentication status changes to false
    useEffect(() => {
        setCurrentUserData(null);
    }, [!isAuth]);

    // Fetch user data if the token and authenticated user are both present
    useEffect(() => {
        if (authUser && token) {
            /*    fetchUserData(token, setUserData, setInfo); */
            handleFetchUserData();
        }
    }, [isAuth]);

    return (
        <CurrentUserDataContext.Provider
            value={{ currentUserData, setCurrentUserData, handleFetchUserData }}
        >
            {children}
        </CurrentUserDataContext.Provider>
    );
};

export default CurrentUserDataContext;
