import { Navigate, Outlet } from 'react-router-dom';
import { isAdminSignedIn } from '@/lib/adminAuth';

export default function ProtectedRoute() {
  if (!isAdminSignedIn()) {
    return <Navigate to="/admin/login" replace />;
  }
  return <Outlet />;
}
