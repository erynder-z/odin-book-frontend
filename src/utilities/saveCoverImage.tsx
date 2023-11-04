import { InfoType } from '../types/infoTypes';
import { handleFetchErrors } from './handleFetchErrors';

export const saveCoverImage = async (
    token: string,
    coverImageName: string | null,
    handleFetchUserData: () => void,
    setInfo: (info: InfoType | null) => void
) => {
    try {
        const serverURL = import.meta.env.VITE_SERVER_URL;
        const requestBody = {
            coverImageName,
        };
        const response = await fetch(`${serverURL}/api/v1/userdata/cover`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(requestBody),
        });

        if (!response.ok) handleFetchErrors(response, setInfo);

        const successInfo = {
            typeOfInfo: 'good',
            message: 'Saved!',
            icon: '👍',
        };

        setInfo(successInfo as InfoType);
        handleFetchUserData();
    } catch (err: unknown) {
        const errorInfo = {
            typeOfInfo: 'bad',
            message: 'Unable to save!',
            icon: '👻',
        };
        setInfo(errorInfo as InfoType);
    }
};
