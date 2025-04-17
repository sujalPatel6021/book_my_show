import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import Home from "./Components/Home";
import MoviePage from "./Components/MoviePage";
import EventPage from "./Components/EventPage";
import { useEffect } from "react";
import BestLiveEvent from "./Components/BestLiveEvent";
import BookTicketPage from "./Components/BookTicketPage";
import PageNotFound from "./Components/PageNotFound";
import SeatBook from "./Components/SeatBook";
import PaymentPage from "./Components/PaymentPage";
import ContactUs from "./Components/ContactUs";
import BookPage from "./Components/BookPage";
import PremiereBook from "./Components/PremiereBook";
import MusicStudioBook from "./Components/MusicStudioBook";
import Login from "./Admin/Login";
import AdminHome from "./Admin/AdminHome";
import Users from "./Admin/User";
import Movies from "./Admin/Movies";
import Bookings from "./Admin/Bookings";
import Profile from "./Admin/Profile";

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};
document.addEventListener("selectstart", function (e) {
  e.preventDefault();
});

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <ScrollToTop />
        <Routes>
          <Route index element={<Home />} />
          <Route path="/" element={<Home />} />
          <Route path="/moviepage" element={<MoviePage />} />
          <Route path="/movie/:title" element={<MoviePage />} />
          <Route path="/eventpage" element={<EventPage />} />
          <Route path="/bestliveevent" element={<BestLiveEvent />} />
          <Route path="/bookticketpage" element={<BookTicketPage />} />
          <Route path="*" element={<PageNotFound />} />
          <Route path="/seatbook" element={<SeatBook />} />
          <Route path="/paymentpage" element={<PaymentPage />} />
          <Route path="/contactus" element={<ContactUs />} />
          <Route path="/bookpage" element={<BookPage />} />
          <Route path="/premierebook" element={<PremiereBook />} />
          <Route path="/musicstudiobook" element={<MusicStudioBook />} />
          <Route path="/adminpage" element={<Login />} />
          <Route path="/adminpage/adminhome" element={<AdminHome />} />
          <Route path="/adminpage/users" element={<Users />} />
          <Route path="/adminpage/movies" element={<Movies />} />
          <Route path="/adminpage/bookings" element={<Bookings />} />
          <Route path="/adminpage/profile" element={<Profile />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
