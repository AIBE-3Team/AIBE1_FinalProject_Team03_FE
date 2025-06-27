import React, { useState, useEffect } from 'react';
import { User, Lock, Calendar, Eye, EyeOff, Camera, Phone, Mail, MapPin, Edit2, Save, X } from 'lucide-react';
import { AccountForm } from '../../auth/services/AccountForm';
import { EditProfileForm } from '../components/ProfileForm';
import { profileInputType } from '../types/profileInputType';

export function ProfileTab({ userInfo, onUpdateUserInfo, isLoading }) {
    const [isEditing, setIsEditing] = useState(false);
    const [editInfo, setEditInfo] = useState(userInfo || {});
    const [isSaving, setIsSaving] = useState(false);
    const [errors, setErrors] = useState({});

    // userInfo가 변경되면 editInfo도 업데이트
    useEffect(() => {
        if (userInfo) {
            setEditInfo({ ...userInfo });
        }
    }, [userInfo]);

    const handleSaveProfile = async () => {
        setIsSaving(true);

        const newErrors = AccountForm.validateAllFields(editInfo);
        setErrors(newErrors);

        if (Object.keys(newErrors).length > 0) {
            setIsSaving(false);
            return;
        }

        try {
            const updatePayload = {
                nickname: editInfo.nickname,
                phone: editInfo.phone,
                address: editInfo.address,
                profileImage: editInfo.profileImage || null,
            };

            const result = await onUpdateUserInfo(updatePayload);
            if (result.success) {
                setIsEditing(false);
                setEditInfo({ ...userInfo });
            }
        } catch (error) {
            alert('정보 수정에 실패했습니다.');
        } finally {
            setIsSaving(false);
        }
    };

    const handleCancelEdit = () => {
        setEditInfo({ ...userInfo });
        setIsEditing(false);
        setErrors({});
    };

    const handleInputChange = (field) => (e) => {
        let value = e.target.value;

        if (field === 'phone') {
            value = AccountForm.formatPhoneNumber(value);
        }

        const updatedData = {
            ...editInfo,
            [field]: value,
        };

        setEditInfo(updatedData);

        const error = AccountForm.validateField(field, value, updatedData);
        setErrors((prev) => ({
            ...prev,
            [field]: error,
        }));
    };

    if (isLoading) {
        return (
            <div className="flex items-center justify-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
        );
    }

    if (!userInfo) {
        return (
            <div className="text-center py-12">
                <p className="text-gray-400">사용자 정보를 불러올 수 없습니다.</p>
            </div>
        );
    }

    return (
        <div className="space-y-8">
            {/* Profile Header */}
            <div className="flex items-center justify-between">
                <div className="flex items-center space-x-6">
                    <div className="relative">
                        <div className="w-24 h-24 bg-gradient-to-br from-pink-400 to-purple-600 rounded-full flex items-center justify-center">
                            <span className="text-2xl font-bold text-white">{userInfo.name?.charAt(0) || 'U'}</span>
                        </div>
                        <button
                            className="absolute -bottom-2 -right-2 w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center hover:bg-blue-700 transition-colors"
                            onClick={() => alert('프로필 이미지 업로드 기능은 준비 중입니다.')}
                        >
                            <Camera size={16} />
                        </button>
                    </div>
                    <div>
                        <h3 className="text-2xl font-bold">{userInfo.name}</h3>
                        <p className="text-gray-400">@{userInfo.username}</p>
                    </div>
                </div>
                <button
                    onClick={() => setIsEditing(!isEditing)}
                    disabled={isSaving}
                    className="flex items-center space-x-2 px-4 py-2 bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
                >
                    <Edit2 size={16} />
                    <span>{isEditing ? '취소' : '수정'}</span>
                </button>
            </div>

            {/* Profile Form */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                        <Mail size={16} className="inline mr-2" />
                        이메일
                    </label>
                    <input
                        type="email"
                        value={isEditing ? editInfo.email || '' : userInfo.email || ''}
                        disabled={true}
                        className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white disabled:opacity-50 disabled:cursor-not-allowed focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                        <User size={16} className="inline mr-2" />
                        아이디
                    </label>
                    <input
                        type="text"
                        value={isEditing ? editInfo.username || '' : userInfo.username || ''}
                        disabled={true}
                        className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white disabled:opacity-50 disabled:cursor-not-allowed focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                </div> */}
                {profileInputType.map(({ name, type, icon, labelName, disable }) => (
                    <EditProfileForm
                        key={name}
                        icon={icon}
                        name={name}
                        labelName={labelName}
                        type={type}
                        value={isEditing ? editInfo[name] || '' : userInfo[name] || ''}
                        onChange={handleInputChange(name)}
                        disabled={disable ? disable : !isEditing}
                        error={errors[name]}
                    />
                ))}
                {/* <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">이름</label>
                    <input
                        type="text"
                        value={isEditing ? editInfo.name || '' : userInfo.name || ''}
                        name="name"
                        onChange={handleInputChange('name')}
                        disabled={!isEditing}
                        className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white disabled:opacity-50 disabled:cursor-not-allowed focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    {errors.name && <p className="text-red-400 text-xs mt-1 text-left">{errors.name}</p>}
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">닉네임</label>
                    <input
                        type="text"
                        value={isEditing ? editInfo.nickname || '' : userInfo.nickname || ''}
                        name="nickname"
                        onChange={handleInputChange('nickname')}
                        disabled={!isEditing}
                        className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white disabled:opacity-50 disabled:cursor-not-allowed focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    {errors.nickname && <p className="text-red-400 text-xs mt-1 text-left">{errors.nickname}</p>}
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                        <Phone size={16} className="inline mr-2" />
                        전화번호
                    </label>
                    <input
                        type="tel"
                        value={isEditing ? editInfo.phone || '' : userInfo.phone || ''}
                        name="phone"
                        onChange={handleInputChange('phone')}
                        disabled={!isEditing}
                        className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white disabled:opacity-50 disabled:cursor-not-allowed focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    {errors.phone && <p className="text-red-400 text-xs mt-1 text-left">{errors.phone}</p>}
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                        <MapPin size={16} className="inline mr-2" />
                        주소
                    </label>
                    <input
                        type="text"
                        value={isEditing ? editInfo.address || '' : userInfo.address || ''}
                        name="address"
                        onChange={handleInputChange('address')}
                        disabled={!isEditing}
                        className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white disabled:opacity-50 disabled:cursor-not-allowed focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    {errors.address && <p className="text-red-400 text-xs mt-1 text-left">{errors.address}</p>}
                </div> */}
            </div>

            {/* Save Button */}
            {isEditing && (
                <div className="flex justify-end space-x-4">
                    <button
                        onClick={handleCancelEdit}
                        disabled={isSaving}
                        className="flex items-center space-x-2 px-6 py-3 bg-gray-600 rounded-lg hover:bg-gray-700 transition-colors disabled:opacity-50"
                    >
                        <X size={16} />
                        <span>취소</span>
                    </button>
                    <button
                        onClick={handleSaveProfile}
                        disabled={isSaving}
                        className="flex items-center space-x-2 px-6 py-3 bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
                    >
                        {isSaving ? (
                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                        ) : (
                            <Save size={16} />
                        )}
                        <span>{isSaving ? '저장 중...' : '저장'}</span>
                    </button>
                </div>
            )}
        </div>
    );
}
