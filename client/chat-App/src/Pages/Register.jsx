
import { Alert, Button, Form, Row, Col, Stack } from "react-bootstrap";
import { useContext } from "react";
import { AuthContext } from "../Context/AuthContext";

const Register = () => {
  const { registerInfo, updateRegisterInfo, registerUser, registerError, isRegisterLoading } = useContext(AuthContext);

  return (
    <Form onSubmit={registerUser}>
      {registerError && registerError.error && typeof registerError.message === 'string' && (
        <Alert variant="danger">{registerError.message}</Alert>
      )}

      <Row style={{ height: "90vh", justifyContent: "center", paddingTop: "10%" }}>
        <Col xs={6}>
          <Stack gap={3}>
            <h2 style={{ textAlign: "center" }}>Register</h2>
            <Form.Control type="text" placeholder="Name" onChange={(e) => updateRegisterInfo({ ...registerInfo, name: e.target.value })} />
            <Form.Control type="email" placeholder="Email" onChange={(e) => updateRegisterInfo({ ...registerInfo, email: e.target.value })} />
            <Form.Control type="password" placeholder="Password" onChange={(e) => updateRegisterInfo({ ...registerInfo, password: e.target.value })} />
            <Button
              type="submit"
              style={{
                width: "100%",
                marginLeft: "auto",
                marginRight: "auto",
                display: "block",
                backgroundColor: "#4CAF50",
                color: "white",
                border: "none",
                borderRadius: ".2rem",
                fontWeight: "bold",
              }}
            >
              {isRegisterLoading ? "Creating your account..." : "Register"}
            </Button>
          </Stack>
        </Col>
      </Row>
    </Form>
  );
}

export default Register;
