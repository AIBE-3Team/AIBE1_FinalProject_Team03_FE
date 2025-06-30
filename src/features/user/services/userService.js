import apiClient from '../../../shared/utils/apiClient'; // 공통 apiClient 임포트

export const userService = {
    getUserInfo: async () => {
        const response = await apiClient.get('/mypage/profile');
        if (response.data) {
            return response.data;
        }
    },

    updateUserInfo: async (userInfo) => {
        try {
            const response = await apiClient.post('/mypage/profile', userInfo, {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
            });
            return { success: true, data: response.data };
        } catch (error) {
            return { success: false, error: error.message || '회원 정보 수정 중 오류가 발생했습니다.' };
        }
    },

    changePassword: async (passwordData) => {
        try {
            await apiClient.post('/mypage/changePwd', passwordData, {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
            });
            return { success: true };
        } catch (error) {
            return { success: false, error: error.message || '비밀번호 변경 중 오류가 발생했습니다.' };
        }
    },

    getBookingHistory: async (userId) => {
        const response = await apiClient.get('/mypage/booking', userId);
        if (response.data) {
            return response.data;
        }
    },
};
