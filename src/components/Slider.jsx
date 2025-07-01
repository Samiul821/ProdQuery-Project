import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const sliderData = [
  {
    id: 1,
    image:
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1470&q=80",
    title: "Raise Awareness, Boycott Wisely",
    description:
      "Explore community-raised concerns about unethical products and choose alternatives that align with your values.",
  },
  {
    id: 2,
    image:
      "https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?auto=format&fit=crop&w=1470&q=80",
    title: "Boycott with Purpose",
    description:
      "Find out which brands support injustice and make informed choices backed by real user insights.",
  },
  {
    id: 3,
    image:
      "https://images.unsplash.com/photo-1556761175-129418cb2dfe?auto=format&fit=crop&w=1470&q=80",
    title: "Your Voice Can Make a Change",
    description:
      "Share your product concerns with the community and recommend better, ethical alternatives.",
  },
  {
    id: 4,
    image:
      "https://images.unsplash.com/photo-1556761175-129418cb2dfe?auto=format&fit=crop&w=1470&q=80",
    title: "Verified by the People",
    description:
      "All boycott reasons and suggestions are user-generated — ensuring honesty, transparency, and relevance.",
  },
];

const ModernSlider = () => {
  const settings = {
    dots: true,
    infinite: true,
    fade: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 6000,
    speed: 1200,
    arrows: true,
    pauseOnHover: true,
  };

  return (
    <div className="rounded-lg max-h-[70vh] h-auto overflow-hidden shadow-2xl">
      <Slider {...settings}>
        {sliderData.map((slide) => (
          <div
            key={slide.id}
            className="relative h-[65vh] sm:h-[70vh] md:h-[75vh] lg:h-[80vh]"
          >
            {/* Background image */}
            <div
              className="absolute inset-0 bg-cover bg-center filter brightness-75"
              style={{ backgroundImage: `url(${slide.image})` }}
            />
            {/* Overlay gradient */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/30 to-transparent" />

            {/* Content */}
            <div className="relative z-10 flex flex-col justify-center items-start h-full px-6 sm:px-12 md:px-20 lg:px-32 xl:px-40 text-white text-left max-w-4xl">
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold mb-4 drop-shadow-lg tracking-wide font-poppins">
                {slide.title}
              </h2>
              <p className="mb-6 sm:mb-8 text-base sm:text-lg md:text-xl leading-relaxed drop-shadow-md">
                {slide.description}
              </p>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default ModernSlider;
