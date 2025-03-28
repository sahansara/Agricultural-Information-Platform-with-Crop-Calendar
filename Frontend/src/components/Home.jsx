import { useState } from "react";

import Navbar from "./Navbar";
import ImageSlider from "./ImageSlider";
import AboutUs from "./AboutUs";
import OurService from "./OurServise";
import OldUserFeedBacks from "./OldUserFeedBacks";
import Footer from "./Footer";
import SocialMediaSpeedDial from "./SocialMedia";
import ChatBot from "./ChatBot";

function Home() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <Navbar />
      <ImageSlider />
      <AboutUs />
      <OurService />
      <OldUserFeedBacks />
      <SocialMediaSpeedDial />
      <ChatBot />

      <Footer />
    </div>
  );
}

export default Home;
