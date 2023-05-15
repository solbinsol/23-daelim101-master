import { useState, useEffect } from 'react';
// 파이어베이서 파일에서 import 해온 db
import {db, auth, storage} from '../firebase-config'
// db에 데이터에 접근을 도와줄 친구들
import { setDoc, doc } from "firebase/firestore";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import "../styles/InsertUserData.css";
// 페이지를 이동할때 쓰는 메서드
import { useNavigate } from "react-router-dom"

const InsertUserData = () => {
  const [newName, setNewName] = useState("");
  const [newGender, setNewGender] = useState("");
  const [newAge, setNewAge] = useState("");
  const [newMajor, setNewMajor] = useState("");
  const [newPhone, setNewPhone] = useState("");
  const [newStudentNo, setNewStudentNo] = useState("");
  const [file, setFile] = useState("");
  
  const [nameMessage, setNameMessage] = useState("");
  const [genderMessage, setGenderMessage] = useState("");
  const [ageMessage, setAgeMessage] = useState("");
  const [majorMessage, setMajorMessage] = useState("");
  const [phoneMessage, setPhoneMessage] = useState("");
  const [studentNoMessage, setStudentNoMessage] = useState("");
  const [fileMessage, setFileMessage] = useState("");

  const [isName, setIsName] = useState(false);
  const [isGender, setIsGender] = useState(false);
  const [isAge, setIsAge] = useState(false);
  const [isMajor, setIsMajor] = useState(false);
  const [isPhone, setIsPhone] = useState(false);
  const [isStudentNo, setIsStudentNo] = useState(false);
  const [isFile, setIsFile] = useState(false);

  // navigate라는 변수에 저장 후 navigate의 인자로 설정한 path값을 넘겨주면 해당 경로로 이동
  const navigate = useNavigate();

  // error를 체크해줄 state
  const [hasError, setHasError] = useState(false);

  const [percent, setPercent] = useState(0);
    
  useEffect(() => {
    if (isName && isAge && isGender && isPhone && isMajor && isStudentNo && isFile) {
      setHasError(false); 
    } else {
      setHasError(true);
    }
  }, [isName, isAge, isGender, isPhone, isMajor, isStudentNo, isFile]); 

  // 유효성 검사 (name)
  const onChangeName = (e) => {
    const currentName = e.target.value;
    setNewName(currentName);
    const NameRegExp =
    /[가-힣]/;
    if (currentName.length < 2 || currentName.length > 5 && !NameRegExp.text(currentName)) {
      setNameMessage("이름은 2글자 이상 5글자 이하로 입력해주세요!");
      setIsName(false);
    } else {
      setNameMessage("");
      setIsName(true);
    }
  };
  // 유효성 검사 (gender)
  const onChangeGender = (e) => {
    const currentGender = e.target.value;
    setNewGender(currentGender);
    if (currentGender === "") {
      setGenderMessage("성별을 선택해주세요!");
      setIsGender(false);
    } else {
      setGenderMessage("");
      setIsGender(true);
    }
  };
  // 유효성 검사 (major)
  const onChangeMajor = (e) => {
    const currentMajor = e.target.value;
    setNewMajor(currentMajor);
    if (currentMajor === "") {
      setMajorMessage("전공을 선택해주세요!");
      setIsMajor(false);
    } else {
      setMajorMessage("");
      setIsMajor(true);
    }
  }
  // 유효성 검사 (age)
  const onChangeAge = (e) => {
    const currentAge = e.target.value;
    setNewAge(currentAge);
 
    const AgeRegExp =
    /[0-9]/;
    if (!AgeRegExp.test(currentAge)) {
        setAgeMessage(
        "나이를 올바르게 입력해주세요!"
        );
        setIsAge(false);
    } else {
        setAgeMessage("");
        setIsAge(true);
    }
  };
  // 유효성 검사 (phone)
  const onChangePhone = (getNumber) => {
    const currentPhone = getNumber;
    setNewPhone(currentPhone);
    const phoneRegExp = /^01([0|1|6|7|8|9])-?([0-9]{3,4})-?([0-9]{4})$/;
 
    if (!phoneRegExp.test(currentPhone)) {
      setPhoneMessage("올바른 형식이 아닙니다!");
      setIsPhone(false);
    } else {
      setPhoneMessage("사용 가능한 번호입니다!");
      setIsPhone(true);
    }
  };
  // 유효성 검사 (phone의 하이픈 추가)
  const addHyphen = (e) => {
    const currentNumber = e.target.value;
    setNewPhone(currentNumber);
    if (currentNumber.length === 3 || currentNumber.length === 8) {
      setNewPhone(currentNumber + "-");
      onChangePhone(currentNumber + "-");
    } else {
      onChangePhone(currentNumber);
    }
  };
  // 유효성 검사 (studentNo)
  const onChangeStudentNo = (e) => {
    const currentStudentNo = e.target.value;
    setNewStudentNo(currentStudentNo); 
    const StudentNoRegExp =
    /[0-9]{9}/;
    if (!StudentNoRegExp.test(currentStudentNo)) {
        setStudentNoMessage(
        "9자리의 학번을 입력해주세요!"
        );
        setIsStudentNo(false);
    } else {
        setStudentNoMessage("");
        setIsStudentNo(true);
    }
  };
  // 유효성 검사 (file)
  const onChangeFile = (e) =>{
    const currentFile = e.target.files[0];
    const currentFileName = e.target.files[0].name;

    setFile(currentFile);
    const fileRegExp = /(\.jpg|\.jpeg|\.png)$/i;
    
    if(!fileRegExp.test(currentFileName)){
      setFileMessage("JPG, JPEG, PNG 파일만 업로드해 주세요 !");
      setIsFile(false);
    }
    else{
      setFileMessage("");
      setIsFile(true);
    }

  }
  
  // 스토리지 파일 업로드 메서드
  function handleUpload(user) {
    if (!file) {
      alert("Please upload an image first!");
      }
      
      const storageRef = ref(storage, `/user/${user}/${file.name}`);
      
      // progress can be paused and resumed. It also exposes progress updates.
      // Receives the storage reference and the file to upload.
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
        const percent = Math.round(
        (snapshot.bytesTransferred / snapshot.totalBytes) * 100);
        
        // update progress
        setPercent(percent);
        },
        (err) => console.log(err),
        () => {
        // download url
        getDownloadURL(uploadTask.snapshot.ref).then((url) => {
        console.log(url);
        });
        }
        );
      
  }

  // 회원가입 및 fireStroe 데이터 생성
  const insertData = async (e) =>{
    e.preventDefault();
    try {
        // Firebase Authentication에서 생성된 사용자 UID를 가져와 Firestore에 저장
        await setDoc(doc(db, "user", auth.currentUser.uid), {
            name: newName,
            gender: newGender,
            age: newAge,
            major: newMajor,
            phone: newPhone,
            studentNo: newStudentNo            
        });                
        handleUpload(auth.currentUser.uid);
        console.log("파일 업로드 성공");
        alert("회원가입을 축하드립니다! 메인페이지로 이동합니다.");
        navigate('/');
    } catch (error) {
        console.log(error.message);
    }
}

