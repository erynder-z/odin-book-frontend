import React, { useEffect, useState } from 'react';
import { CoverOption } from '../../../../../../types/coverOptionTypes';
import tinycolor from 'tinycolor2';
import { getColors } from '../../../../../../utilities/getColors';
import { COVER_OPTIONS } from '../../../SharedComponents/CoverOptions';

type NotFriendCoverSectionProps = {
    firstName: string;
    lastName: string;
    userPicture: string;
    cover?: string;
};

export default function NotFriendCoverSection({
    firstName,
    lastName,
    userPicture,
    cover,
}: NotFriendCoverSectionProps) {
    const [selectedCover, setSelectedCover] = useState<CoverOption | null>(
        null
    );
    const [colorPalette, setColorPalette] = useState<any>([]);

    const backgroundColor = colorPalette[0]?.hex;
    const textColor = tinycolor(backgroundColor).isDark()
        ? '#ffffff'
        : '#000000';

    function getUserCoverImage() {
        const userCover = cover;
        const displayCover = COVER_OPTIONS.find((coverImage) => {
            return coverImage.name === userCover;
        });
        return displayCover;
    }

    useEffect(() => {
        setSelectedCover(getUserCoverImage() || null);
    }, [cover]);

    useEffect(() => {
        setColorPalette([]);
        if (selectedCover) {
            const image = selectedCover?.image;
            getColors(image)
                .then((palette) => {
                    setColorPalette(palette);
                })
                .catch(console.error);
        }
    }, [selectedCover]);

    return (
        <div className="h-[calc(100vh_-_5rem)] md:h-96 grid grid-rows-4">
            <div className="relative row-span-3 flex ">
                <img
                    src={selectedCover?.image}
                    alt="cover image"
                    className="h-full w-full object-cover"
                />
            </div>
            <div
                className="relative row-span-1 flex flex-col md:flex-row gap-4 lg:p-4 bg-slate-300"
                style={
                    colorPalette[0]
                        ? {
                              backgroundColor: `${colorPalette[0].hex}`,
                              color: textColor,
                          }
                        : {}
                }
            >
                <img
                    className="w-20 h-fit object-cover rounded-full relative bottom-10 border-white border-2"
                    src={`data:image/png;base64,${userPicture}`}
                    alt="User avatar"
                />
                <div className="flex flex-col">
                    <h1 className=" text-center font-bold h-auto">
                        {firstName} {lastName}'s page
                    </h1>
                </div>
            </div>
        </div>
    );
}
