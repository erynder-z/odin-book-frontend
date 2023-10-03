import { InfoType } from '../types/infoTypes';
import { handleFetchErrors } from './handleFetchErrors';

export const handlePostReaction = async (
    token: string,
    setInfo: (info: InfoType | null) => void,
    _id: string,
    reaction: string
) => {
    try {
        const serverURL = import.meta.env.VITE_SERVER_URL;
        const response = await fetch(
            `${serverURL}/api/v1/post/${_id}/${reaction}`,
            {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            }
        );

        if (!response.ok) handleFetchErrors(response, setInfo);

        setInfo({
            typeOfInfo: 'good',
            message: 'Reaction successful!',
            icon: '😎',
        });
    } catch (err: unknown) {
        setInfo({
            typeOfInfo: 'bad',
            message: 'Unable to fetch posts!',
            icon: '👻',
        });
    }
};