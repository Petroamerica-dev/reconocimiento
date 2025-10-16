import type { ValueOption } from '@/types/global';
import { useState } from 'react'

interface Props {
    value: ValueOption,
    activeCard: number,
    setActiveCard: (id: number) => void
}

export default function HoverCard({ value, activeCard, setActiveCard }: Props) {
    const [showDescription, setShowDescription] = useState(false);
    return (
        <div
            key={value.valueId}
            onMouseEnter={() => setActiveCard(value.valueId)}
            className={`
${value.borderColor}
border-2
bg-white/5
backdrop-blur-sm
rounded-2xl
px-8
py-6

transition-all
duration-500
ease-out
${activeCard === value.valueId
                    ? 'scale-110 shadow-xl ' + value.shadowColor
                    : 'scale-90 opacity-70 hover:opacity-90'
                }
`}
            style={{
                width: activeCard === value.valueId ? '300px' : '250px',
            }}
        >
            <div className="h-full flex flex-col justify-between text-center gap-2">
                <div>
                    <h2 className={`text-3xl font-bold text-white  ${activeCard === value.valueId ? 'text-3xl' : 'text-xl'}`}>
                        {value.name}
                    </h2>
                </div>
                {showDescription && activeCard === value.valueId && (
                    <p className={`text-white text-sm font-medium`}>
                        {value.description}
                    </p>
                )}

                <div className="h-2 bg-white/20 rounded-full overflow-hidden mb-2">
                    <div
                        className={`h-full ${value.bgGradient} rounded-full transition-all duration-700`}
                        style={{ width: activeCard === value.valueId ? '100%' : '60%' }}
                    />
                </div>

                <button
                    onClick={() => setShowDescription(!showDescription)}
                    className={`
                cursor-pointer
  w-full py-2 rounded-lg font-semibold
  transition-all duration-300
  ${activeCard === value.valueId
                            ? 'bg-white/20 text-white border-2 border-white/30'
                            : 'bg-white/10 text-gray-300 border-2 border-white/10'
                        }
`}>
                    Ver {showDescription ? 'menos' : 'más'}
                </button>
            </div>
        </div>
    )
}
