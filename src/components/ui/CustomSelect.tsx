interface Props {
    label: string;
    options: string[];
    selectedValue: string;
    setSelectedValue: (value: string) => void;
}

export default function CustomSelect({ label, options, selectedValue, setSelectedValue }: Props) {
    return (
        <div className="mb-8 animate-[fade-in_0.3s_ease-out]">
            <label className="block text-sm font-semibold text-gray-700 mb-3">
                {label}
            </label>
            <div className="relative">
                <select
                    value={selectedValue}
                    onChange={(e) => setSelectedValue(e.target.value)}
                    className="w-full px-4 py-3 pr-10 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none transition-colors appearance-none bg-white cursor-pointer hover:border-gray-300"
                    style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%23374151' d='M6 9L1 4h10z'/%3E%3C/svg%3E")`,
                        backgroundRepeat: 'no-repeat',
                        backgroundPosition: 'right 12px center',
                    }}
                >
                    <option value="" className="text-gray-500">-- Selecciona una opción --</option>
                    {options.map((option, idx) => (
                        <option
                            key={idx}
                            value={option}
                            className="py-2 px-4 hover:bg-blue-50"
                        >
                            {option}
                        </option>
                    ))}
                </select>
            </div>
        </div>
    );
}