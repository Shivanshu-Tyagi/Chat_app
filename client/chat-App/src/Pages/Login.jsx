import { useContext } from 'react';
import { Alert, Button, Form, Row, Col, Stack } from 'react-bootstrap';
import { AuthContext } from '../Context/AuthContext';

const Login = () => {
  const { loginInfo, updateloginInfo, loginUser, loginError, isLoginLoading } = useContext(AuthContext);

  return (
    <Form onSubmit={loginUser}>
      {loginError && loginError.error && typeof loginError.message === 'string' && (
        <Alert variant="danger">{loginError.message}</Alert>
      )}
      <Row style={{ height: '90vh', justifyContent: 'center', paddingTop: '10%' }}>
        <Col xs={6}>
          <Stack gap={3}>
            <h2 style={{ textAlign: 'center' }}>Login</h2>
            <Form.Control
              type="email"
              placeholder="Email"
              onChange={(e) =>
                updateloginInfo({
                  ...loginInfo,
                  email: e.target.value,
                })
              }
            />
            <Form.Control
              type="password"
              placeholder="Password"
              onChange={(e) =>
                updateloginInfo({
                  ...loginInfo,
                  password: e.target.value,
                })
              }
            />
            <Button
              type="submit"
              style={{
                width: '100%',
                marginLeft: 'auto',
                marginRight: 'auto',
                display: 'block',
                backgroundColor: '#4CAF50',
                color: 'white',
                border: 'none',
                borderRadius: '.2rem',
                fontWeight: 'bold',
              }}
            >
              {isLoginLoading ? 'Logging your account...' : 'Login'}
            </Button>
          </Stack>
        </Col>
      </Row>
    </Form>
  );
};

export default Login;
