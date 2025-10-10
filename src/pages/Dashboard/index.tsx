import { Award, ChevronLeft, ChevronRight, Medal, Trophy, Users, Zap } from "lucide-react";
import { useState } from "react";

// Types
interface Employee {
    id: number;
    name: string;
    email: string;
    area: string;
}

interface RecognitionDetail {
    id: number;
    description: string;
    count: number;
}

interface EmployeeRecognition {
    employee: Employee;
    leadership: RecognitionDetail[];
    efficiency: RecognitionDetail[];
    teamWork: RecognitionDetail[];
    totalRecognitions: number;
}

// Data de prueba
const employees: Employee[] = [
    { id: 1, name: 'JHON DOE', email: 'jhon.doe@company.com', area: 'Sistemas' },
    { id: 2, name: 'FRED TRUCKS', email: 'fred.trucks@company.com', area: 'Recursos Humanos' },
    { id: 3, name: 'CARMEN ANSCIOS', email: 'carmen.anscios@company.com', area: 'Recursos Humanos' },
    { id: 4, name: 'JHON2 DOE', email: 'jhon2.doe@company.com', area: 'Soporte TI' },
    { id: 5, name: 'FRED2 TRUCKS', email: 'fred2.trucks@company.com', area: 'Contabilidad' },
    { id: 6, name: 'CARMEN2 ANSCIOS', email: 'carmen2.anscios@company.com', area: 'Tesorería' },
];

const recognitionsData: EmployeeRecognition[] = [
    {
        employee: employees[0],
        leadership: [
            { id: 1, description: 'Inspiró al equipo', count: 5 },
            { id: 2, description: 'Decisiones estratégicas', count: 8 },
            { id: 3, description: 'Mentorizó compañeros', count: 7 },
        ],
        efficiency: [
            { id: 4, description: 'Optimizó procesos', count: 12 },
            { id: 5, description: 'Completó proyectos', count: 8 },
        ],
        teamWork: [],
        totalRecognitions: 40,
    },
    {
        employee: employees[1],
        leadership: [
            { id: 6, description: 'Resolvió conflictos', count: 3 },
        ],
        efficiency: [
            { id: 7, description: 'Redujo costos', count: 5 },
            { id: 8, description: 'Automatizó tareas', count: 7 },
        ],
        teamWork: [
            { id: 9, description: 'Colaboró activamente', count: 8 },
        ],
        totalRecognitions: 23,
    },
    {
        employee: employees[2],
        leadership: [
            { id: 10, description: 'Promovió ambiente positivo', count: 4 },
        ],
        efficiency: [
            { id: 11, description: 'Mejoró productividad', count: 6 },
        ],
        teamWork: [
            { id: 12, description: 'Apoyó compañeros', count: 5 },
            { id: 13, description: 'Compartió conocimientos', count: 3 },
        ],
        totalRecognitions: 18,
    },
    {
        employee: employees[3],
        leadership: [],
        efficiency: [],
        teamWork: [
            { id: 14, description: 'Integró nuevos miembros', count: 2 },
        ],
        totalRecognitions: 2,
    },
    {
        employee: employees[4],
        leadership: [],
        efficiency: [
            { id: 15, description: 'Optimizó procesos', count: 1 },
        ],
        teamWork: [],
        totalRecognitions: 1,
    },
    {
        employee: employees[5],
        leadership: [],
        efficiency: [],
        teamWork: [],
        totalRecognitions: 0,
    },
];

const recognitionTypes = {
    leadership: { icon: Award, color: 'text-blue-500', bgColor: 'bg-blue-100' },
    efficiency: { icon: Zap, color: 'text-yellow-500', bgColor: 'bg-yellow-100' },
    teamWork: { icon: Users, color: 'text-green-500', bgColor: 'bg-green-100' },
};


