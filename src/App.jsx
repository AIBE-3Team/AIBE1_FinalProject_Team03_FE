// 루트 컴포넌트

// 애플리케이션의 주요 라우팅 규칙을 정의
import React, { useContext } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom'; // 필요한 컴포넌트들 임포트

// 레이아웃
import MainLayout from './shared/components/layout/MainLayout';
import AuthLayout from './shared/components/layout/AuthLayout';
import PublicLayout from './shared/components/layout/PublicLayout.jsx';

// Auth Context
import { AuthContext } from './context/AuthContext';

// 홈페이지 & 인증 페이지
import HomePage from './pages/home/Home.jsx';
import SellerStatusPage from './pages/admin/SellerStatus.jsx'; // 판매자 상태 페이지
import LoginPage from './pages/auth/Login.jsx';
import RegisterPage from './pages/auth/Register.jsx';

// 다른 팀원들이 구현할 예정인 페이지 컴포넌트들은 임포트를 주석 처리합니다.
// 구현이 완료되면 주석을 해제하고 해당 파일을 src/pages 폴더에 생성해주세요.
// import MyPage from './pages/MyPage.jsx';
// import RegisterPage from './pages/RegisterPage.jsx';

// 콘서트 페이지
import ConcertListPage from './pages/concert/ConcertListPage.jsx';
import ConcertDetailPage from './pages/concert/ConcertDetailPage.jsx';

// 예매 페이지
import SeatSelectionPage from './pages/booking/SeatSelectionPage.jsx';

import NotFoundPage from './pages/NotFoundPage.jsx';

// App 컴포넌트: 라우팅 정의 및 네비게이션 제공
export default function App() {
  const { user, loading } = useContext(AuthContext);

  if (loading) {
    return <div className="text-center py-20">로딩 중…</div>;
  }

  return (
    <Routes>
      {/** — 인증 전용 — **/}
      <Route element={<AuthLayout />}>
        <Route
          path="/login"
          element={user ? <Navigate to="/" replace /> : <LoginPage />}
        />
        <Route
          path="/register"
          element={user ? <Navigate to="/" replace /> : <RegisterPage />}
        />
      </Route>

      {/** — 공개 페이지 — **/}
      <Route element={<PublicLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="concerts" element={<ConcertListPage />} />
        <Route path="concerts/:concertId" element={<ConcertDetailPage />} />
      </Route>

      {/** — 로그인 후 보호된 페이지 — **/}
      <Route element={<MainLayout />}>
        <Route
          path="concerts/:concertId/reserve"
          element={
            user ? <SeatSelectionPage /> : <Navigate to="/login" replace />
          }
        />
        <Route
          path="/seller/status"
          element={
            user &&
            (user.role === 'seller' ||
              (user.roles && user.roles.includes('seller'))) ? (
              <SellerStatusPage />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
      </Route>

      {/** — 404 처리 — **/}
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}
