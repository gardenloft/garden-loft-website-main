
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import MainPage from "./components/MainPage/MainPage"
import FAQ from "./components/FAQ/FAQ";
import Tour from './components/Tour/Tour'
import Village from './components/Village/Village'
import About from "./components/About/About";
import Atrium from "./components/Atrium/Atrium";
import Brochure from './components/Brochure/Brochure';
import Book from './components/Book-Tour/Book';
import Initial from "./components/Initial-meeting/Initial";
import Feasibility from "./components/Feasibility-report/Feasibility";
import Advisory from "./components/Advisory-Survey/Advisory";

import Reselling from "./components/Reselling/Reselling";

import Phone from "./components/Phone/Phone";
import LearnMore from "./components/LearnMore/LearnMore";
import MortgageSpecialistForm from "./components/morgage/MortgageSpecialistForm..js"
import Home from "./components/Homepage/Home.tsx";
import AppPrivacyPolicy from "./components/Privacy/AppPrivacyPolicy.tsx";




function App() {
  return (
    <>
<Router> 
        <Routes>
        <Route path="/" element={<Home />} />
          <Route path="/mainpage" element={<MainPage />} />
          <Route path="/about" element={<About/>} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/tour" element={<Tour />} />
          <Route path="/village" element={<Village />} />
          <Route path="/brochure" element={<Brochure />} />
          <Route path="/book-tour" element={<Book />} />
          <Route path="/feasibility-report" element={<Feasibility />} />
          <Route path="/phone-call" element={<Phone /> }/>
          <Route path="/atrium" element={<Atrium /> }/>
          <Route path="/initial" element={< Initial/> }/>
         < Route path="/reselling" element={<Reselling/>}/>
          <Route path="/learn-more" element={<LearnMore/>}/>
          <Route path="/morgage" element={<MortgageSpecialistForm/>}/>
          <Route path="/app-privacypolicy" element={<AppPrivacyPolicy />} />
          <Route path="/advisory-survey" element={<Advisory />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
