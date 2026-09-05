"use client";
import SuperAdminDashboard from '@/app/components/Superadmin';
import { useParams } from 'next/navigation'

const page = () => {
    const params = useParams();
    const id = params.id;
  return (
    <div><SuperAdminDashboard/></div>
  )
}

export default page