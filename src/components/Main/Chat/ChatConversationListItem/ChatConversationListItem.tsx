import { MinimalUserTypes } from '../../../../types/otherUserTypes';
import { getCorrectUserpicFormat } from '../../../../utilities/getCorrectUserpicFormat';
import { motion } from 'framer-motion';

type ChatConversationListItemProps = {
    listItemData: MinimalUserTypes | null;
};

export default function ChatConversationListItem({
    listItemData,
}: ChatConversationListItemProps) {
    const { firstName, lastName, userpic } = listItemData || {};

    const LoadingContent = (
        <div className="w-full flex items-center gap-2">
            <div className="w-8 h-8 object-cover rounded-full bg-gray-600/50 animate-pulse"></div>
            <div className="hidden md:block bg-gray-600/50 animate-pulse h-4 w-1/2"></div>
        </div>
    );

    const ChatConversationListItemContent = (
        <motion.div
            whileTap={{ scale: 0.97 }}
            className="flex items-center gap-2"
        >
            <img
                loading="lazy"
                className="w-8 h-8 object-cover rounded-full"
                src={`data:image/png;base64,${getCorrectUserpicFormat(
                    userpic
                )}`}
                alt="User avatar"
            />
            <div className="hidden md:block overflow-hidden whitespace-nowrap text-ellipsis text-sm">
                {firstName} {lastName}
            </div>
        </motion.div>
    );

    return !listItemData ? LoadingContent : ChatConversationListItemContent;
}
