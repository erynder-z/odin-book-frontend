import React, { useEffect, useState } from 'react';
import SearchOverlay from '../Main/SearchOverlay/SearchOverlay';
import useDelayUnmount from '../../hooks/useDelayUnmount';
import EditUserDataModal from '../Main/EditUserDataModal/EditUserDataModal';
import OptionsCard from '../Main/OptionsCard/OptionsCard';

type OverlayHandlerProps = {
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

export default function OverlayHandler({
    shouldOverlaysShow,
    setShouldOverlaysShow,
}: OverlayHandlerProps) {
    const [isSearchOverlayMounted, setIsSearchOverlayMounted] = useState(
        shouldOverlaysShow.searchOverlay
    );
    const [isEditUserDataModalMounted, setIsEditUserDataModalMounted] =
        useState(shouldOverlaysShow.editUserDataModal);
    const [isMobileOptionsModalMounted, setIsMobileOptionsModalMounted] =
        useState(shouldOverlaysShow.mobileOptionsModal);

    const showSearchOverlay = useDelayUnmount(isSearchOverlayMounted, 150);
    const showEditUserDataModal = useDelayUnmount(
        isEditUserDataModalMounted,
        150
    );
    const showMobileOptionsModal = useDelayUnmount(
        isMobileOptionsModalMounted,
        150
    );

    useEffect(() => {
        setIsSearchOverlayMounted(shouldOverlaysShow.searchOverlay);
        setIsEditUserDataModalMounted(shouldOverlaysShow.editUserDataModal);
        setIsMobileOptionsModalMounted(shouldOverlaysShow.mobileOptionsModal);
    }, [shouldOverlaysShow]);

    return (
        <div className="relative z-50">
            {showSearchOverlay && (
                <SearchOverlay
                    shouldSearchOverlayShow={shouldOverlaysShow.searchOverlay}
                    setShouldOverlaysShow={setShouldOverlaysShow}
                />
            )}
            {showEditUserDataModal && (
                <EditUserDataModal
                    shouldEditUserDataModalShow={
                        shouldOverlaysShow.editUserDataModal
                    }
                    setShouldOverlaysShow={setShouldOverlaysShow}
                />
            )}
            {showMobileOptionsModal && (
                <div
                    className={`${
                        shouldOverlaysShow.mobileOptionsModal
                            ? 'animate-popInAnimation'
                            : 'animate-popOutAnimation'
                    } lg:hidden absolute bottom-10 right-0 mt-2 p-2 bg-canvas shadow-xl z-10`}
                >
                    <OptionsCard
                        shouldOverlaysShow={shouldOverlaysShow}
                        setShouldOverlaysShow={setShouldOverlaysShow}
                    />
                </div>
            )}
        </div>
    );
}
