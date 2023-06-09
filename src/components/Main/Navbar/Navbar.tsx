import React, { useEffect, useRef } from 'react';
import FriendSectionButton from './FriendSectionButton/FriendSectionButton';
import HomeSectionButton from './HomeSectionButton/HomeSectionButton';
import NavbarUserOptionsButton from './NavbarUserOptionsButton/NavbarUserOptionsButton';
import SearchButton from './SearchButton/SearchButton';
import MobileFriendSuggestionsButton from './MobileFriendSuggestionsButton/MobileFriendSuggestionsButton';
import ChatSectionButton from './ChatSectionButton/ChatSectionButton';

type NavbarProps = {
    shouldOverlaysShow: {
        searchOverlay: boolean;
        editUserDataModal: boolean;
        mobileOptionsModal: boolean;
    };
    setShouldOverlaysShow: React.Dispatch<
        React.SetStateAction<{
            searchOverlay: boolean;
            editUserDataModal: boolean;
            mobileOptionsModal: boolean;
        }>
    >;
};

export default function Navbar({
    shouldOverlaysShow,
    setShouldOverlaysShow,
}: NavbarProps) {
    const menuRef = useRef<HTMLDivElement>(null);

    const handleSearchButtonClick = () => {
        setShouldOverlaysShow({
            searchOverlay: true,
            editUserDataModal: false,
            mobileOptionsModal: false,
        });
    };

    const closeAllOverlays = () => {
        setShouldOverlaysShow({
            searchOverlay: false,
            editUserDataModal: false,
            mobileOptionsModal: false,
        });
    };

    const handleClickOutside = (event: MouseEvent) => {
        if (
            menuRef.current &&
            !menuRef.current.contains(event.target as Node)
        ) {
            closeAllOverlays();
        }
    };

    useEffect(() => {
        if (shouldOverlaysShow.mobileOptionsModal) {
            document.addEventListener('mousedown', handleClickOutside);
            return () => {
                document.removeEventListener('mousedown', handleClickOutside);
            };
        }
    }, [menuRef, shouldOverlaysShow.mobileOptionsModal]);

    return (
        <div className="h-full w-full flex justify-between items-center lg:items-start px-2 py-1 lg:py-2 bg-navbar">
            <div className="flex lg:flex-col justify-center items-center gap-4">
                <HomeSectionButton />
                <FriendSectionButton />
                <ChatSectionButton />
                <SearchButton
                    handleSearchButtonClick={handleSearchButtonClick}
                />
                <div className="md:hidden">
                    <MobileFriendSuggestionsButton />
                </div>
            </div>
            <div className="relative lg:hidden flex" ref={menuRef}>
                <button
                    type="button"
                    className="cursor-pointer"
                    onClick={() => {
                        setShouldOverlaysShow({
                            searchOverlay: false,
                            editUserDataModal: false,
                            mobileOptionsModal:
                                !shouldOverlaysShow.mobileOptionsModal,
                        });
                    }}
                >
                    <NavbarUserOptionsButton />
                </button>
            </div>
        </div>
    );
}
