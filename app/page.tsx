import "./page.css";
import Nav from './Components/Nav/nav';

export default function Home() {
  return (
  <div className="main-container">
  <Nav />
  <div className="video-container">
    <iframe
      className="compvid"
      src="https://www.youtube.com/embed/IWSNxeRBzu4"
      title="YouTube video player"
      frameBorder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
    ></iframe>
  </div>
</div>
  );
}