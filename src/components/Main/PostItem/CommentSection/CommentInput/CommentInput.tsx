import React, { useState } from 'react';
import useAuth from '../../../../../hooks/useAuth';
import useInfoCard from '../../../../../hooks/useInfoCard';
import {
    FaExclamationTriangle,
    FaRegSmile,
    FaRegSmileBeam,
} from 'react-icons/fa';
import EmojiSelector from '../../../NewPostInput/EmojiSelector/EmojiPicker';

type CommentInputProps = {
    parentPostID: string;
    getPostDetails: (postID: string) => Promise<void>;
};

export default function CommentInput({
    parentPostID,
    getPostDetails,
}: CommentInputProps) {
    const { token } = useAuth();
    const { setInfo } = useInfoCard();
    const [commentText, setCommentText] = useState<string>('');

    const [showEmojiPicker, setShowEmojiPicker] = useState<boolean>(false);

    const handleInputChange = (
        event: React.ChangeEvent<HTMLTextAreaElement>
    ) => {
        setCommentText(event.target.value);
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (token) {
            const body = {
                newComment: commentText,
            };

            const serverURL = import.meta.env.VITE_SERVER_URL;
            const id = parentPostID;
            const response = await fetch(
                `${serverURL}/api/v1/post/${id}/comment`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify(body),
                }
            );

            if (response.ok) {
                setInfo({
                    typeOfInfo: 'good',
                    message: 'Comment created successfully!',
                    icon: <FaRegSmile />,
                });
                setCommentText('');
                getPostDetails(parentPostID);
            } else {
                const data = await response.json();
                const errorMessages = data.errors;
                const message = errorMessages
                    .map((error: { msg: string }) => error.msg)
                    .join(', ');

                setInfo({
                    typeOfInfo: 'bad',
                    message: message,
                    icon: <FaExclamationTriangle />,
                });

                throw new Error(
                    `Error: ${response.status} ${response.statusText}`
                );
            }
        }
    };

    return (
        <>
            <form onSubmit={handleSubmit}>
                <div className="flex gap-4">
                    <textarea
                        className="w-full p-2 mb-2 bg-gray-200 text-sm focus:outline-none focus:shadow-outline"
                        placeholder="Write a comment..."
                        value={commentText}
                        onChange={handleInputChange}
                    />
                    <button
                        onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            setShowEmojiPicker(!showEmojiPicker);
                        }}
                        className="text-back hover:text-blue-500"
                    >
                        <FaRegSmileBeam />
                    </button>
                </div>
                <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4"
                    type="submit"
                    disabled={!commentText}
                >
                    Submit
                </button>
            </form>
            {showEmojiPicker && (
                <EmojiSelector
                    setText={setCommentText}
                    setShowEmojiPicker={setShowEmojiPicker}
                />
            )}
        </>
    );
}
