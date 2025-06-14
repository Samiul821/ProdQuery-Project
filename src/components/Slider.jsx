import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const sliderData = [
  {
    id: 1,
    image:
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1470&q=80",
    title: "Find the Best Products",
    description: "Discover user queries & honest reviews for informed choices.",
    buttonText: "Explore Queries",
  },
  {
    id: 2,
    image:
      "https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?auto=format&fit=crop&w=1470&q=80",
    title: "Boycott with Confidence",
    description:
      "Know which products to avoid and why, powered by the community.",
    buttonText: "Learn More",
  },
  {
    id: 3,
    image:
      "https://images.unsplash.com/photo-1556761175-129418cb2dfe?auto=format&fit=crop&w=1470&q=80",
    title: "Empowering Consumers",
    description: "Your voice matters — share your queries and help others.",
    buttonText: "Start Sharing",
  },
  {
    id: 4,
    image:
      "https://images.unsplash.com/photo-1556761175-129418cb2dfe?auto=format&fit=crop&w=1470&q=80",
    title: "Community Verified Data",
    description:
      "All product data is verified by users — honest, unbiased and up-to-date.",
    buttonText: "Join the Movement",
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
    <div className="max-w-7xl mx-auto rounded-lg overflow-hidden shadow-2xl">
      <Slider {...settings}>
        {sliderData.map((slide) => (
          <div key={slide.id} className="relative h-96 md:h-[500px]">
            {/* Background image */}
            <div
              className="absolute inset-0 bg-cover bg-center filter brightness-75"
              style={{ backgroundImage: `url(${slide.image})` }}
            />
            {/* Overlay gradient */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/30 to-transparent" />

            {/* Content */}
            <div className="relative z-10 flex flex-col justify-center h-full px-8 md:px-24 text-white max-w-3xl">
              <h2 className="text-4xl md:text-6xl font-extrabold mb-4 drop-shadow-lg tracking-wide">
                {slide.title}
              </h2>
              <p className="mb-8 text-lg md:text-xl leading-relaxed drop-shadow-md">
                {slide.description}
              </p>
              <button
                className="self-start bg-green-600 hover:bg-green-700 transition rounded-full py-3 px-8 font-semibold shadow-lg active:scale-95"
                onClick={() => alert(`Clicked: ${slide.buttonText}`)}
              >
                {slide.buttonText}
              </button>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default ModernSlider;
