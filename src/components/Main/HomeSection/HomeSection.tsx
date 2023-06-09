import React, { useEffect, useState } from 'react';
import { CurrentViewType } from '../../../types/currentViewType';
import useFriendData from '../../../hooks/useFriendData';
import LoadingSpinner from '../../LoadingSpinner/LoadingSpinner';
import Feed from './Feed/Feed';
import { FriendDataType } from '../../../types/friendDataType';

type HomeSectionProps = {
    setCurrentView: React.Dispatch<React.SetStateAction<CurrentViewType>>;
    isPaginationTriggered: boolean;
};

export default function HomeSection({
    setCurrentView,
    isPaginationTriggered,
}: HomeSectionProps) {
    const { friendData } = useFriendData();
    const [friendList, setFriendList] = useState<string[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    const extractFriendIdFromFriendData = (friendData: FriendDataType[]) => {
        const idArray: string[] = [];
        friendData?.map((friend) => {
            idArray.push(friend._id);
        });

        return idArray;
    };

    useEffect(() => {
        if (friendData) {
            setFriendList(extractFriendIdFromFriendData(friendData));
            setLoading(false);
        }
    }, [friendData]);

    useEffect(() => {
        setCurrentView('Home');
        localStorage.setItem('currentView', 'Home');
    }, []);

    if (loading) {
        return (
            <div className="flex flex-col justify-center items-center w-full h-full py-4 bg-canvas ">
                <h1 className="font-bold">Getting feed...</h1>
                <LoadingSpinner />
            </div>
        );
    }

    return (
        <div className="flex flex-col min-h-[calc(100vh_-_5rem)] lg:min-h-full lg:p-4 md:p-0 pb-4 bg-background2 shadow-lg">
            <h1 className="text-center text-xl font-bold">Your feed</h1>
            <Feed
                friendList={friendList}
                isPaginationTriggered={isPaginationTriggered}
            />
        </div>
    );
}
