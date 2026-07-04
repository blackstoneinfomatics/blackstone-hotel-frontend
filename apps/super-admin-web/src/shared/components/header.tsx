"use client";

import { Menu } from "lucide-react";

interface HeaderProps {
    onMenuClick: () => void;
}

export default function Header({
    onMenuClick,
}: HeaderProps) {

    return (
        <header className="h-16 border-b flex items-center px-4">

            <button
                className="lg:hidden"
                onClick={onMenuClick}
            >
                <Menu />
            </button>

        </header>
    );
}