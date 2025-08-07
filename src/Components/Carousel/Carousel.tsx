import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "../Carousel/Carousel.css"
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";


export default function Carousel() {
  const slides = [
    {
      img: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1600&q=80",
      title: "Invista com segurança",
      description: "Tenha as melhores análises e dados para seus investimentos."
    },
    {
      img: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1600&q=80",
      title: "Mercados globais",
      description: "Acompanhe ações, ETFs e criptomoedas em tempo real."
    },
    {
      img: "https://images.unsplash.com/photo-1515169067865-5387ec356754?auto=format&fit=crop&w=1600&q=80",
      title: "Tecnologia de ponta",
      description: "Ferramentas modernas para você tomar decisões inteligentes."
    }
  ];

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