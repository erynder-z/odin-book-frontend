import { Oval } from 'react-loader-spinner';
import useTheme from '../../../hooks/useTheme';
import { AnimatePresence, motion } from 'framer-motion';

type LoadingSpinnerProps = {
    message?: string;
};

export default function LoadingSpinner({ message }: LoadingSpinnerProps) {
    const { theme } = useTheme();

    const brightThemeColor = 'rgba(0,0,0,0.4)';
    const darkThemeColor = 'rgba(255,255,255,0.4)';
    const highlightColor = '#0598BC';
    const darkHighlightColor = '#BC05BC';
    const firstColor = theme === 'bright' ? highlightColor : darkHighlightColor;
    const secondColor = theme === 'bright' ? brightThemeColor : darkThemeColor;

    return (
        <div className="w-full h-full flex flex-col justify-center items-center gap-4">
            <AnimatePresence>
                {message && (
                    <motion.h1
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="font-bold text-loading dark:text-loadingDark"
                    >
                        {message}
                    </motion.h1>
                )}{' '}
            </AnimatePresence>
            <Oval
                height={30}
                width={30}
                color={firstColor}
                wrapperStyle={{}}
                wrapperClass=""
                visible={true}
                ariaLabel="oval-loading"
                secondaryColor={secondColor}
                strokeWidth={5}
                strokeWidthSecondary={5}
            />
        </div>
    );
}
