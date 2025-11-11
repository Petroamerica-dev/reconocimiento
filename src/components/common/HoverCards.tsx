import { useRecognition } from '@/hooks/useRecognition';
import HoverCard from '../ui/HoverCard';
import { useState } from 'react';

export default function HoverCards() {
    const [activeCard, setActiveCard] = useState(2);
    const { valueOptions } = useRecognition();
    return (
        <div className=" flex  items-center justify-center md:min-h-[370px]">
            <div className="flex md:flex-row flex-col gap-6 items-center">
                {valueOptions.map((vo) => (
                    <HoverCard
                        key={vo.core_value_id}
                        value={vo}
                        activeCard={activeCard}
                        setActiveCard={setActiveCard}
                    />
                ))}
            </div>
        </div>
    );
}