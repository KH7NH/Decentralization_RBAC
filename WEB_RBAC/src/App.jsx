// Author: TrungQuanDev: https://youtube.com/@trungquandev
import { Routes, Route, Navigate, Outlet } from 'react-router-dom'
import Login from '~/pages/Login'
import Dashboard from '~/pages/Dashboard'
import NotFound from './pages/NotFound'

const ProtectedRoute = () =>{
  const user = JSON.parse(localStorage.getItem('userInfo'))
  if(!user) return <Navigate to="/login" replace={true} />
  return <Outlet />
}
const UnauthorizedRoutes = () => {
  const user = JSON.parse(localStorage.getItem('userInfo'))
  if (user) return <Navigate to="/dashboard" replace={true} />
  return <Outlet />
}

function App() {
  return (
    <Routes>
      <Route path='/' element={
        <Navigate to="/login" replace={true} />
      } />

      <Route element={<UnauthorizedRoutes />}>
        {/* <Outlet /> của react-router-dom sẽ chạy vào các child route trong này */}
        <Route path='/login' element={<Login />} />
        {/* Đoạn này sau này sẽ còn nhiều route nữa để viết xác thực */}
      </Route>

      <Route element={<ProtectedRoute />}>
      {/* <Outlet /> của react-router-dom sẽ chạy vào các child route trong này */}
        <Route path='/dashboard' element={<Dashboard />} />
        {/* Tất cả các element ở đây đều gọi tói cùng component Dashboard vì chúng ta đang gom chung các page 
        dạng tabs và code hết trong component Dashboard này để test cho gọn, thực tế có thể để tách pages và
        component khác nhau tuỳ dự án */}
        <Route path='/support' element={<Dashboard />} />
        <Route path='/messages' element={<Dashboard />} />
        <Route path='/revenue' element={<Dashboard />} />
        <Route path='/admin-tools' element={<Dashboard />} />
      </Route>
      
      <Route path='/access-denied' element={<div>Access Denied</div>} />
      <Route path='*' element={<NotFound />}/>
    </Routes>
  )
}

export default App
