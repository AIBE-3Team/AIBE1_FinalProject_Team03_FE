export const NOTIFICATION_TYPE = {
    SUCCESS: 'success',
    ERROR: 'error',
    INFO: 'info',
};

export const BOOKING_STATUS = {
    CONFIRMED: 'CONFIRMED',
    COMPLETED: 'COMPLETED',
    CANCELED: 'CANCELED',
};

export const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ko-KR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        weekday: 'long',
    });
};

export const formatDateTime = (dateTimeString) => {
    if (!dateTimeString) return '정보 없음';
    const date = new Date(dateTimeString);
    if (isNaN(date)) return '정보 없음';

    return date.toLocaleString('ko-KR', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
    });
};

export const formatPrice = (price) => {
    return new Intl.NumberFormat('ko-KR').format(price) + '원';
};

export function calculateTimeUntilConcert(concertDate, startTime) {
    const concertDateTime = new Date(`${concertDate}T${startTime}`);
    const now = new Date();
    const diff = concertDateTime - now;

    if (diff > 0) {
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

        if (days > 0) {
            return `${days}일 ${hours}시간 후`;
        } else if (hours > 0) {
            return `${hours}시간 ${minutes}분 후`;
        } else {
            return `${minutes}분 후`;
        }
    } else {
        return '공연 종료';
    }
}
