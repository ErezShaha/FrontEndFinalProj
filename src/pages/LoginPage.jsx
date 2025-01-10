import { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import axios from "axios";
import { useNavigate } from "react-router";
import "../styles/pageStyles/LoginPage.css";
import { socket } from "../utils/socket.js";
import { useGlobalContext } from "../contexts/GlobalContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

// http://localhost:5173/

const LoginPage = () => {
  const navigate = useNavigate();
  //const {user} = useGlobalContext();
  const [user, setuser] = useState({ username: "", password: "" });
  const [PassowrdVis, setPassVIs] = useState("password");
  const [isCard, setisCard] = useState(true);
  const [errorMsg, seterrorMsg] = useState();
  const { setmainUser, mainUser } = useGlobalContext();

  useEffect(() => {
    axios
      .post("/api/v1/users/logout", null, { withCredentials: true })
      .then((res) => {
        console.log(res);
        socket.emit("UserLogout");
        sessionStorage.clear();
      })
      .catch((err) => {
        seterrorMsg(error.response.data.error);
        console.log(err);
      });
  }, []);

  const toggleCard = () => {
    setuser({ username: "", password: "" });
    console.log("toggle card");
    seterrorMsg(null);
    setisCard(!isCard);
  };

  const login = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/api/v1/users/login", user, {
        withCredentials: true,
      });
      socket.emit("UserLogin", res.data);
      sessionStorage.setItem("user", res.data);
      setmainUser({ ...mainUser, username: res.data });
      navigate("/home");
    } catch (error) {
      console.log(error);
    }
  };

  const register = async (e) => {
    e.preventDefault();
    console.log(user);
    try {
      await axios.post("/api/v1/users/signup", user, { withCredentials: true });
      console.log("User registered successfully");
      toggleCard();
    } catch (error) {
      seterrorMsg(error.response.data.error);
      console.log(error);
    }
  };

  return (
    <div className="Theme">
      {isCard ? (
        //sign in
        <div className="centerDiv">
          <Card className="coolCard" style={{ width: "18rem" }}>
            <Card.Body className="signinTheme">
              <h1 className="bigTitle">Bomboclat</h1>
              <Card.Subtitle className="mb-2 text-muted">Sign In</Card.Subtitle>
              <Card.Title>Username</Card.Title>
              <Form onSubmit={login}>
                <Form.Group>
                  <InputGroup className="mb-3">
                    <Form.Control
                      value={user.username}
                      onChange={(e) =>
                        setuser({ ...user, username: e.target.value })
                      }
                      placeholder="Username"
                      aria-label="Username"
                      aria-describedby="signIn"
                    />
                    <br />
                  </InputGroup>

                  {/* password */}
                  <Card.Title>Password</Card.Title>
                  <InputGroup className="mb-3">
                    <Form.Control
                      value={user.password}
                      onChange={(e) =>
                        setuser({ ...user, password: e.target.value })
                      }
                      placeholder="Password"
                      aria-label="Password"
                      aria-describedby="signIn"
                      type={PassowrdVis}
                    />
                    <Button
                      className="eyeButton"
                      onMouseDown={() => setPassVIs("text")}
                      onMouseUp={() => setPassVIs("password")}
                    >
                      {PassowrdVis === "text"? <FontAwesomeIcon icon={faEye} /> : <FontAwesomeIcon icon={faEyeSlash} />}
                    </Button>
                  </InputGroup>

                  <Button id="signIn" type="submit" variant="info">
                    Sign In
                  </Button>
                </Form.Group>
              </Form>
              <br />
              {errorMsg == null ? <br /> : <p>{errorMsg}</p>}
              <Button variant="primary" onClick={toggleCard}>
                Register
              </Button>
            </Card.Body>
          </Card>
        </div>
      ) : (
        //register
        <div className="centerDiv">
          <Card className="coolCard2" style={{ width: "18rem" }}>
            <Card.Body>
              <h1 className="bigTitle">Bomboclat</h1>
              <Card.Subtitle className="mb-2 text-muted">
                Register
              </Card.Subtitle>

              <Card.Title>Please enter a username</Card.Title>
              <Form onSubmit={register}>
                <Form.Group>
                  <InputGroup className="mb-3">
                    <Form.Control
                      value={user.username}
                      onChange={(e) =>
                        setuser({ ...user, username: e.target.value })
                      }
                      placeholder="Username"
                      aria-label="Username"
                      aria-describedby="register"
                    />
                    <br />
                  </InputGroup>

                  <Card.Title>Please enter a password</Card.Title>

                  <InputGroup className="mb-3">
                    <Form.Control
                      value={user.password}
                      onChange={(e) =>
                        setuser({ ...user, password: e.target.value })
                      }
                      placeholder="Password"
                      aria-label="Password"
                      aria-describedby="register"
                      type={PassowrdVis}
                    />
                    <Button
                      className="eyeButton"
                      onMouseDown={() => setPassVIs("text")}
                      onMouseUp={() => setPassVIs("password")}
                    >
                      {PassowrdVis === "text"? <FontAwesomeIcon icon={faEye} /> : <FontAwesomeIcon icon={faEyeSlash} />}
                      
                    </Button>
                  </InputGroup>

                  <Button id="register" type="submit" variant="primary">
                    Register
                  </Button>
                </Form.Group>
              </Form>
              <br />
              {errorMsg == null ? <br /> : <p>{errorMsg}</p>}
              <Button onClick={toggleCard} variant="info">
                Sign In
              </Button>
            </Card.Body>
          </Card>
        </div>
      )}
    </div>
  );
};

export default LoginPage;
