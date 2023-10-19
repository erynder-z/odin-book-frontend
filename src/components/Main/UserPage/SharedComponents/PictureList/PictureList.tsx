import { useEffect, useRef, useState } from 'react';
import useAuth from '../../../../../hooks/useAuth';
import useInfoCard from '../../../../../hooks/useInfoCard';
import { ImageType } from '../../../../../types/miscTypes';
import LoadingSpinner from '../../../../UiElements/LoadingSpinner/LoadingSpinner';
import { convertDatabaseImageToBase64 } from '../../../../../utilities/convertDatabaseImageToBase64';
import LightBox from '../../../../UiElements/LightBox/LightBox';
import { MdKeyboardDoubleArrowRight, MdZoomOutMap } from 'react-icons/md';
import { Link } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { backendFetch } from '../../../../../utilities/backendFetch';

type PictureListProps = {
    onFetchComplete: (nameOfComponent: string) => void;
    userId: string | undefined;
};

export default function PictureList({
    onFetchComplete,
    userId,
}: PictureListProps) {
    const { token } = useAuth();
    const { setInfo } = useInfoCard();
    const [pictures, setPictures] = useState<ImageType[]>([]);
    const [numberOfPictures, setNumberOfPictures] = useState<number>(0);
    const [selectedImage, setSelectedImage] = useState<ImageType | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    const shouldInitialize = useRef(true);

    const handleFetchUserPics = async () => {
        if (token && userId) {
            const skip = 0;
            const apiEndpointURLList = `/api/v1/users/${userId}/picture?skip=${skip}`;
            const apiEndpointURLNumber = `/api/v1/users/${userId}/count_pictures`;
            const method = 'GET';
            const errorMessageList = 'Unable to fetch pictures!';
            const errorMessageNumber = 'Unable to fetch number of pictures!';
            let pictureListResponse;
            let numberOfPicsResponse;
            try {
                pictureListResponse = await backendFetch(
                    token,
                    setInfo,
                    apiEndpointURLList,
                    method,
                    errorMessageList
                );
                numberOfPicsResponse = await backendFetch(
                    token,
                    setInfo,
                    apiEndpointURLNumber,
                    method,
                    errorMessageNumber
                );
                setPictures([...pictureListResponse.images]);
                setNumberOfPictures(numberOfPicsResponse?.count);
                setLoading(false);
                onFetchComplete('pictureList');
            } catch (error) {
                setLoading(false);
                onFetchComplete('pictureList');
            }

            shouldInitialize.current = false;
        }
    };

    const handleImageClick = (image: ImageType) => setSelectedImage(image);

    useEffect(() => {
        if (shouldInitialize.current === true) handleFetchUserPics();
    }, [userId]);

    const pictureList = pictures?.map((picture) => (
        <div
            key={picture.id}
            className="relative flex rounded outline-highlight dark:outline-highlightDark hover:outline"
        >
            <img
                className="h-auto aspect-square object-cover  rounded"
                src={`data:image/png;base64,${convertDatabaseImageToBase64(
                    picture
                )}`}
                alt="User uploaded image"
            />
            <div
                onClick={() => handleImageClick(picture)}
                className="absolute inset-0 flex justify-center items-center aspect-square bg-black bg-opacity-75 opacity-0 hover:opacity-80 transition-opacity cursor-pointer rounded"
            >
                <span className="text-white text-lg font-bold">
                    <MdZoomOutMap size="1.5em" />
                </span>
            </div>
        </div>
    ));

    const LoadingContent = (
        <div className="flex justify-center items-center w-full py-4">
            <LoadingSpinner />
        </div>
    );

    const PictureListContent =
        pictureList.length > 0 ? (
            pictureList
        ) : (
            <span className="col-span-3 text-sm font-medium">
                Nothing here yet
            </span>
        );

    const SeeAllPicturesButton = (
        <Link
            to={`/users/${userId}/gallery`}
            className="flex items-center justify-center md:justify-start gap-2 w-full md:w-fit bg-button dark:bg-buttonDark hover:bg-buttonHover dark:hover:bg-buttonDarkHover text-regularTextDark rounded px-2 py-1 mt-4 text-sm"
        >
            See all <MdKeyboardDoubleArrowRight size="1.25em" />
        </Link>
    );

    return (
        <div>
            <h1 className="font-bold">Pictures</h1>

            {loading ? (
                LoadingContent
            ) : (
                <div className="animate-inAnimation grid grid-cols-3 gap-4">
                    {PictureListContent}
                </div>
            )}

            {numberOfPictures > 9 && SeeAllPicturesButton}
            <AnimatePresence>
                {selectedImage && (
                    <LightBox
                        image={selectedImage}
                        onClose={() => setSelectedImage(null)}
                    />
                )}
            </AnimatePresence>
        </div>
    );
}
