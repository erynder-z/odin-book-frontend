import React from 'react';
import { MdExpandMore } from 'react-icons/md';
import './ToggleListButton.css';

type ToggleListButtonProps = {
    onToggleListButtonClick: () => void;
    showMenu?: boolean;
};

export default function ToggleListButton({
    onToggleListButtonClick,
    showMenu,
}: ToggleListButtonProps) {
    return (
        <div
            className={`ml-auto rotate-on-hover ${
                showMenu ? 'rotate-up' : 'rotate-down'
            }`}
            onClick={onToggleListButtonClick}
        >
            <MdExpandMore size="2em" />
        </div>
    );
}
