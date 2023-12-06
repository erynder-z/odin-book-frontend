import { useState } from 'react';
import useAuth from '../../../../hooks/useAuth';
import useInfoCard from '../../../../hooks/useInfoCard';
import PollQuestionInput from './PollQuestionInput/PollQuestionInput';
import PollOptionsNumberDropdown from './PollOptionsNumberDropdown/PollOptionsNumberDropdown';
import PollOptionsInput from './PollOptionsInput/PollOptionsInput';
import PollDescriptionTextArea from './PollDescriptionTextArea/PollDescriptionTextArea';
import CreatePollButton from './CreatePollButton/CreatePollButton';
import { CreatedPollDataType } from '../../../../types/pollTypes';
import FriendsOnlyCheckbox from './PollRestrictions/FriendsOnlyCheckbox/FriendsOnlyCheckbox';
import CommentsCheckbox from './PollRestrictions/CommentsCheckbox/CommentsCheckbox';
import { useNavigate } from 'react-router-dom';
import { displaySuccessInfo } from '../../../UiElements/UserNotification/displaySuccessInfo';
import { displayErrorInfo } from '../../../UiElements/UserNotification/displayErrorInfo';

export default function NewPollInput() {
    const { token } = useAuth();
    const { setInfo } = useInfoCard();
    const navigate = useNavigate();

    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
    const [pollData, setPollData] = useState<CreatedPollDataType>({
        question: '',
        numberOfOptions: 2,
        options: ['', ''],
        description: '',
        isFriendOnly: false,
        allowComments: false,
    });

    const handleQuestionInputChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        const question = event.target.value;
        setPollData((prevData: CreatedPollDataType) => ({
            ...prevData,
            question: question,
        }));
    };

    const handleOptionsNumberSelect = (selectedNumber: number) => {
        const arrayWithGivenNumberOfEmptyStrings = Array.from(
            { length: selectedNumber },
            () => ''
        );
        setPollData((prevData: CreatedPollDataType) => ({
            ...prevData,
            numberOfOptions: selectedNumber,
            options: arrayWithGivenNumberOfEmptyStrings,
        }));
    };

    const handlePollOptionInputChange = (index: number, value: string) => {
        const updatedOptions = [...pollData.options];
        updatedOptions[index] = value;
        setPollData((prevData: CreatedPollDataType) => ({
            ...prevData,
            options: updatedOptions,
        }));
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (token) {
            setIsSubmitting(true);

            try {
                const SERVER_URL = import.meta.env.VITE_SERVER_URL;
                const response = await fetch(`${SERVER_URL}/api/v1/poll`, {
                    method: 'POST',
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(pollData),
                });

                if (response.ok) {
                    displaySuccessInfo(
                        setInfo,
                        'Poll created successfully!',
                        '👍'
                    );
                    setPollData({
                        question: '',
                        numberOfOptions: 1,
                        options: [''],
                        description: '',
                        isFriendOnly: false,
                        allowComments: false,
                    });
                } else {
                    const data = await response.json();
                    const errorMessages = data.errors;
                    const message = errorMessages
                        .map((error: { msg: string }) => error.msg)
                        .join(', ');

                    displayErrorInfo(setInfo, message, '👻');

                    throw new Error(
                        `Error: ${response.status} ${response.statusText}`
                    );
                }
            } catch (error) {
                displayErrorInfo(setInfo, "An error occurred'", '👻');
            }

            setIsSubmitting(false);
            navigate('/polls/list');
        }
    };

    const FormContent = (
        <form
            action=""
            method="POST"
            onSubmit={handleSubmit}
            className="flex flex-col w-full divide-gray-200"
        >
            <div className="flex flex-col gap-4 relative w-full text-base leading-6 space-y-4 text-gray-700 dark:text-gray-300 sm:text-lg sm:leading-7">
                <PollQuestionInput
                    pollData={pollData}
                    handleQuestionInputChange={handleQuestionInputChange}
                />
                <PollOptionsNumberDropdown
                    handleOptionsNumberSelect={handleOptionsNumberSelect}
                />
                <PollOptionsInput
                    pollData={pollData}
                    handlePollOptionInputChange={handlePollOptionInputChange}
                />
                <PollDescriptionTextArea
                    pollData={pollData}
                    setPollData={setPollData}
                />
                <FriendsOnlyCheckbox
                    pollData={pollData}
                    setPollData={setPollData}
                />
                <CommentsCheckbox
                    pollData={pollData}
                    setPollData={setPollData}
                />
            </div>
            <CreatePollButton pollData={pollData} isSubmitting={isSubmitting} />
        </form>
    );

    return (
        <div className="font-roboto flex gap-4 p-2 md:p-4 lg:w-full lg:flex-row lg:justify-around rounded lg:shadow-lg bg-card dark:bg-cardDark">
            {FormContent}
        </div>
    );
}
