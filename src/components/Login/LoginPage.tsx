import { useContext, useEffect, useRef, useState } from 'react';
import AuthContext from '../../contexts/AuthContext';
import LoginForm from './LoginForm';
import { FaExclamationTriangle } from 'react-icons/fa';
import SignupPage from './SignupPage/SignupPage';
import useInfoCard from '../../hooks/useInfoCard';
import VerifyingInfoBox from './VerifyingInfoBox';
import { generateAsciiImage } from '../../utilities/generateAsciiImage';
import { introBackground } from '../../assets/intro';
import useAuth from '../../hooks/useAuth';
import GreetingSection from './GreetingSection/GreetingSection';
import RegisterButton from './RegisterButton/RegisterButton';
import GuestLoginButton from './GuestLoginButton/GuestLoginButton';

export default function LoginPage() {
    const { setToken } = useContext(AuthContext);
    const { isAuth } = useAuth();
    const { setInfo } = useInfoCard();

    const [isVerifying, setIsVerifying] = useState<boolean>(false);
    const [showSignup, setShowSignup] = useState<boolean>(false);
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

    const shouldRenderAscii = useRef(true);

    const login = async (username: string, password: string) => {
        setIsVerifying(true);
        setInfo(null);

        try {
            const serverURL = import.meta.env.VITE_SERVER_URL;
            const response = await fetch(`${serverURL}/api/v1/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password }),
            });

            if (!response.ok) {
                const data = await response.json();
                const errorMessage = data.error.message;

                setInfo({
                    typeOfInfo: 'bad',
                    message: errorMessage,
                    icon: <FaExclamationTriangle />,
                });

                throw new Error(
                    `Error: ${response.status} ${response.statusText}`
                );
            }

            const data = await response.json();
            localStorage.setItem('jwtOdinBook', data.token);
            setToken(data.token);
        } catch (error: unknown) {
            console.error(error);
            setIsVerifying(false);
        }
    };

    const handleLoginSubmit = async (
        event: React.FormEvent<HTMLFormElement>
    ) => {
        event.preventDefault();

        setIsSubmitting(true);

        const usernameInput = event.currentTarget.querySelector(
            '[name="username"]'
        ) as HTMLInputElement;

        const passwordInput = event.currentTarget.querySelector(
            '[name="password"]'
        ) as HTMLInputElement;

        const username = usernameInput.value;
        const password = passwordInput.value;

        try {
            await login(username, password);
        } catch (error) {
            setInfo({
                typeOfInfo: 'bad',
                message: 'Something went wrong!',
                icon: <FaExclamationTriangle />,
            });
        }
        setIsSubmitting(false);
    };

    const handleRegisterClick = () => {
        setShowSignup(true);
    };

    const handleGuestLogin = async () => {
        setIsSubmitting(true);

        const serverURL = import.meta.env.VITE_SERVER_URL;
        const response = await fetch(`${serverURL}/api/v1/guest`);
        const data = await response.json();

        const guestUsername = data.guestLoginData.username;
        const guestPassword = data.guestLoginData.password;

        try {
            await login(guestUsername, guestPassword);
        } catch (error) {
            setInfo({
                typeOfInfo: 'bad',
                message: 'Something went wrong!',
                icon: <FaExclamationTriangle />,
            });
        }
        setIsSubmitting(false);
    };

    useEffect(() => {
        if (isAuth) {
            setIsVerifying(false);
        }
    }, [isAuth]);

    useEffect(() => {
        if (shouldRenderAscii.current === true) {
            generateAsciiImage(introBackground, 'asciiArtCanvas', 15);
        }
        return () => {
            shouldRenderAscii.current = false;
        };
    }, []);

    return (
        <div className="h-screen bg-cBlack">
            <div className="absolute inset-0 z-0">
                <canvas
                    id="asciiArtCanvas"
                    className="h-full w-full object-cover"
                ></canvas>
            </div>
            <div className="flex flex-col lg:grid lg:grid-cols-2 justify-center items-center w-full h-full gap-4 relative z-10">
                {showSignup ? (
                    <SignupPage setShowSignup={setShowSignup} />
                ) : (
                    <>
                        <GreetingSection />
                        <div className="animate-inAnimation h-3/5 w-5/6 md:w-1/2 mx-auto px-4 lg:py-10 bg-white shadow-lg sm:p-10">
                            {isVerifying ? (
                                <VerifyingInfoBox />
                            ) : (
                                <>
                                    <LoginForm
                                        handleLoginSubmit={handleLoginSubmit}
                                        isSubmitting={isSubmitting}
                                    />
                                    <div className="flex flex-col gap-8 w-full">
                                        <RegisterButton
                                            handleRegisterClick={
                                                handleRegisterClick
                                            }
                                        />
                                        <GuestLoginButton
                                            handleGuestLogin={handleGuestLogin}
                                            isSubmitting={isSubmitting}
                                        />
                                    </div>
                                </>
                            )}
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}