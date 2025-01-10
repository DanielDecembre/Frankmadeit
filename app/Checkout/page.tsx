import Image from 'next/image';
import './checkout.css';

const nsr = () => {
  return (
    <div className="outer-container">
       <div className="logo-images">
        <div className ="tab1">
          Home
        </div>
        <div className ="tab2">
        <a href="mailto:danieldecembre15@gmail.com" onclick="window.location.href='mailto:danieldecembre15@gmail.com'">Contact Us</a>
        </div>
              <Image src="/FRANKblanc.png" className="photo-2" alt="LOGO" width={90} height={90} />
            </div>
      <div className="content-container">
        <main className="main-content">
          <div className="product-header">
            <h2 className="title">NSR Match-Box – 2 Options</h2>
          </div>

          <div className="product-layout">
            {/* Left Side: Image */}
            <div className="product-images">
              <Image src="/There-once-was.png" className="photo-1" alt="NSR Match-Box" width={300} height={300} />
            </div>

            {/* Right Side: Product Description and Options */}
            <div className="product-details">
              <p className="description">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, 
              </p>
              <div className="color-options">
                <div className="color-circle black"></div>
                <div className="color-circle blue"></div>
              </div>
              <div className="buttons">
                <button className="store-btn">Buy Now</button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default nsr;