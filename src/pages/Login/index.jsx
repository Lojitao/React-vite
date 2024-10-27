
import { fetchLogin } from '../../store/modules/user'; // 確保路徑正確
import { useDispatch } from 'react-redux';


const Login = ()=>{
  const dispatch = useDispatch();
  
  function login(){
    const loginForm = {
      login:'admin',
      password:'123123'
    }
    dispatch(fetchLogin(loginForm));
  }

  return <button onClick={login}>登入按鈕</button>
}



export default Login
