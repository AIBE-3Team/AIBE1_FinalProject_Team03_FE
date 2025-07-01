import { CheckCircle, AlertCircle } from 'lucide-react';
import { NOTIFICATION_TYPE } from '../../services/bookingDetailService';

export function NotificationSection({ notification }) {
    return (
        <div
            className={`fixed top-4 right-4 z-50 px-6 py-3 rounded-lg shadow-lg transform transition-all duration-300 ${
                notification.type === 'success'
                    ? 'bg-green-500'
                    : notification.type === NOTIFICATION_TYPE.ERROR
                    ? 'bg-red-500'
                    : 'bg-blue-500'
            }`}
        >
            <div className="flex items-center space-x-2">
                {notification.type === 'success' && <CheckCircle size={20} />}
                {notification.type === NOTIFICATION_TYPE.ERROR && <XCircle size={20} />}
                {notification.type === 'info' && <AlertCircle size={20} />}
                <span className="font-medium">{notification.message}</span>
            </div>
        </div>
    );
}
