import React, { useState, useEffect } from "react";
// 파이어베이스 파일에서 import 해온 auth
import { auth } from "../firebase-config";
// db에 데이터에 접근을 도와줄 메서드
import { createUserWithEmailAndPassword, sendEmailVerification } from "firebase/auth";
// 페이지를 이동할때 쓰는 메서드
import { useNavigate, Link } from "react-router-dom";
// 회원가입 폼 css
import '../styles/SignUp.css';


const SignUp = () => {
  // input으로 받을 state
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // firebase 회원가입 에러 메세지를 담는 state
  const [errorMessage, setErrorMessage] = useState("");
  // 유저 상태를 담는 state
  const [user, setUser] = useState(null);
  // navigate라는 변수에 저장 후 navigate의 인자로 설정한 path값을 넘겨주면 해당 경로로 이동
  const navigate = useNavigate();
  // 버튼 클릭이 가능하도록 전체 유효성 검사의 error 상태를 담는 state
  const [hasError, setHasError] = useState(false);
  // 버튼을 숨기기 위한 state
  const [isVisible, setIsVisible] = useState(false);

  // message를 담을 state
  const [emailMessage, setEmailMessage] = useState("");
  const [passwordMessage, setPasswordMessage] = useState("");
  const [passwordConfirmMessage, setPasswordConfirmMessage] = useState("");

  // 유효성 검사 에러 상태를 담는 state
  const [isEmail, setIsEmail] = useState(false);
  const [isPassword, setIsPassword] = useState(false);
  const [isPasswordConfirm, setIsPasswordConfirm] = useState(false);
   
  // 유효성 검사 해결을 체크해주는 useEffect
  useEffect(() => {
    if (isEmail && isPassword && isPasswordConfirm) {
      setHasError(false); 
    } else {
      setHasError(true);
    }
  }, [isEmail, isPassword, isPasswordConfirm]); 

  // 유효성 검사 (email)
  const onChangeEmail = (e) => {
    const currentEmail = e.target.value;
    setEmail(currentEmail);
    const emailRegExp =
    /^[a-zA-Z0-9]+@email.daelim.ac.kr$/;
 
    if (!emailRegExp.test(currentEmail)) {
      setEmailMessage(" 이메일의 형식이 올바르지 않습니다!");
      setIsEmail(false);
    } else {
      setEmailMessage(" 사용 가능한 이메일 입니다.");
      setIsEmail(true);
    }
  };
  // 유효성 검사 (password)
  const onChangePassword = (e) => {
    const currentPassword = e.target.value;
    setPassword(currentPassword);
    const passwordRegExp =
      /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,25}$/;
    if (!passwordRegExp.test(currentPassword)) {
      setPasswordMessage(
        "숫자+영문자+특수문자 조합으로 8자리 이상 입력해주세요!"
      );
      setIsPassword(false);
    } else {
      setPasswordMessage("안전한 비밀번호 입니다.");
      setIsPassword(true);
    }
  };
  // 유효성 검사 (passwordConfirm)
  const onChangePasswordConfirm = (e) => {
    const currentPasswordConfirm = e.target.value;    
    if (password !== currentPasswordConfirm) {
      setPasswordConfirmMessage("비밀번호가 똑같지 않아요!");
      setIsPasswordConfirm(false);
    } else {
      setPasswordConfirmMessage("똑같은 비밀번호를 입력했습니다.");
      setIsPasswordConfirm(true);
    }
  };

  // 회원가입 생성 버튼에 넣어줄 메서드
  const createUsers = async (e) => {
    e.preventDefault();
    // 회원가입 생성
    try {
        const userCredential = await createUserWithEmailAndPassword(
            auth,
            email,
            password
        );
        // user에 현재 생성된 유저 데이터를 넣어줌
        setUser(userCredential.user);
        console.log(userCredential.user);
        // 메일 인증 완료 버튼 보이게 하기
        setIsVisible(true);
        // 이메일 인증 메일 보내기
        sendEmailVerification(userCredential.user)
          .then(() => {
            // 이메일 전송 성공
            console.log("인증 메일 보내기 성공");
          })
          .catch((error) => {
            // 에러 처리
            console.log("인증 메일 보내기 실패")
          });         
      } catch (error) {
        // 에러 메세지 출력        
        setErrorMessage(error.message);
        console.log(errorMessage);
      }
  }

  // 인증 완료 버튼 클릭시 페이지 넘어감
  const btnPage = () => {
      navigate('/loading');
  }

// 솔


  //솔
  
  // 회원가입 폼 출력
  return (
    <div className="All">
      <section className="login-form">
      <h1>Sign Up</h1>
      <form onSubmit={createUsers}>
        <div className="int-area">          
          <input
            type="email"
            placeholder=" 학번@email.daelim.ac.kr"                   
            onChange={onChangeEmail}
            id="joinid"
            name="joinid"
          />
          <span className="message">{emailMessage}</span>
        </div>
        <div className="int-area">          
          <input
            type="password"
            placeholder="Enter your password"            
            onChange={onChangePassword}
            id="pswd1"            
          />
          <span className="message">{passwordMessage}</span>          
        </div>
        <div className="int-area">          
          <input
            type="password"
            placeholder="Check password"            
            onChange={onChangePasswordConfirm}
            id="pswd2"            
          />          
          <span className="message">{passwordConfirmMessage}</span>
        </div>
          <div className="btn-area">
          <button type="submit" id="btn" disabled={hasError}>Sign Up</button>                  
        </div>
      </form>
      <br/>
      <div>
        {isVisible && <p className="message">{user.email}로 <br/>인증 메일을 보냈습니다.<br/> 메일 인증 후 아래 버튼을 클릭해주세요 !</p>}
      </div>
      <div className="btn-area">
        {isVisible && <button type="button" id="btn" onClick={btnPage}>인증완료</button>}      
      </div>
      <div className="caption">
            <Link to="/">메인 화면</Link>
            <Link to="/login">로그인</Link>
        </div>
      </section>
    </div>
    
  );
};

export default SignUp;