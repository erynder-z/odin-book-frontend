import { useEffect, useRef, useState } from 'react';
import useInfoCard from '../../../hooks/useInfoCard';
import { backendFetch } from '../../../utilities/backendFetch';
import { motion, useMotionValue, useTransform, animate } from 'framer-motion';

/**
 * Renders a greeting section with a dynamic count of users.
 *
 * @component
 * @return {JSX.Element} The rendered GreetingSection component.
 */
export default function GreetingSection(): JSX.Element {
    const { setInfo } = useInfoCard();
    const [numberOfUsers, setNumberOfUsers] = useState<number>(0);

    const shouldGetNumberOfUsers = useRef(true);

    const API_ENDPOINT_URL = '/api/v1/users/count';
    const METHOD = 'GET';
    const ERROR_MESSAGE = 'Unable to fetch number of users!';

    const count = useMotionValue(0);
    const rounded = useTransform(count, Math.round);

    /**
     * Animates the count value to the new number of users.
     *
     * @param {number} newCount - The new count of users.
     * @return {void}
     */
    useEffect(() => {
        if (numberOfUsers !== 0) {
            const animation = animate(count, numberOfUsers, { duration: 1 });

            return animation.stop;
        }
    }, [numberOfUsers]);

    /**
     * Retrieves the number of users from the API.
     *
     * @return {Promise<void>} - A promise that resolves when the number of users is retrieved.
     */
    useEffect(() => {
        const getNumberOfUsers = async () => {
            const token = undefined;
            const response = await backendFetch(
                token,
                setInfo,
                API_ENDPOINT_URL,
                METHOD,
                ERROR_MESSAGE
            );
            setNumberOfUsers(response?.numberOfUsers);
        };

        if (shouldGetNumberOfUsers.current) getNumberOfUsers();

        return () => {
            shouldGetNumberOfUsers.current = false;
        };
    }, []);

    /**
     * Renders the GreetingSection component.
     *
     * @return {JSX.Element} The rendered GreetingSection component.
     */
    return (
        <section className="text-white font-monospaceFont font-medium md:text-3xl text-center bg-cBlack/75 p-4 lg:rounded w-5/6 mx-auto">
            <h1 className="text-xl md:text-3xl font-medium">
                Welcome to{' '}
                <span className="text-4xl font-bold text-cCyan">
                    Tomodachi-Link
                </span>
                !
            </h1>
            Join our community of{' '}
            <motion.span className="text-4xl font-bold text-cCyan">
                {rounded}
            </motion.span>{' '}
            users!
        </section>
    );
}
