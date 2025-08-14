import React, { useState, useEffect } from "react";
import IconTopo from "../../assets/pra-cima.png";
import "./ScrollToTop.css";



const ScrollToTop: React.FC = () => {
  const [show, setShow] = useState(false);

  const handleScroll = () => {
    const scrolled = window.scrollY;
    const halfPage = document.documentElement.scrollHeight / 2;
    setShow(scrolled > halfPage);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleClick = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      {show && (
        <button className="scroll-to-top" onClick={handleClick}>
          <img src={IconTopo} alt="Subir" />
        </button>
      )}
    </>
  );
};

export default ScrollToTop;