export default function Dashboard() {
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 4;

    const sortedEmployees = [...recognitionsData].sort((a, b) => b.totalRecognitions - a.totalRecognitions);

    const topThree = sortedEmployees.slice(0, 3);

    const totalLiderazgo = recognitionsData.reduce((sum, emp) =>
        sum + emp.leadership.reduce((s, r) => s + r.count, 0), 0);
    const totalEficiencia = recognitionsData.reduce((sum, emp) =>
        sum + emp.efficiency.reduce((s, r) => s + r.count, 0), 0);
    const totalTrabajoEquipo = recognitionsData.reduce((sum, emp) =>
        sum + emp.teamWork.reduce((s, r) => s + r.count, 0), 0);

    const totalPages = Math.ceil(sortedEmployees.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const paginatedEmployees = sortedEmployees.slice(startIndex, startIndex + itemsPerPage);

    // const getPodiumHeight = (position: number) => {
    //     if (position === 0) return 'h-32';
    //     if (position === 1) return 'h-40';
    //     return 'h-24';
    // };

    const getPodiumOrder = () => {
        if (topThree.length < 3) return topThree;
        return [topThree[1], topThree[0], topThree[2]];
    };

    const getRecognitionIcon = (type: keyof typeof recognitionTypes) => {
        const Icon = recognitionTypes[type].icon;
        return <Icon className={`w-4 h-4 ${recognitionTypes[type].color}`} />;
    };

    return (
        <div className="lg:p-0 px-10">
            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 pb-8">
                    <div className="lg:col-span-2 bg-white rounded-xl p-8">
                        <h2 className="text-2xl font-bold text-gray-800 mb-6">Top 3 Empleados</h2>
                        <div className="flex items-end justify-center gap-4 mb-8">
                            {getPodiumOrder().map((empRec, idx) => {
                                // const actualPosition = topThree.findIndex(e => e.employee.id === empRec.employee.id);
                                const heights = ['h-40', 'h-60', 'h-32'];
                                const positions = ['2', '1', '3'];
                                const colors = ['bg-gray-300', 'bg-yellow-400', 'bg-orange-300'];

                                return (
                                    <div key={empRec.employee.id} className="flex flex-col items-center flex-1">
                                        <div className="mb-3 text-center">
                                            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white font-bold text-xl mb-2 mx-auto">
                                                {empRec.employee.name.charAt(0)}
                                            </div>
                                            <p className="font-semibold text-sm text-gray-800">{empRec.employee.name}</p>
                                            <p className="text-xs text-gray-500">{empRec.employee.area}</p>
                                        </div>
                                        <div className={`w-full ${heights[idx]} ${colors[idx]} rounded-t-lg flex flex-col items-center justify-start pt-4 relative`}>
                                            <Trophy className="w-8 h-8 text-white mb-2" />
                                            <span className="text-3xl font-bold text-white">{positions[idx]}</span>
                                            <span className="text-sm text-white font-semibold mt-2">
                                                {empRec.totalRecognitions} reconocimientos
                                            </span>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>

                        {/* Totales por categoría */}
                        <div className="grid grid-cols-3 gap-4">
                            <div className="bg-blue-50 rounded-lg p-4 border-2 border-blue-200">
                                <div className="flex items-center gap-2 mb-2">
                                    <Award className="w-5 h-5 text-blue-500" />
                                    <span className="font-semibold text-gray-700 text-sm">LIDERAZGO</span>
                                </div>
                                <div className="flex items-center">
                                    <div className="flex-1 bg-gray-200 rounded-full h-2 mr-3">
                                        <div
                                            className="bg-blue-500 h-2 rounded-full"
                                            style={{ width: `${(totalLiderazgo / 100) * 100}%` }}
                                        />
                                    </div>
                                    <span className="font-bold text-gray-800">{totalLiderazgo}</span>
                                </div>
                            </div>

                            <div className="bg-yellow-50 rounded-lg p-4 border-2 border-yellow-200">
                                <div className="flex items-center gap-2 mb-2">
                                    <Zap className="w-5 h-5 text-yellow-500" />
                                    <span className="font-semibold text-gray-700 text-sm">EFICIENCIA</span>
                                </div>
                                <div className="flex items-center">
                                    <div className="flex-1 bg-gray-200 rounded-full h-2 mr-3">
                                        <div
                                            className="bg-yellow-500 h-2 rounded-full"
                                            style={{ width: `${(totalEficiencia / 100) * 100}%` }}
                                        />
                                    </div>
                                    <span className="font-bold text-gray-800">{totalEficiencia}</span>
                                </div>
                            </div>

                            <div className="bg-green-50 rounded-lg p-4 border-2 border-green-200">
                                <div className="flex items-center gap-2 mb-2">
                                    <Users className="w-5 h-5 text-green-500" />
                                    <span className="font-semibold text-gray-700 text-sm">TRABAJO EN EQUIPO</span>
                                </div>
                                <div className="flex items-center">
                                    <div className="flex-1 bg-gray-200 rounded-full h-2 mr-3">
                                        <div
                                            className="bg-green-500 h-2 rounded-full"
                                            style={{ width: `${(totalTrabajoEquipo / 450) * 100}%` }}
                                        />
                                    </div>
                                    <span className="font-bold text-gray-800">{totalTrabajoEquipo}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-xl p-6">
                        <h2 className="text-xl font-bold text-gray-800 mb-4">Empleados Reconocidos</h2>

                        <div className="space-y-3 mb-6">
                            {paginatedEmployees.map((empRec, index) => {
                                const globalIndex = startIndex + index;
                                const allDetails = [
                                    ...empRec.leadership.map(d => ({ ...d, type: 'leadership' as const })),
                                    ...empRec.efficiency.map(d => ({ ...d, type: 'efficiency' as const })),
                                    ...empRec.teamWork.map(d => ({ ...d, type: 'teamWork' as const })),
                                ].sort((a, b) => b.count - a.count);

                                const topTwo = allDetails.slice(0, 2);
                                const remaining = allDetails.slice(2).reduce((sum, d) => sum + d.count, 0);

                                return (
                                    <div key={empRec.employee.id} className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                                        <div className="flex items-center gap-3 mb-3">
                                            {globalIndex < 3 && (
                                                <Medal className={`w-5 h-5 ${globalIndex === 0 ? 'text-yellow-500' :
                                                    globalIndex === 1 ? 'text-gray-400' :
                                                        'text-orange-400'
                                                    }`} />
                                            )}
                                            <div className="flex-1">
                                                <h3 className="font-bold text-gray-800 text-sm">{empRec.employee.name}</h3>
                                                <p className="text-xs text-gray-500">{empRec.employee.area}</p>
                                            </div>
                                            <span className="text-lg font-bold text-gray-700">{empRec.totalRecognitions}</span>
                                        </div>

                                        <div className="flex gap-2 flex-wrap">
                                            {topTwo.map((detail) => (
                                                <div key={detail.id} className="flex items-center gap-1.5 bg-white px-2.5 py-1.5 rounded-md border border-gray-200 text-xs">
                                                    {getRecognitionIcon(detail.type)}
                                                    <span className="font-medium text-gray-700">+{detail.count}</span>
                                                </div>
                                            ))}
                                            {remaining > 0 && (
                                                <div className="flex items-center bg-gray-200 px-2.5 py-1.5 rounded-md text-xs">
                                                    <span className="font-medium text-gray-700">+{remaining}</span>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>

                        <div className="flex items-center justify-center gap-2">
                            <button
                                onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                                disabled={currentPage === 1}
                                className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                            >
                                <ChevronLeft className="w-5 h-5 text-gray-600" />
                            </button>

                            <span className="text-sm text-gray-600 font-medium">
                                Página {currentPage} de {totalPages}
                            </span>

                            <button
                                onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                                disabled={currentPage === totalPages}
                                className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                            >
                                <ChevronRight className="w-5 h-5 text-gray-600" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
