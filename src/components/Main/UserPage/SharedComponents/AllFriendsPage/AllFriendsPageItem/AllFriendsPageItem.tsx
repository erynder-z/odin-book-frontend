import { FriendDataType } from '../../../../../../types/friendTypes';
import { useNavigate } from 'react-router-dom';
import useCurrentUserData from '../../../../../../hooks/useCurrentUserData';

type AllFiendsPageItemProps = {
    friendData: FriendDataType;
};

export default function AllFiendsPageItem({
    friendData,
}: AllFiendsPageItemProps) {
    const navigate = useNavigate();
    const { currentUserData } = useCurrentUserData();
    const { _id, firstName, lastName, userpic } = friendData ?? {};

    const handleUserClick = () => {
        if (!currentUserData) return;

        const path = currentUserData?._id === _id ? '/mypage' : `/users/${_id}`;
        navigate(path);
    };

    return (
        <div
            onClick={handleUserClick}
            className="cursor-pointer rounded lg:rounded-lg"
        >
            <img
                className="w-40 h-auto aspect-square object-cover shadow-lg rounded"
                src={`data:image/png;base64,${userpic.data}`}
                alt="User avatar"
            />

            <div className="text-center text-xs font-bold p-1 break-all">
                {firstName} {lastName}
            </div>
        </div>
    );
}
