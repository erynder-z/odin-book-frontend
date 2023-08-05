import React from 'react';
import { MinimalUserTypes } from '../../../../types/minimalUserTypes';
import { getCorrectUserpicFormat } from '../../../../utilities/getCorrectUserpicFormat';

type ChatConversationListItemProps = {
    listItemData: MinimalUserTypes | null;
};

export default function ChatConversationListItem({
    listItemData,
}: ChatConversationListItemProps) {
    const { firstName, lastName, userpic } = listItemData || {};

    return (
        <div className="flex items-center w-full gap-4 p-2 text-regularText bg-card/50 hover:bg-cBlue/50 rounded-3xl">
            <img
                loading="lazy"
                className="w-8 h-8 object-cover rounded-full"
                src={`data:image/png;base64,${getCorrectUserpicFormat(
                    userpic
                )}`}
                alt="User avatar"
            />
            <div className="overflow-hidden whitespace-nowrap text-ellipsis">
                {firstName} {lastName}
            </div>
        </div>
    );
}