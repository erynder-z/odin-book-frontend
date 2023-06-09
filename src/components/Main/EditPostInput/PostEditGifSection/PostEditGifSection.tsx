import React from 'react';
import { FaTimes } from 'react-icons/fa';

type PostEditGifSectionProps = {
    dbGif: string;
    handleGifDelete: () => void;
};

export default function PostEditGifSection({
    dbGif,
    handleGifDelete,
}: PostEditGifSectionProps) {
    const handleRemoveButtonClick = (
        e: React.MouseEvent<HTMLButtonElement, MouseEvent>
    ) => {
        e.preventDefault();
        handleGifDelete();
    };
    return (
        <div className="relative flex justify-center w-full">
            <img
                className="max-h-20 md:max-h-none max-w-3/4 object-contain shadow-lg cursor-pointer"
                src={dbGif}
                alt="User uploaded gif"
            />
            <button
                onClick={(e) => {
                    handleRemoveButtonClick(e);
                }}
                className="absolute top-0 right-0 text-red-500 z-5"
            >
                <FaTimes size="1.25rem" />
            </button>
        </div>
    );
}