return (
    // 유저 정보 입력 페이지 html
    <form onSubmit={insertData}>
        <div id="header">
          <img src="img/Daelim_logo.png" id="logo" alt="Daelim101 Logo"/>
        </div>
        <div className="wrapper">
              <div id="content">                                       
                   <div>
                     <h3><label htmlFor="name">이름</label></h3>
                      <span className="box int_name">
                          <input type="text" id="name" className="int" maxLength="4" onChange={onChangeName}/>
                      </span>
                      <span className="message">{nameMessage}</span>
                  </div>
                  <div>
                     <h3><label htmlFor="age">나이</label></h3>
                      <span className="box int_age">
                          <input type="text" id="age" className="int" maxLength="2" onChange={onChangeAge}/>
                      </span>
                      <span className="message">{ageMessage}</span>
                  </div>
                  <div>
                      <h3><label htmlFor="gender">성별</label></h3>
                      <span className="box gender_code">
                          <select id="gender" className="sel" onChange={onChangeGender}>                                                            
                              <option value="">성별 선택</option>
                              <option value="M">남자</option>
                              <option value="F">여자</option>
                          </select>
                      </span>                      
                      <span className="message">{genderMessage}</span>
                  </div>
                  <div>
                      <h3><label htmlFor="phoneNo">휴대전화</label></h3>
                      <span className="box int_phone">
                          <input type="tel" id="phone" className="int" maxLength="16" placeholder="하이픈(-) 형식으로 입력해주세요" onChange={addHyphen}/>
                      </span>
                      <span className="message">{phoneMessage}</span>
                  </div>
                  <div>
                      <h3><label htmlFor="studentNo">학번</label></h3>
                      <span className="box int_studentNo">
                          <input type="text" id="studentNo" className="int" maxLength="9" onChange={onChangeStudentNo}/>
                      </span>
                      <span className="message">{studentNoMessage}</span>
                  </div>
                  <div>
                      <h3><label htmlFor="major">전공</label></h3>
                      <span className="box major_code">
                          <select id="major" className="sel" onChange={onChangeMajor}>         
                              <option value="">전공 선택</option>                     
                              <option value="ai">AI시스템과</option>
                              <option value="robot">로봇자동화공학과</option>
                              <option value="architectural">건축과</option>
                              <option value="mechanic">기계공학과</option>
                              <option value="car">미래자동차공학부</option>
                              <option value="broadcast">방송음향영상학부</option>
                              <option value="industry">산업경영과</option>
                              <option value="fireSafety">소방안전설비과</option>
                              <option value="electronicCommunication">전자·통신과</option>
                              <option value="smartFactory">스마트팩토리학부</option>
                              <option value="design">실내디자인학부</option>
                              <option value="medical">의공융합과</option>
                              <option value="electronic">전기공학과</option>
                              <option value="computer">컴퓨터정보학부</option>
                              <option value="construction">건설환경공학과</option>
                              <option value="semiconductor">반도체학과</option>
                              <option value="business">경영학과</option>
                              <option value="media">도서관미디어정보과</option>
                              <option value="office">사무행정학과</option>
                              <option value="social">사회복지학과</option>
                              <option value="childEducation">유아교육과</option>
                              <option value="air">항공서비스과</option>
                              <option value="hotelLeisure">호텔레저학과</option>
                              <option value="childCare">아동보육과</option>
                              <option value="sport">스포츠학부</option>
                              <option value="hotelCook">호텔조리·제과학부</option>
                              <option value="healthSafety">보건안전학과</option>
                              <option value="biomedical">보건의료공학과</option>
                              <option value="medicalAdministration">보건의료행정과</option>
                              <option value="speech">언어치료학과</option>
                              <option value="navy">해군기술부사관과</option>
                          </select>
                      </span>                      
                      <span className="message">{majorMessage}</span>
                  </div>
                  <div>
                      <h3><label htmlFor="photo">본인 사진 첨부</label></h3>
                      <span className="box int_photo">
                          <input type="file" id="photo" multiple accept="image/*" onChange={onChangeFile}/>
                      </span>       
                      <span className="message">{fileMessage}</span>                                                                                                                                                
                  </div>                                            
                  <div className="btn_area">                        
                      <button type="submit" id="btnInsert" disabled={hasError} >
                          <span>입 력 완 료</span>
                      </button>
                  </div>
              </div>
          </div>
    </form> 
  );


}

export default InsertUserData;

