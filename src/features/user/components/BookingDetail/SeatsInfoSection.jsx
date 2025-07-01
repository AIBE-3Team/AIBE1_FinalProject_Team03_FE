import { Ticket } from 'lucide-react';

export function SeatInfoSection({ seatList }) {
    return (
        <div className="bg-gray-800 rounded-3xl p-8">
            <h3 className="text-2xl font-bold mb-6 flex items-center">
                <Ticket className="mr-3 text-purple-400" size={24} />
                좌석 정보
                <span className="ml-3 text-sm font-normal bg-purple-500 text-white px-3 py-1 rounded-full">
                    {seatList.length}매
                </span>
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {seatList.map((seat, index) => (
                    <div key={index} className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl p-4 text-center">
                        <div className="text-white font-bold text-lg mb-1">{seat}</div>
                        <div className="text-purple-100 text-sm">티켓 {index + 1}</div>
                    </div>
                ))}
            </div>
        </div>
    );
}
