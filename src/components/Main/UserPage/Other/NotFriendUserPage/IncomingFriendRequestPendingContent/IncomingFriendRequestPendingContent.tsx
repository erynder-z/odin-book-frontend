import { OtherUserPageDataTypes } from '../../../../../../types/otherUserTypes';
import useAuth from '../../../../../../hooks/useAuth';
import useCurrentUserData from '../../../../../../hooks/useCurrentUserData';
import useFriendData from '../../../../../../hooks/useFriendData';
import useInfoCard from '../../../../../../hooks/useInfoCard';
import { acceptFriendRequest } from '../../../../../../utilities/acceptFriendRequest';
import { declineFriendRequest } from '../../../../../../utilities/declineFriendRequest';
import { motion } from 'framer-motion';

type IncomingFriendRequestPendingContentProps = {
    userPageData: OtherUserPageDataTypes | Record<string, never>;
};

export default function IncomingFriendRequestPendingContent({
    userPageData,
}: IncomingFriendRequestPendingContentProps) {
    const { token } = useAuth();
    const { currentUserData, handleFetchUserData } = useCurrentUserData();
    const { handleFetchFriendData } = useFriendData();
    const { setInfo } = useInfoCard();

    const { _id, firstName, lastName } = userPageData || {};

    const currentUserId = currentUserData?._id;
    const otherUserId = _id;

    const handleAcceptFriendRequest = () => {
        if (currentUserId && token) {
            acceptFriendRequest(
                token,
                currentUserId,
                otherUserId,
                handleFetchUserData,
                handleFetchFriendData,
                setInfo
            );
        }
    };

    const handleDeclineFriendRequest = () => {
        if (currentUserId && token) {
            declineFriendRequest(
                token,
                currentUserId,
                otherUserId,
                handleFetchUserData,
                handleFetchFriendData,
                setInfo
            );
        }
    };

    const UserNameSection = (
        <>
            {firstName} {lastName} already sent you a friend request!
        </>
    );

    const AcceptButton = (
        <button
            onClick={handleAcceptFriendRequest}
            className="bg-green-500 text-regularTextDark text-xs px-2 py-1 hover:bg-green-600"
        >
            Accept
        </button>
    );

    const DeclineButton = (
        <button
            onClick={handleDeclineFriendRequest}
            className="bg-red-500 text-regularTextDark text-xs px-2 py-1 hover:bg-red-600"
        >
            Decline
        </button>
    );

    return (
        <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="flex flex-col gap-4 p-4 text-center"
        >
            {UserNameSection}
            <div className="col-span-5 place-content-center flex items-center gap-4">
                {AcceptButton}
                {DeclineButton}
            </div>
        </motion.div>
    );
}
