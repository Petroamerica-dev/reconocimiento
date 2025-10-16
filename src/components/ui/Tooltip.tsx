import { CircleHelp } from "lucide-react";
import { useState } from "react";

interface TooltipProps {
    text: string;
    position?: 'top' | 'bottom' | 'left' | 'right';
    maxWidth?: string;
}

export default function Tooltip({ text, position = 'top', maxWidth = '100px' }: TooltipProps) {
    const [isVisible, setIsVisible] = useState(false);

    const positionClasses = {
        top: 'bottom-full left-1/2 -translate-x-1/2 mb-2',
        bottom: 'top-full left-1/2 -translate-x-1/2 mt-2',
        left: 'right-full top-1/2 -translate-y-1/2 mr-2',
        right: 'left-full top-1/2 -translate-y-1/2 ml-2'
    };

    const arrowClasses = {
        top: 'top-full left-1/2 -translate-x-1/2 border-l-transparent border-r-transparent border-b-transparent border-t-gray-900',
        bottom: 'bottom-full left-1/2 -translate-x-1/2 border-l-transparent border-r-transparent border-t-transparent border-b-gray-900',
        left: 'left-full top-1/2 -translate-y-1/2 border-t-transparent border-b-transparent border-r-transparent border-l-gray-900',
        right: 'right-full top-1/2 -translate-y-1/2 border-t-transparent border-b-transparent border-l-transparent border-r-gray-900'
    };

    return (
        <div className="relative inline-block">
            <button
                className="cursor-pointer hover:text-gray-600"
                onMouseEnter={() => setIsVisible(true)}
                onMouseLeave={() => setIsVisible(false)}
                onClick={(e) => e.preventDefault()}
                type="button"
            >
                <CircleHelp className="text-gray-400 w-5 h-5" />
            </button>

            {isVisible && (
                <div
                    className={`absolute z-0 px-3 py-2 text-sm text-white bg-gray-900 rounded-lg shadow-lg whitespace-nowrap max-w-[${maxWidth}] ${positionClasses[position]}`}
                >
                    {text}
                    <div
                        className={`absolute w-0 h-0 border-4 ${arrowClasses[position]}`}
                    />
                </div>
            )}
        </div>
    );
};