import React, { useState, useEffect } from "react";
import { auth } from "../firebase-config";
import { onAuthStateChanged } from "firebase/auth";
import { useNavigate, Link } from 'react-router-dom';
import '../styles/Loading.css';

const Loading = () => {
  const [emailVerified, setEmailVerified] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setEmailVerified(user.emailVerified);
      }
    });

    // 1초마다 Firebase에서 현재 로그인한 사용자의 이메일 인증 상태를 가져와서 체크
    const intervalId = setInterval(() => {
      if (emailVerified) {
        navigate('/userData');
      }
      const currentUser = auth.currentUser;
      if (currentUser) {
        currentUser.reload().then(() => {
          setEmailVerified(currentUser.emailVerified);
        });
      }
    }, 1000);

    return () => {
      clearInterval(intervalId);
      unsubscribe();
    };
  }, [emailVerified, navigate]);

  return (


    <div className="main-site">
      <div className="main-header pad-top wrapper" id="mainHeader">
        {emailVerified ? (
          <h1 className="text-giga">이메일 인증 확인이 되었습니다. 잠시만 기다려주세요.</h1>
        ) : (
          <h1 className="text-giga">이메일 인증 확인이 아직 안되었습니다...</h1>
        )}
      </div>

      <div className="main-content space-top wrapper" role="main" id="mainContent">
        <div className="loader loader-black loader-1"></div>

        <div className="loader loader-2"></div>

        <div className="loader loader-black loader-3"></div>

        <div className="loader loader-black loader-4"></div>

        <div className="loader loader-black loader-5"></div>

        <div className="loader loader-6"></div>

        <div className="loader loader-7"></div>

        <div className="loader loader-8"></div>

        <div className="loader loader-9"></div>

        <div className="loader loader-10"></div>
      </div>
      <Link to="/"><p className="back">메인 화면으로 돌아가기</p></Link>
    </div>



  );
}

export default Loading;