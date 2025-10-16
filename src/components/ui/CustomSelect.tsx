import { useState, useRef, useEffect } from 'react';
import { Search, X } from 'lucide-react';
import type { SelectOption } from '@/types/global';
import Tooltip from './Tooltip';

interface Props {
    label: string;
    options: SelectOption[];
    selectedValue: SelectOption | null;
    onSelect: (value: SelectOption | null) => void;
    searchFuntion?: (searchTerm: string) => void;
}

export default function CustomSelect({
    label,
    options,
    selectedValue,
    onSelect,
    searchFuntion
}: Props) {
    const [isOpen, setIsOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const selectRef = useRef<HTMLDivElement>(null);
    const searchInputRef = useRef<HTMLInputElement>(null);

    const filteredOptions = options.filter(option =>
        option.label.toLowerCase().includes(searchTerm.toLowerCase()) ||
        option.value.toLowerCase().includes(searchTerm.toLowerCase())
    );

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (selectRef.current && !selectRef.current.contains(e.target as Node)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    useEffect(() => {
        if (isOpen && searchInputRef.current) {
            searchInputRef.current.focus();
        }
    }, [isOpen]);

    useEffect(() => {
        if (selectedValue) {
            setSearchTerm(selectedValue.label);
        } else {
            setSearchTerm('');
        }
    }, [selectedValue]);

    const handleSelect = (option: SelectOption) => {
        onSelect(option);
        setIsOpen(false);
        setSearchTerm(option.label);
    };

    const handleClearSearch = () => {
        setSearchTerm('');
        onSelect(null);
        if (searchInputRef.current) {
            searchInputRef.current.focus();
        }
    };

    return (
        <div className="mb-8">
            <div className="w-full">
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                    {label}
                </label>
                <div className="relative" ref={selectRef}>
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input
                            ref={searchInputRef}
                            type="text"
                            placeholder="Buscar..."
                            value={searchTerm}
                            onChange={(e) => {
                                setSearchTerm(e.target.value)
                                if (searchFuntion) {
                                    searchFuntion(e.target.value)
                                }
                            }}
                            className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                            onClick={(e) => {
                                e.stopPropagation();
                                setIsOpen(true);
                                setSearchTerm(selectedValue?.label || '');
                            }}
                        />
                        {searchTerm && (
                            <button
                                onClick={handleClearSearch}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                            >
                                <X className="w-4 h-4" />
                            </button>
                        )}
                    </div>
                    {isOpen && (
                        <div className="absolute w-full mt-2 bg-white border border-gray-200 rounded-xl shadow-2xl z-50 max-h-80 overflow-hidden flex flex-col">


                            <div className="overflow-y-auto">
                                {filteredOptions.length > 0 ? (
                                    filteredOptions.map((option) => (
                                        <div
                                            key={option.id}
                                            onClick={() => handleSelect(option)}
                                            className="px-4 py-3 hover:bg-indigo-50 cursor-pointer transition-colors flex items-center justify-between group"
                                        >
                                            <div className="flex-1 flex flex-col">
                                                <span className="text-gray-800">{option.label}</span>
                                                {option.sublabel && <span className="text-gray-800 text-xs">{option.sublabel}</span>}
                                            </div>
                                            {option.tooltip && (
                                                <div onClick={(e) => e.stopPropagation()}>
                                                    <Tooltip text={option.tooltip} position="left" />
                                                </div>
                                            )}
                                        </div>
                                    ))
                                ) : (
                                    <div className="px-4 py-8 text-center text-gray-400">
                                        No se encontraron resultados
                                    </div>
                                )}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}