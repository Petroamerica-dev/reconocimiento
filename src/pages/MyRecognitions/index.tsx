import { useState } from 'react';
import { Award, Users, Zap, Calendar, MessageSquare, User, TrendingUp, Target, Star } from 'lucide-react';

interface Employee {
    id: number;
    name: string;
    email: string;
    area: string;
    avatar?: string;
}

interface Recognition {
    id: number;
    type: 'leadership' | 'efficiency' | 'teamWork';
    description: string;
    message?: string;
    date: string;
    givenBy: Employee;
}

interface RecognitionStats {
    total: number;
    leadership: number;
    efficiency: number;
    teamWork: number;
    thisMonth: number;
    lastMonth: number;
    ranking: number;
    totalEmployees: number;
}

const currentUser: Employee = {
    id: 1,
    name: 'JHON DOE',
    email: 'jhon.doe@company.com',
    area: 'Sistemas'
};

const recognitions: Recognition[] = [
    {
        id: 1,
        type: 'efficiency',
        description: 'Optimizó procesos clave',
        message: '¡Excelente trabajo optimizando el sistema de reportes! Redujiste el tiempo de generación en un 70%.',
        date: '2025-09-28',
        givenBy: { id: 2, name: 'María González', email: 'maria.gonzalez@company.com', area: 'Gerencia' }
    },
    {
        id: 2,
        type: 'leadership',
        description: 'Inspiró al equipo en momentos difíciles',
        message: 'Tu actitud positiva durante la crisis del servidor fue clave para mantener al equipo motivado.',
        date: '2025-09-25',
        givenBy: { id: 3, name: 'Carlos Ramírez', email: 'carlos.ramirez@company.com', area: 'Desarrollo' }
    },
    {
        id: 3,
        type: 'efficiency',
        description: 'Completó proyectos antes del plazo',
        message: '',
        date: '2025-09-22',
        givenBy: { id: 4, name: 'Ana López', email: 'ana.lopez@company.com', area: 'Proyectos' }
    },
    {
        id: 4,
        type: 'leadership',
        description: 'Mentorizó a compañeros nuevos',
        message: 'Gracias por dedicar tiempo a enseñar las mejores prácticas a los nuevos desarrolladores.',
        date: '2025-09-20',
        givenBy: { id: 5, name: 'Roberto Silva', email: 'roberto.silva@company.com', area: 'Recursos Humanos' }
    },
    {
        id: 5,
        type: 'efficiency',
        description: 'Automatizó tareas repetitivas',
        message: 'El script que creaste nos ahorra 5 horas semanales. ¡Increíble!',
        date: '2025-09-18',
        givenBy: { id: 2, name: 'María González', email: 'maria.gonzalez@company.com', area: 'Gerencia' }
    },
    {
        id: 6,
        type: 'leadership',
        description: 'Tomó decisiones estratégicas acertadas',
        message: '',
        date: '2025-09-15',
        givenBy: { id: 6, name: 'Pedro Morales', email: 'pedro.morales@company.com', area: 'Operaciones' }
    },
    {
        id: 7,
        type: 'efficiency',
        description: 'Mejoró la productividad del equipo',
        message: 'La nueva metodología que implementaste ha mejorado nuestra velocidad de entrega.',
        date: '2025-09-12',
        givenBy: { id: 3, name: 'Carlos Ramírez', email: 'carlos.ramirez@company.com', area: 'Desarrollo' }
    },
    {
        id: 8,
        type: 'leadership',
        description: 'Resolvió conflictos de manera efectiva',
        message: 'Tu mediación en el conflicto entre equipos fue ejemplar. Gracias por tu profesionalismo.',
        date: '2025-09-10',
        givenBy: { id: 7, name: 'Laura Fernández', email: 'laura.fernandez@company.com', area: 'Gerencia' }
    },
    {
        id: 9,
        type: 'efficiency',
        description: 'Optimizó procesos clave',
        message: '',
        date: '2025-09-08',
        givenBy: { id: 4, name: 'Ana López', email: 'ana.lopez@company.com', area: 'Proyectos' }
    },
    {
        id: 10,
        type: 'leadership',
        description: 'Promovió un ambiente positivo',
        message: 'Tu energía positiva es contagiosa. El equipo se siente más unido gracias a ti.',
        date: '2025-09-05',
        givenBy: { id: 5, name: 'Roberto Silva', email: 'roberto.silva@company.com', area: 'Recursos Humanos' }
    },
    {
        id: 11,
        type: 'efficiency',
        description: 'Redujo costos significativamente',
        message: 'La optimización de la infraestructura cloud que propusiste nos ahorrará $2000 mensuales.',
        date: '2025-09-02',
        givenBy: { id: 8, name: 'Diego Vargas', email: 'diego.vargas@company.com', area: 'Finanzas' }
    },
    {
        id: 12,
        type: 'leadership',
        description: 'Inspiró al equipo en momentos difíciles',
        message: '',
        date: '2025-08-30',
        givenBy: { id: 2, name: 'María González', email: 'maria.gonzalez@company.com', area: 'Gerencia' }
    }
];

