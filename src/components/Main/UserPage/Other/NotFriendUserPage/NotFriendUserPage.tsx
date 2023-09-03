import React, { useState } from 'react';
import { OtherUserPageDataTypes } from '../../../../../types/otherUserPageDataTypes';
import { convertDatabaseImageToBase64 } from '../../../../../utilities/convertDatabaseImageToBase64';
import NormalContent from './NormalContent/NormalContent';
import IncomingFriendRequestPendingContent from './IncomingFriendRequestPendingContent/IncomingFriendRequestPendingContent';
import NotFriendCoverSection from './NotFriendCoverSection/NotFriendCoverSection';
import { FinalColor } from 'extract-colors';
import tinycolor from 'tinycolor2';
import { motion } from 'framer-motion';

type NotFriendUserPageProps = {
    userPageData: OtherUserPageDataTypes | Record<string, never>;
    isFriendRequestPending: {
        incoming: boolean;
        outgoing: boolean;
    };
};

export default function NotFriendUserPage({
    userPageData,
    isFriendRequestPending,
}: NotFriendUserPageProps) {
    const { firstName, lastName, userpic, cover } = userPageData || {};

    const [colorPalette, setColorPalette] = useState<FinalColor[]>([]);
    const backgroundColor = colorPalette[0]?.hex;
    const textColor = tinycolor(backgroundColor).isDark()
        ? '#e4e6ea'
        : '#020202';

    const userPicture = convertDatabaseImageToBase64(userpic);

    return (
        <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="flex flex-col min-h-[calc(100vh_-_5rem)] lg:min-h-full p-4 md:p-0 pb-4 bg-card dark:bg-cardDark text-regularText dark:text-regularTextDark"
        >
            <NotFriendCoverSection
                firstName={firstName}
                lastName={lastName}
                userPicture={userPicture}
                cover={cover}
                backgroundColor={backgroundColor}
                textColor={textColor}
                setColorPalette={setColorPalette}
            />
            <div className="animate-popInAnimation my-auto">
                {isFriendRequestPending.incoming ? (
                    <IncomingFriendRequestPendingContent
                        userPageData={userPageData}
                    />
                ) : (
                    <NormalContent
                        userPageData={userPageData}
                        isFriendRequestPending={isFriendRequestPending}
                    />
                )}
            </div>
        </motion.div>
    );
}
