import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "../Carousel/Carousel.css";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import segurancaImg from "../../assets/seguranca.jpg";
import bitcoinImg from "../../assets/bitcoin.jpg";
import stockImg from "../../assets/stock.jpg";

export default function Carousel() {
  const slides = [
    {
      img: segurancaImg,
      title: "Invista com segurança",
      description: "Tenha as melhores análises e dados para seus investimentos.",
      link: "/pagina-seguranca" 
    },
    {
      img: bitcoinImg,
      title: "Explore o universo das criptomoedas",
      description: "Aprenda e invista nas principais moedas digitais.",
      link: "/CryptoMoeda"
    },
    {
      img: stockImg,
      title: "Tecnologia de ponta",
      description: "Ferramentas modernas para você tomar decisões inteligentes.",
      link: "/pagina-tecnologia"
    }
  ];

  const handleClick = (link: string) => {
    window.location.href = link;
  };

  return (
    <section className="carousel-section">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        spaceBetween={30}
        slidesPerView={1}
        loop
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <div
              className="carousel-slide"
              style={{ backgroundImage: `url(${slide.img})` }}
              onClick={() => handleClick(slide.link)}
            >
              <div className="carousel-text">
                <h2>{slide.title}</h2>
                <p>{slide.description}</p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
