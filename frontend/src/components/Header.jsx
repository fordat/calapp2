import { FaSignInAlt, FaSignOutAlt, FaUser } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout, reset } from '../features/auth/authSlice';

function Header() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);

  console.log(user);

  const onLogout = () => {
    console.log("we loggin out!!!")
    dispatch(logout())
    dispatch(reset())
    navigate('/')
  }

  return (
    <div className='header'>
      <div className="logo">
        <Link to='/'><h2>TaskManager</h2></Link>
      </div>
      <ul>
        { user ? (<li>
            <button className='btn' onClick={onLogout}>
              <FaSignOutAlt /> Logout
            </button>
          </li>) : (<> 
          <li>
            <Link to='/login'>
              <FaSignInAlt /> Login
            </Link>
          </li>
          <li>
            <Link to='/register'>
              <FaUser /> Register
            </Link>
          </li>
        </>)}

      </ul>
    </div>
  )
}

export default Header