import React, { useState, useEffect } from 'react';
import { auth } from "../firebase-config";
import { useNavigate, Link } from 'react-router-dom';
import '../styles/MainPage.css';
import { signOut } from 'firebase/auth';
const MainPage = () => {

  const [email, setEmail] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const currentUser = auth.currentUser;
    if (currentUser) {
      setEmail(currentUser.email);
      setIsVisible(true);
    }
  }, []);

  const Logout = () => {
    signOut(auth).then(() => {
      navigate('/login');
    }).catch((error) => {
      console.log("error");
    });
  }
  console.log(email);

  return (
    <div>
      <div className="header">
        <div className="Lhead">
          <li><img className="weblogo" src="../images/daelimlogo.png" /></li>
        </div>
        <div className="Rhead">
          <div>
            {isVisible || <Link to="login"><p>로그인</p></Link>}
            {isVisible || <Link to="signup"><p>회원가입</p></Link>}
            {isVisible && <Link to="mypage"><p>{email}님 안녕하세요 !</p></Link>}
            {isVisible && <button onClick={Logout}>Logout</button>}
          </div>
          <img src="images/masages.png" />
          <img src="images/my.png" />
        </div>
      </div>
      <div className="Menu">
        <li><a href="#" target="_self"><img src="images/world.png" />World Cup</a></li>
        <li><a href="#" target="_self"><img src="images/date.png" />Blind Date</a></li>
      </div>
      <div id="wrapper">
        <div className="Maincard" id="men">
          <header>
            <h3>Men</h3>
          </header>

        </div>
        <div className="Maincard" id="girl">
          <header>
            <h3>Girl</h3>
          </header>

        </div>
        <div className="Maincard" id="com">
          <header>
            <h3>Comming Soon</h3>
          </header>

        </div>
        <div className="Maincard" id="com">
          <header>
            <h3>Comming Soon</h3>
          </header>
        </div>
      </div>
      <div id="Bwrapper">
        <div className="Bcard">
          <div className="Notice">
            <header>
              <h3>Notice</h3>
            </header>
            <ul className="Lnotice">
              <li>Lorem ipsum dolor sit amet consectetur adipisicing elit. </li>
              <li>Lorem ipsum dolor sit amet consectetur adipisicing elit. </li>
              <li>Lorem ipsum dolor sit amet consectetur adipisicing elit. </li>
            </ul>
          </div>
        </div>
        <div className="Bcard">
          <div className="Rank">
            <header>
              <h3>Rank</h3>
            </header>
            <ul className="Rankli">
              <li>Lorem ipsum dolor sit amet consectetur adipisicing elit. </li>
              <li>Lorem ipsum dolor sit amet consectetur adipisicing elit. </li>
              <li>Lorem ipsum dolor sit amet consectetur adipisicing elit. </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="footer">
        <div id="bottomMenu">
          <ul>
            <li><a href="#">회사 소개</a></li>
            <li><a href="#">개인정보처리방침</a></li>
            <li><a href="#">약관</a></li>
            <li><a href="#">사이트맵</a></li>
          </ul>

        </div>
      </div>
      <div id="company">
        <p>경기도 수원시 권선구  (대표전화) 123-456-7890</p>
      </div>
    </div>

  )

}

export default MainPage