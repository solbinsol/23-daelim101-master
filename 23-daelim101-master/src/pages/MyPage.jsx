import React, { useState, useEffect } from 'react';
import { onAuthStateChanged } from "firebase/auth";
import { db, auth, storage } from '../firebase-config'
import { getDoc, doc } from 'firebase/firestore'
import { ref, listAll, getDownloadURL } from "firebase/storage";
import { Link } from "react-router-dom"

import '../styles/MyPage.css';

const MyPage = () => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [age, setAge] = useState('');
  const [major, setMajor] = useState('');
  const [email, setEmail] = useState('');
  const [class_of, setclass_of] = useState('');
  const [imageUrl, setImageUrl] = useState("");

  const user = auth.currentUser;

  useEffect(() => {

    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const userName = await getUserName(user.uid);
        const userPhone = await getUserPhone(user.uid);
        const userAge = await getUserAge(user.uid);
        const userEmail = await getUserEmail(user.uid);
        const userMajor = await getUserMajor(user.uid);
        const userClass_of = await getUserClass_of(user.uid);
        setName(userName);
        setPhone(userPhone);
        setAge(userAge);
        setMajor(userMajor);
        setclass_of(userClass_of);
        setEmail(userEmail);
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const getUserName = async (uid) => {
    try {
      const userRef = doc(db, 'user', uid);
      const userDoc = await getDoc(userRef);

      if (userDoc.exists()) {
        const userData = userDoc.data();
        return userData.name;

      } else {
        console.log('User document does not exist');
        return '';
      }
    } catch (error) {
      console.log(error);
      return '';
    }
  };
  const getUserAge = async (uid) => {
    try {
      const userRef = doc(db, 'user', uid);
      const userDoc = await getDoc(userRef);

      if (userDoc.exists()) {
        const userData = userDoc.data();
        return userData.age;

      } else {
        console.log('User document does not exist');
        return '';
      }
    } catch (error) {
      console.log(error);
      return '';
    }
  };
  const getUserMajor = async (uid) => {
    try {
      const userRef = doc(db, 'user', uid);
      const userDoc = await getDoc(userRef);

      if (userDoc.exists()) {
        const userData = userDoc.data();
        return userData.major;

      } else {
        console.log('User document does not exist');
        return '';
      }
    } catch (error) {
      console.log(error);
      return '';
    }
  };
  const getUserPhone = async (uid) => {
    try {
      const userRef = doc(db, 'user', uid);
      const userDoc = await getDoc(userRef);

      if (userDoc.exists()) {
        const userData = userDoc.data();
        return userData.phone;

      } else {
        console.log('User document does not exist');
        return '';
      }
    } catch (error) {
      console.log(error);
      return '';
    }
  };
  const getUserClass_of = async (uid) => {
    try {
      const userRef = doc(db, 'user', uid);
      const userDoc = await getDoc(userRef);

      if (userDoc.exists()) {
        const userData = userDoc.data();
        return userData.class_of;

      } else {
        console.log('User document does not exist');
        return '';
      }
    } catch (error) {
      console.log(error);
      return '';
    }
  };

  const getUserEmail = () => {
    try {
      if (user) {
        return user.email;
      }
    } catch (error) {
      console.log(error);
      return '';
    }
  };

  // 프로필 이미지 파일 업로드
  
  if (user) {
    const imagesRef = ref(storage, `user/${auth.currentUser.uid}/`);
    listAll(imagesRef)
      .then((res) => {
        // 가져온 이미지 목록을 업로드 시간이 최근인 순서대로 정렬
        res.items.sort((a, b) => b.timeCreated - a.timeCreated);
        // 가장 첫번째 이미지의 다운로드 URL을 가져옴
        return getDownloadURL(res.items[0]);
      })
      .then((url) => {
        setImageUrl(url);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <section className="about">
      <div className="card">
        <div className="profile">
          <img src={imageUrl} alt="user uploaded" />
        </div>
        <div className="info">
          <div className="name">
            <p><span>{name}</span></p>
            <p><span>{major}</span>&nbsp;<span>{class_of}</span></p>
          </div>
          <div className="contacts" >
            <p>🎂{age}</p>
            <p>📞+(82){phone}</p>
            <p>📧{email}</p>
          </div>
          <div className="ranking">
            <p >내 랭킹</p>
          </div>
          <div className="ranking">
            <p >N 위</p>
          </div>
        </div>
        <div className="daelim" >
          <img src="../images/mypageimg/symbol3.png" />
        </div>
      </div>      
      <Link to="/"><p className="goMain">메인 화면 가기</p></Link>      
    </section>
  )
}

export default MyPage;