import React from 'react';
import LogoutButton from './LogoutButton/LogoutButton';
import OptionsButton from './OptionsButton/OptionsButton';
import ProfilePageButton from './ProfilePageButton/ProfilePageButton';
import {
    TbLayoutSidebarRightExpand,
    TbLayoutSidebarLeftExpand,
} from 'react-icons/tb';

type OptionsCardProps = {
    shouldOverlaysShow: {
        searchOverlay: boolean;
        editUserDataModal: boolean;
        mobileOptionsModal: boolean;
        guestAccountOverlay: boolean;
    };
    setShouldOverlaysShow: React.Dispatch<
        React.SetStateAction<{
            searchOverlay: boolean;
            editUserDataModal: boolean;
            mobileOptionsModal: boolean;
            guestAccountOverlay: boolean;
        }>
    >;
    showSidebar?: boolean;
    toggleSidebar?: () => void;
};

export default function OptionsCard({
    shouldOverlaysShow,
    setShouldOverlaysShow,
    showSidebar,
    toggleSidebar,
}: OptionsCardProps) {
    return (
        <div className="flex flex-col gap-4 p-4 lg:w-full lg:flex-row lg:justify-around lg:shadow-md bg-canvas">
            {toggleSidebar && (
                <div onClick={toggleSidebar}>
                    {showSidebar ? (
                        <TbLayoutSidebarLeftExpand className="text-2xl" />
                    ) : (
                        <TbLayoutSidebarRightExpand className="text-2xl" />
                    )}
                </div>
            )}
            <ProfilePageButton setShouldOverlaysShow={setShouldOverlaysShow} />
            <OptionsButton
                shouldOverlaysShow={shouldOverlaysShow}
                setShouldOverlaysShow={setShouldOverlaysShow}
            />
            <LogoutButton />
        </div>
    );
}