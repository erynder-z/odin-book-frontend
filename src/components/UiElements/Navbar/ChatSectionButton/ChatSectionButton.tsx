import React from 'react';
import { MdOutlineChatBubbleOutline } from 'react-icons/md';
import { NavLink } from 'react-router-dom';

type ChatSectionButtonProps = {
    isChatDisabled: boolean;
};

export default function ChatSectionButton({
    isChatDisabled,
}: ChatSectionButtonProps) {
    return (
        <div
            className={`flex self-center cursor-pointer text-regularText dark:text-regularTextDark h-full w-full ${
                isChatDisabled ? 'disabled' : ''
            }`}
        >
            {isChatDisabled ? (
                <button type="button" disabled>
                    <MdOutlineChatBubbleOutline size="1.5em" />
                </button>
            ) : (
                <NavLink
                    to="/chat"
                    className={({ isActive }) =>
                        isActive
                            ? 'text-highlight dark:text-highlightDark flex self-center cursor-pointer h-6 w-full'
                            : 'text-regularText dark:text-regularTextDark flex self-center cursor-pointer h-6 w-full'
                    }
                >
                    <MdOutlineChatBubbleOutline size="1.5em" />
                </NavLink>
            )}
        </div>
    );
}
