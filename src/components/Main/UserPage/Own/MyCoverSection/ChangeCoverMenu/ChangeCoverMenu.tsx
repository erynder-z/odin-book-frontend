import { MdKeyboardArrowUp } from 'react-icons/md';
import { COVER_OPTIONS } from '../../../SharedComponents/CoverOptions';
import { CoverOption } from '../../../../../../types/miscTypes';
import { motion, Variants } from 'framer-motion';

type ChangeCoverMenuProps = {
    showMenu: boolean;
    handleCloseButtonCLick: () => void;
    handleCoverOptionClick: (coverImage: CoverOption) => void;
};

/**
 * React component for rendering a menu to change the cover image.
 *
 * @component
 * @param {ChangeCoverMenuProps} props - The component props.
 * @param {boolean} props.showMenu - Indicates whether the menu is visible.
 * @param {() => void} props.handleCloseButtonCLick - Callback function to handle the close button click.
 * @param {(coverImage: CoverOption) => void} props.handleCoverOptionClick - Callback function to handle cover option click.
 * @returns {JSX.Element} The rendered ChangeCoverMenu component.
 */
export default function ChangeCoverMenu({
    showMenu,
    handleCloseButtonCLick,
    handleCoverOptionClick,
}: ChangeCoverMenuProps): JSX.Element {
    const CloseButton = (
        <button
            onClick={handleCloseButtonCLick}
            className="flex justify-center w-full cursor-pointer hover:bg-highlight dark:hover:bg-highlightDark"
        >
            <MdKeyboardArrowUp size="2em" />
        </button>
    );

    const itemVariants: Variants = {
        open: {
            opacity: 1,
            y: 0,
            transition: { type: 'spring', stiffness: 300, damping: 24 },
        },
        closed: { opacity: 0, y: 20, transition: { duration: 0.2 } },
    };

    /**
     * JSX Element representing the menu list.
     *
     * @type {JSX.Element[]}
     */
    const MenuList: JSX.Element[] = COVER_OPTIONS.map((coverImage, index) => (
        <motion.li
            key={index}
            variants={itemVariants}
            className="flex justify-center p-2 cursor-pointer hover:bg-highlight dark:hover:bg-highlightDark"
            onClick={() => handleCoverOptionClick(coverImage)}
        >
            <img
                src={coverImage.image}
                alt={`cover option ${index + 1}`}
                className="w-20 h-12 object-cover"
            />
        </motion.li>
    ));

    /**
     * JSX Element representing the entire ChangeCoverMenu.
     *
     * @type {JSX.Element}
     */
    return (
        <motion.div
            key="coverMenu"
            initial={false}
            animate={showMenu ? 'open' : 'closed'}
        >
            <motion.div
                variants={{
                    open: {
                        clipPath: 'inset(0% 0% 0% 0% round 10px)',
                        transition: {
                            type: 'spring',
                            bounce: 0,
                            duration: 0.7,
                            delayChildren: 0.3,
                            staggerChildren: 0.05,
                        },
                    },
                    closed: {
                        clipPath: 'inset(10% 50% 90% 50% round 10px)',
                        transition: {
                            type: 'spring',
                            bounce: 0,
                            duration: 0.3,
                        },
                    },
                }}
                style={{ pointerEvents: showMenu ? 'auto' : 'none' }}
                className="absolute right-0 md:right-8 top-4 z-10 flex flex-col w-full md:w-fit bg-background1/80 dark:bg-background1Dark/80 text-regularText  dark:text-regularTextDark  border-regularText dark:border-regularTextDark text-xs rounded"
            >
                {CloseButton}
                <ul className="p-0">{MenuList}</ul>
            </motion.div>
        </motion.div>
    );
}
