import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

function Dashboard() {
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    if(!user) {
      navigate('/login')
    }
  }, [user, navigate]);

  return (
    <div>
      <div>Dashboard!!!</div>
      <div>Soon to be the form</div>
    </div>
  )
}

export default Dashboard