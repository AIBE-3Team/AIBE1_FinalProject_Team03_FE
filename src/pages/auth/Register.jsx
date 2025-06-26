import React, { useState } from 'react';
import { Eye, EyeOff, Mail, User, Phone, MapPin, UserPlus, Upload } from 'lucide-react';

export default function TicketMonSignup() {
    const [formData, setFormData] = useState({
        email: '',
        username: '',
        password: '',
        name: '',
        nickname: '',
        phoneNumber: '',
        address: '',
    });
    const [showPassword, setShowPassword] = useState(false);
    const [agreeTerms, setAgreeTerms] = useState(false);
    const [profileImage, setProfileImage] = useState(null);

    const handleInputChange = (field) => (e) => {
        setFormData((prev) => ({
            ...prev,
            [field]: e.target.value,
        }));
    };

    const handleFileUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                setProfileImage(e.target.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSignup = () => {
        if (!agreeTerms) {
            alert('이용약관과 개인정보처리방침에 동의해주세요.');
            return;
        }
        console.log('회원가입 시도:', formData);
        // 실제 회원가입 로직은 여기에 구현
    };

    return (
        <div className="min-h-screen bg-gray-900 flex flex-col">
            {/* Header */}
            <header className="flex justify-between items-center p-4 bg-gray-800 border-b border-gray-700">
                <div className="flex items-center space-x-2">
                    <div className="w-6 h-6 bg-blue-500 rounded"></div>
                    <span className="text-white text-lg font-semibold">TicketMon</span>
                </div>
                <button className="text-gray-300 hover:text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors">
                    홈
                </button>
            </header>

            {/* Main Content */}
            <div className="flex-1 flex items-center justify-center px-4 py-8">
                <div className="w-full max-w-md space-y-6">
                    {/* Title */}
                    <div className="text-center">
                        <h1 className="text-3xl font-bold text-white mb-2">계정 만들기</h1>
                        <p className="text-gray-400 text-sm">커뮤니티에 참여하고 안전하게 티켓 거래를 시작하세요</p>
                    </div>

                    {/* Signup Form */}
                    <div className="space-y-4">
                        {/* Email */}
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">이메일</label>
                            <div className="relative">
                                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                                <input
                                    type="email"
                                    value={formData.email}
                                    onChange={handleInputChange('email')}
                                    placeholder="이메일을 입력하세요"
                                    className="w-full pl-10 pr-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                />
                            </div>
                        </div>

                        {/* ID */}
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">아이디</label>
                            <div className="relative">
                                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                                <input
                                    type="text"
                                    value={formData.username}
                                    onChange={handleInputChange('username')}
                                    placeholder="아이디를 선택하세요"
                                    className="w-full pl-10 pr-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                />
                            </div>
                        </div>

                        {/* Password */}
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">비밀번호</label>
                            <div className="relative">
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    value={formData.password}
                                    onChange={handleInputChange('password')}
                                    placeholder="비밀번호를 만드세요"
                                    className="w-full pl-4 pr-12 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-300"
                                >
                                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                </button>
                            </div>
                        </div>

                        {/* Full Name */}
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">이름</label>
                            <div className="relative">
                                <UserPlus className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                                <input
                                    type="text"
                                    value={formData.name}
                                    onChange={handleInputChange('name')}
                                    placeholder="전체 이름을 입력하세요"
                                    className="w-full pl-10 pr-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                />
                            </div>
                        </div>

                        {/* Nickname */}
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">닉네임</label>
                            <div className="relative">
                                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                                <input
                                    type="text"
                                    value={formData.nickname}
                                    onChange={handleInputChange('nickname')}
                                    placeholder="닉네임을 입력하세요"
                                    className="w-full pl-10 pr-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                />
                            </div>
                        </div>

                        {/* Phone Number */}
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">전화번호</label>
                            <div className="relative">
                                <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                                <input
                                    type="tel"
                                    value={formData.phoneNumber}
                                    onChange={handleInputChange('phoneNumber')}
                                    placeholder="전화번호를 입력하세요"
                                    className="w-full pl-10 pr-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                />
                            </div>
                        </div>

                        {/* Address */}
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">주소</label>
                            <div className="relative">
                                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                                <input
                                    type="text"
                                    value={formData.address}
                                    onChange={handleInputChange('address')}
                                    placeholder="주소를 입력하세요"
                                    className="w-full pl-10 pr-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                />
                            </div>
                        </div>

                        {/* Profile Image */}
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">프로필 이미지</label>
                            <div className="flex items-center space-x-4">
                                <div className="w-16 h-16 bg-orange-300 rounded-full flex items-center justify-center overflow-hidden">
                                    {profileImage ? (
                                        <img src={profileImage} alt="Profile" className="w-full h-full object-cover" />
                                    ) : (
                                        <User className="w-8 h-8 text-orange-600" />
                                    )}
                                </div>
                                <label className="flex items-center space-x-2 px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg cursor-pointer transition-colors">
                                    <Upload className="w-4 h-4 text-gray-300" />
                                    <span className="text-gray-300 text-sm">파일 업로드</span>
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={handleFileUpload}
                                        className="hidden"
                                    />
                                </label>
                            </div>
                        </div>

                        {/* Terms Agreement */}
                        <div className="flex items-start space-x-3">
                            <input
                                type="checkbox"
                                id="terms"
                                checked={agreeTerms}
                                onChange={(e) => setAgreeTerms(e.target.checked)}
                                className="mt-1 w-4 h-4 text-blue-600 bg-gray-800 border-gray-600 rounded focus:ring-blue-500 focus:ring-2"
                            />
                            <label htmlFor="terms" className="text-sm text-gray-400">
                                <span className="text-blue-400 hover:text-blue-300 cursor-pointer">이용약관</span>과{' '}
                                <span className="text-blue-400 hover:text-blue-300 cursor-pointer">
                                    개인정보처리방침
                                </span>
                                에 동의합니다
                            </label>
                        </div>

                        {/* Create Account Button */}
                        <button
                            onClick={handleSignup}
                            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900"
                        >
                            계정 만들기
                        </button>

                        {/* Sign In Link */}
                        <div className="text-center">
                            <p className="text-gray-400 text-sm">
                                이미 계정이 있으신가요?{' '}
                                <button
                                    onClick={() => console.log('Navigate to sign in')}
                                    className="text-blue-400 hover:text-blue-300 underline transition-colors"
                                >
                                    로그인
                                </button>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
