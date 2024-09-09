
import "./page.css" ;
import Nav from './Components/Nav/nav';

export default function Home() {
  return (
    <div className="main-container">
      <Nav />
      <div className="video-container">
        <video className="compvid" autoPlay muted loop>
          <source src="/LANDSCAPE.mp4" type="video/mp4" />
          Your browser does not support this video tag.
        </video>
      </div>
    </div>
  );
}