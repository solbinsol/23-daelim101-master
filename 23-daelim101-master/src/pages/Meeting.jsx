import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ref, listAll, getDownloadURL } from 'firebase/storage';
import { auth, storage } from '../firebase-config';
import '../styles/Meeting.css';
import Swiper from 'swiper';

import { onAuthStateChanged } from "firebase/auth";

import { getDoc, doc } from 'firebase/firestore'
import { db} from '../firebase-config'


function Meeting() {
    const [participants, setParticipants] = useState([]);

    const [hodus, setHodu] = useState([]);
    const [displays, setDisplays] = useState([]);
    const [winnerdisplay, setWinnerDisplay] = useState(false);
    const [winnerhodu, setWinners] = useState([]);
    const [roundCount, setRound] = useState(1);
    const [totalRound, setTotal] = useState(8);
  
    useEffect(() => {
        const listAllImages = async () => {
          try {
            const foldersRef = ref(storage, 'user-M');
            const foldersSnapshot = await listAll(foldersRef);
      
            const randomFolderIndex = Math.floor(Math.random() * foldersSnapshot.prefixes.length);
            const selectedFolder = foldersSnapshot.prefixes[randomFolderIndex];
      
            const imagesRef = ref(storage, selectedFolder);
            const imagesSnapshot = await listAll(imagesRef);
      
            if (imagesSnapshot.items.length >= 2) {
              const randomIndexes = getRandomIndexes(imagesSnapshot.items.length, 2);
              const imagePromises = randomIndexes.map(async (index) => {
                const item = imagesSnapshot.items[index];
                const url = await getDownloadURL(item);
      
                // Get the corresponding name from Firestore
                const docRef = doc(db, 'user-M', item.name); // Assuming 'users' is the collection name
                const docSnapshot = await getDoc(docRef);
                const name = docSnapshot.exists() ? docSnapshot.data().name : '';
      
                return {
                  name,
                  src: url,
                };
              });
      
              const images = await Promise.all(imagePromises);
              setDisplays(images);
              setParticipants(images);
            }
          } catch (error) {
            console.log(error);
          }
        };
      
        listAllImages();
      }, []);
      
  
    const getRandomIndexes = (range, count) => {
      const indexes = new Set();
      while (indexes.size < count) {
        const index = Math.floor(Math.random() * range);
        indexes.add(index);
      }
      return Array.from(indexes);
    };

    useEffect(() => {
      var swiper = new Swiper(".swiper-container", {
        effect: "coverflow",
        grabCursor: true,
        centeredSlides: true,
        slidesPerView: "auto",
        coverflowEffect: {
          rotate: 20,
          stretch: 0,
          depth: 350,
          modifier: 1,
          slideShadows: true
        },
        pagination: {
          el: ".swiper-pagination"
        }
      });
    }, []);

    const [selectedSlide, setSelectedSlide] = useState('t-1');
  return (
    <div>
      <header id="header2">
      <div className="Lhead">
          <li><img className="weblogo" src="../img/Daelim_logo.png" /></li>
        </div>
        <div className="Rhead">
          
            <p>로그인</p>
            <p>회원가입</p>
          </div>
        
        
      </header>

      <div id="content2">
        <div id="box">
          <div className="slider">
            <input type="radio" name="testimonial" id="t-1"
            checked={selectedSlide === 't-1'}
            onChange={() => setSelectedSlide('t-1')}
            />
            <input type="radio" name="testimonial" id="t-2" 
            checked={selectedSlide === 't-2'}
            onChange={() => setSelectedSlide('t-2')}
          />
            <input type="radio" name="testimonial" id="t-3"  checked={selectedSlide === 't-3'}
              onChange={() => setSelectedSlide('t-3')}
            />
            <input type="radio" name="testimonial" id="t-4" checked={selectedSlide === 't-4'}
              onChange={() => setSelectedSlide('t-4')}
            />
            <div className="testimonials">
              <label className="item" htmlFor="t-1">
                <img src={displays[0]?.src} />
                <h1>{}</h1>
                <p>{}</p>
                <button className="w-btn w-btn-blue" type="button">
                  messages
                </button>
              </label>
              <label className="item" htmlFor="t-2">
                <img src={displays[1]?.src} />
                <h1>{displays[1]?.name}</h1>
                <p>{}</p>
                <button className="w-btn w-btn-blue" type="button">
                  messages
                </button>
              </label>
              <label className="item" htmlFor="t-3">
                <img src={displays[2]?.src} />
                <h1>{displays[2]?.name}</h1>
                <p>컴퓨터정보학부</p>
                <button className="w-btn w-btn-blue" type="button">
                  messages
                </button>
              </label>
              <label className="item" htmlFor="t-4">
                <img src={displays[2]?.src} />
                <h1>이지은</h1>
                <p>컴퓨터정보학부</p>
                <button className="w-btn w-btn-blue" type="button">
                  messages
                </button>
              </label>
            </div>
          </div>
        </div>
        <div className="dots">
          <label htmlFor="t-1"></label>
          <label htmlFor="t-2"></label>
          <label htmlFor="t-3"></label>
          <label htmlFor="t-4"></label>
        </div>

        <footer id="footer2">
          <a href="https://github.com" target="_blank" rel="noopener noreferrer">
            Github
          </a>
          <nav>
            <p>
              <span>저자: 개발새발</span>
              <br />
              <span>이메일: xxxxxxx@gmail.com</span>
              <br />
              <span>Copyright 2023. daelim. All Rights Reserved.</span>
            </p>
          </nav>
        </footer>
      </div>
    </div>
  );
}

export default Meeting;