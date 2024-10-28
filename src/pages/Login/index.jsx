
import { fetchLogin } from '../../store/modules/user'; // 確保路徑正確
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom'
import { Button,Card,Form,Input, message } from 'antd';

const Login = ()=>{

  const dispatch = useDispatch();
  const navigate = useNavigate()

  async function login(values){
    await dispatch(fetchLogin(values));
    navigate('/')
    message.success('登入成功')
  }

  return (
    <>
      <div className="login">
        <Card className="login-container">
          {/* 登录表单 */}
          <Form onFinish={login} validateTrigger="onBlur">
            <Form.Item
              name="login"
              rules={[
               {
                required:true,
                message:"請輸入帳號"
               } 
              ]}
            >
              <Input size="large" placeholder="請輸入帳號" />
            </Form.Item>

            <Form.Item
              name="password"
              rules={[
               {
                required:true,
                message:"請輸入密碼"
               } 
              ]}
            >
              <Input size="large" placeholder="請輸入密碼" />
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit" size="large" block>登入</Button>
            </Form.Item>
          </Form>
        </Card>
      </div>
    </>
  )
}



export default Login
