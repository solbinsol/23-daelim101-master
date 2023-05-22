import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ref, listAll, getDownloadURL } from 'firebase/storage';
import { auth, storage } from '../firebase-config';
import  '../styles/vs16Man.css'
function VsPage16() {
  const [displays, setDisplays] = useState([]);
  const [winnerDisplay, setWinnerDisplay] = useState(false);

  const [roundCount, setRoundCount] = useState(1);
  const [totalRound, setTotalRound] = useState(8);
  const [hodus, setHodus] = useState([]);
  const [winnerHodu, setWinnerHodu] = useState([]);


  useEffect(() => {
    const listAllImages = async () => {
      try {
        const imagesRef = ref(storage, 'user-M/test1'); // user-M 폴더 경로로 수정
        const imagesSnapshot = await listAll(imagesRef);

        if (imagesSnapshot.items.length > 0) {
            const randomIndexes = getRandomIndexes(imagesSnapshot.items.length, 2);
            const imagePromises = randomIndexes.map(async (index) => {
              const item = imagesSnapshot.items[index];
              const url = await getDownloadURL(item);
            return {
              name: item.name,
              src: url,
            };
          });

          const images = await Promise.all(imagePromises);
          setDisplays(images);
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

  const clickEvent = (hodu) => () => {
    if (hodus.length < totalRound) {
      // 최종 라운드 이전의 라운드
      const remainingHodus = displays.filter((h) => h !== hodu);
      const randomIndexes = getRandomIndexes(remainingHodus.length, 1);
      const nextHodu = remainingHodus[randomIndexes[0]];
      setWinnerHodu([...winnerHodu, hodu]);
      setHodus([...hodus, hodu]);
      setRoundCount(roundCount + 1);
      setDisplays([hodu, nextHodu]);
    } else if (hodus.length === totalRound) {
      // 최종 라운드
      setWinnerHodu([...winnerHodu, hodu]);
      setDisplays([hodu]);
      setWinnerDisplay(true);
    }
  };
  
  return (
    <div className="page">
      <div className="card">
        {winnerDisplay ? (
          <div className='WC'>
            <h1 className="title">최종</h1>
            {displays.length > 0 && (
              <div className="title">
                <img className="winnerhodu" src={displays[0].src} alt={displays[0].name} />
              </div>
            )}
            {displays.length > 0 && (
              <div className="title">
                <label>{displays[0].name}</label>
              </div>
            )}
            <div className="action">
              <Link to="/" style={{ textDecoration: 'none' }}>
                <input type="submit" value="다시하기" />
              </Link>
              <input type="submit" value="공유하기" />
            </div>
          </div>
        ) : (
          <div>
            <h1 className="title">이상형 월드컵 &nbsp;&nbsp;남성&nbsp;&nbsp;{roundCount}/{totalRound}</h1>
            <div className="basic">
            {displays.map((d) => (
                <div className="vsImg" key={d.name} onClick={clickEvent(d)}>
                <img className="kinghodu" src={d.src} alt={d.name} />
                <div>{d.name}</div>
            </div>
            ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default VsPage16