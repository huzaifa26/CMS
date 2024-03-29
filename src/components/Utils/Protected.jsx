import { useQueryClient } from '@tanstack/react-query';
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { Outlet } from 'react-router-dom';

export default function Protected() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const user = localStorage.getItem("user")

  useEffect(() => {
    if (user === null || user === undefined) {
      navigate('/');
    }
    queryClient.setQueryData(["user"], JSON.parse(user))
  }, [])

  if (user === null) {
    return null;
  }

  return (
    <>
      {user !== null && <Outlet />}
    </>
  )
}