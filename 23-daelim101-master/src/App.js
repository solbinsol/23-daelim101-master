
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SignUp from './pages/SignUp';
import Loading from './pages/Loading';
import InsertUserData from './pages/InsertUserData';
import Login from './pages/Login';
import MyPage from './pages/MyPage';
import MainPage from './pages/MainPage';
import VsPage16 from './pages/vs16page';

function App() {
  return (
    <div className="daelim101">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainPage />}></Route>
          <Route path="/mypage" element={<MyPage />}></Route>
          <Route path="login" element={<Login/>}></Route>
          <Route path="/signup" element={<SignUp />}></Route>
          <Route path="/loading" element={<Loading />}></Route>
          <Route path="/vs16" element={<VsPage16 />}></Route>
          <Route path="/userData" element={<InsertUserData />}></Route>          
        </Routes>
      </BrowserRouter>      
    </div>
  );
}

export default App;
