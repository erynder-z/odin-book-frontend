import React, { useEffect, useState } from 'react';
import useAuth from '../../../../../hooks/useAuth';
import { MinimalUserTypes } from '../../../../../types/minimalUserTypes';
import { fetchMinimalUserData } from '../../../../../utilities/fetchMinimalUserData';
import useInfoOverlay from '../../../../../hooks/useInfoOverlay';
import LoadingSpinner from '../../../../LoadingSpinner/LoadingSpinner';
import useUserData from '../../../../../hooks/useUserData';
import { acceptFriendRequest } from '../../../../../utilities/acceptFriendRequest';

type Props = {
    friendRequestUserId: string;
};

export default function FriendRequestListItem({ friendRequestUserId }: Props) {
    const { token } = useAuth();
    const { userData } = useUserData();
    const { setInfo } = useInfoOverlay();
    const [loading, setLoading] = useState<boolean>(true);
    const [friendRequestData, setFriendRequestData] = useState<
        MinimalUserTypes | Record<string, never>
    >({});

    const { _id, first_name, last_name, userpic } = friendRequestData || {};

    const userPic = userpic?.data?.data
        ? window.btoa(
              String.fromCharCode(
                  ...new Uint8Array(friendRequestData.userpic.data.data)
              )
          )
        : '';

    const handleAcceptFriendRequest = () => {
        if (userData && token) {
            const currentUserId = userData?._id;
            const requestUserId = friendRequestData._id;

            acceptFriendRequest(token, currentUserId, requestUserId, setInfo);
        }
    };

    const handleDeclineFriendRequest = () => {
        //
    };

    useEffect(() => {
        const fetchUserData = async () => {
            if (token) {
                const response = await fetchMinimalUserData(
                    token,
                    friendRequestUserId,
                    setInfo
                );
                setFriendRequestData(response);
                setLoading(false);
            }
        };

        fetchUserData();
    }, []);

    if (loading) {
        return (
            <div className="flex justify-center items-center w-full py-4 ">
                <LoadingSpinner />
            </div>
        );
    }

    return (
        <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2">
                <img
                    className="w-7 h-7 object-cover rounded-full"
                    src={`data:image/png;base64,${userPic}`}
                    alt="User avatar"
                />
                <div className="break-all">
                    {first_name} {last_name}
                </div>
            </div>
            <div className="flex items-center gap-4">
                <button
                    onClick={handleAcceptFriendRequest}
                    className="bg-green-500 text-white text-xs rounded-md px-2 py-1 hover:bg-green-600"
                >
                    Accept
                </button>
                <button
                    onClick={handleDeclineFriendRequest}
                    className="bg-red-500 text-white text-xs rounded-md px-2 py-1 hover:bg-red-600"
                >
                    Decline
                </button>
            </div>
        </div>
    );
}