const stats: RecognitionStats = {
    total: 40,
    leadership: 5,
    efficiency: 20,
    teamWork: 15,
    thisMonth: 12,
    lastMonth: 8,
    ranking: 1,
    totalEmployees: 45
};

const recognitionTypes = {
    leadership: {
        icon: Award,
        color: 'text-blue-500',
        bgColor: 'bg-blue-50',
        borderColor: 'border-blue-200',
        label: 'Liderazgo'
    },
    efficiency: {
        icon: Zap,
        color: 'text-yellow-500',
        bgColor: 'bg-yellow-50',
        borderColor: 'border-yellow-200',
        label: 'Eficiencia'
    },
    teamWork: {
        icon: Users,
        color: 'text-green-500',
        bgColor: 'bg-green-50',
        borderColor: 'border-green-200',
        label: 'Trabajo en Equipo'
    },
};

export default function MyRecognitions() {
    const [selectedFilter, setSelectedFilter] = useState<'all' | 'leadership' | 'efficiency' | 'teamWork'>('all');

    const filteredRecognitions = selectedFilter === 'all'
        ? recognitions
        : recognitions.filter(r => r.type === selectedFilter);

    const growthPercentage = stats.lastMonth > 0
        ? ((stats.thisMonth - stats.lastMonth) / stats.lastMonth * 100).toFixed(0)
        : 100;

    const formatDate = (dateStr: string) => {
        const date = new Date(dateStr);
        const months = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];
        return `${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`;
    };

    return (
        <div className="lg:p-0 md:p-10 p-4">
            <div className="max-w-7xl mx-auto">
                <div className="mb-8">
                    <div className="flex items-center gap-4 mb-4">
                        <div className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white font-bold text-3xl ">
                            {currentUser.name.charAt(0)}
                        </div>
                        <div>
                            <h1 className="text-4xl font-bold text-white">{currentUser.name}</h1>
                            <p className="text-gray-200">{currentUser.area}</p>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    <div className="bg-white rounded-xl  p-6 border-l-4 border-blue-500">
                        <div className="flex items-center justify-between mb-2">
                            <span className="text-gray-600 text-sm font-semibold">Total Reconocimientos</span>
                            <Star className="w-5 h-5 text-blue-500" />
                        </div>
                        <p className="text-3xl font-bold text-gray-800">{stats.total}</p>
                    </div>

                    <div className="bg-white rounded-xl  p-6 border-l-4 border-green-500">
                        <div className="flex items-center justify-between mb-2">
                            <span className="text-gray-600 text-sm font-semibold">Este Mes</span>
                            <TrendingUp className="w-5 h-5 text-green-500" />
                        </div>
                        <div className="flex items-end gap-2">
                            <p className="text-3xl font-bold text-gray-800">{stats.thisMonth}</p>
                            <span className="text-green-600 text-sm font-semibold mb-1">+{growthPercentage}%</span>
                        </div>
                    </div>

                    <div className="bg-white rounded-xl  p-6 border-l-4 border-purple-500">
                        <div className="flex items-center justify-between mb-2">
                            <span className="text-gray-600 text-sm font-semibold">Ranking</span>
                            <Target className="w-5 h-5 text-purple-500" />
                        </div>
                        <p className="text-3xl font-bold text-gray-800">#{stats.ranking}</p>
                        <span className="text-gray-500 text-xs">de {stats.totalEmployees} colaboradores</span>
                    </div>

                    <div className="bg-white rounded-xl  p-6 border-l-4 border-orange-500">
                        <div className="flex items-center justify-between mb-2">
                            <span className="text-gray-600 text-sm font-semibold">Más Fuerte En</span>
                            <Zap className="w-5 h-5 text-orange-500" />
                        </div>
                        <p className="text-2xl font-bold text-gray-800">Eficiencia</p>
                        <span className="text-gray-500 text-xs">{stats.efficiency} reconocimientos</span>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="bg-white rounded-xl  p-6">
                        <h2 className="text-xl font-bold text-gray-800 mb-4">Por Categoría</h2>

                        <div className="space-y-4">
                            <div className="bg-blue-50 rounded-lg p-4 border-2 border-blue-200">
                                <div className="flex items-center justify-between mb-2">
                                    <div className="flex items-center gap-2">
                                        <Award className="w-5 h-5 text-blue-500" />
                                        <span className="font-semibold text-gray-700">Liderazgo</span>
                                    </div>
                                    <span className="text-2xl font-bold text-blue-600">{stats.leadership}</span>
                                </div>
                                <div className="w-full bg-blue-200 rounded-full h-2">
                                    <div
                                        className="bg-blue-500 h-2 rounded-full transition-all duration-500"
                                        style={{ width: `${(stats.leadership / stats.total) * 100}%` }}
                                    />
                                </div>
                            </div>

                            <div className="bg-yellow-50 rounded-lg p-4 border-2 border-yellow-200">
                                <div className="flex items-center justify-between mb-2">
                                    <div className="flex items-center gap-2">
                                        <Zap className="w-5 h-5 text-yellow-500" />
                                        <span className="font-semibold text-gray-700">Eficiencia</span>
                                    </div>
                                    <span className="text-2xl font-bold text-yellow-600">{stats.efficiency}</span>
                                </div>
                                <div className="w-full bg-yellow-200 rounded-full h-2">
                                    <div
                                        className="bg-yellow-500 h-2 rounded-full transition-all duration-500"
                                        style={{ width: `${(stats.efficiency / stats.total) * 100}%` }}
                                    />
                                </div>
                            </div>

                            <div className="bg-green-50 rounded-lg p-4 border-2 border-green-200">
                                <div className="flex items-center justify-between mb-2">
                                    <div className="flex items-center gap-2">
                                        <Users className="w-5 h-5 text-green-500" />
                                        <span className="font-semibold text-gray-700">Trabajo en Equipo</span>
                                    </div>
                                    <span className="text-2xl font-bold text-green-600">{stats.teamWork}</span>
                                </div>
                                <div className="w-full bg-green-200 rounded-full h-2">
                                    <div
                                        className="bg-green-500 h-2 rounded-full transition-all duration-500"
                                        style={{ width: `${(stats.teamWork / stats.total) * 100}%` }}
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="mt-6 p-4 bg-gradient-to-br from-purple-50 to-pink-50 rounded-lg border border-purple-200">
                            <p className="text-sm text-gray-700 mb-2">
                                <span className="font-bold">¡Sigue así!</span> Estás en el top 5% de colaboradores más reconocidos.
                            </p>
                            <div className="flex items-center gap-2">
                                <div className="flex-1 bg-purple-200 rounded-full h-2">
                                    <div className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full w-[95%]" />
                                </div>
                                <span className="text-xs font-bold text-purple-600">95%</span>
                            </div>
                        </div>
                    </div>

                    <div className="lg:col-span-2 bg-white rounded-xl  p-6">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-xl font-bold text-gray-800">Historial de Reconocimientos</h2>
                            <div className="flex gap-2">
                                <button
                                    onClick={() => setSelectedFilter('all')}
                                    className={`px-3 py-1.5 rounded-lg text-sm font-semibold transition-colors ${selectedFilter === 'all'
                                        ? 'bg-gray-800 text-white'
                                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                        }`}
                                >
                                    Todos
                                </button>
                                {Object.entries(recognitionTypes).map(([key, type]) => {
                                    const Icon = type.icon;
                                    return (
                                        <button
                                            key={key}
                                            onClick={() => setSelectedFilter(key as any)}
                                            className={`px-3 py-1.5 rounded-lg text-sm font-semibold transition-colors flex items-center gap-1 ${selectedFilter === key
                                                ? `${type.bgColor} ${type.color} border-2 ${type.borderColor}`
                                                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                                }`}
                                        >
                                            <Icon className="w-4 h-4" />
                                        </button>
                                    );
                                })}
                            </div>
                        </div>

                        <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2">
                            {filteredRecognitions.map((recognition) => {
                                const typeConfig = recognitionTypes[recognition.type];
                                const Icon = typeConfig.icon;

                                return (
                                    <div
                                        key={recognition.id}
                                        className={`${typeConfig.bgColor} rounded-lg p-5 border-2 ${typeConfig.borderColor}  transition-all`}
                                    >
                                        <div className="flex items-start gap-4">
                                            <div className={`w-12 h-12 rounded-full ${typeConfig.bgColor} flex items-center justify-center border-2 ${typeConfig.borderColor}`}>
                                                <Icon className={`w-6 h-6 ${typeConfig.color}`} />
                                            </div>

                                            <div className="flex-1">
                                                <div className="flex items-start justify-between mb-2">
                                                    <div>
                                                        <h3 className="font-bold text-gray-800 mb-1">{recognition.description}</h3>
                                                        <span className={`text-xs font-semibold ${typeConfig.color} px-2 py-1 rounded-full bg-white`}>
                                                            {typeConfig.label}
                                                        </span>
                                                    </div>
                                                    <div className="flex items-center gap-1 text-gray-500 text-sm">
                                                        <Calendar className="w-4 h-4" />
                                                        <span>{formatDate(recognition.date)}</span>
                                                    </div>
                                                </div>

                                                {recognition.message && (
                                                    <div className="bg-white rounded-lg p-3 mb-3 border border-gray-200">
                                                        <div className="flex items-start gap-2">
                                                            <MessageSquare className="w-4 h-4 text-gray-400 mt-0.5 flex-shrink-0" />
                                                            <p className="text-sm text-gray-700 italic">{recognition.message}</p>
                                                        </div>
                                                    </div>
                                                )}

                                                <div className="flex items-center gap-2 text-sm text-gray-600">
                                                    <User className="w-4 h-4" />
                                                    <span>Reconocido por <span className="font-semibold">{recognition.givenBy.name}</span></span>
                                                    <span className="text-gray-400">•</span>
                                                    <span className="text-gray-500">{recognition.givenBy.area}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}