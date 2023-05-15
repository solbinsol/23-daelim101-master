import React, { useState } from 'react';
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase-config";
import '../styles/Login.css';
import { useNavigate, Link } from "react-router-dom";
const Login = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  // 로그인 메서드 이용
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(auth,
        email,
        password
      );
      console.log(userCredential);
      console.log('로그인성공');
      alert("로그인 성공 메인페이지로 이동합니다.");
      navigate('/');
    } catch (error) {
      console.log(error);
      alert("로그인실패")
    }
  };

  return (

    <div className="All">
      <section className="login-form">
        <h1>Login</h1>
        <form onSubmit={handleSubmit}>
          <div className="int-area">
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="int-area">
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="btn-area">
            <button type="submit" id="btn">로그인</button>
          </div>
        </form>
        <div className="caption">
          <Link to="/">메인 화면</Link>
          <Link to="/signup">회원가입</Link>
        </div>
      </section>
    </div>


  );
};

export default Login;