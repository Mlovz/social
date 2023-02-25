import { useSelector } from "react-redux";
import Slick from "react-slick";
import "./carousel.scss";

const Carousel = ({ photos, className, children }) => {
  const PrevArrow = ({ onClick }) => {
    return (
      <div className="circle circle-prev" left={16} onClick={onClick}>
        <svg
          viewBox="64 64 896 896"
          focusable="false"
          data-icon="left"
          width="1em"
          height="1em"
          fill="currentColor"
          aria-hidden="true"
        >
          <path d="M724 218.3V141c0-6.7-7.7-10.4-12.9-6.3L260.3 486.8a31.86 31.86 0 000 50.3l450.8 352.1c5.3 4.1 12.9.4 12.9-6.3v-77.3c0-4.9-2.3-9.6-6.1-12.6l-360-281 360-281.1c3.8-3 6.1-7.7 6.1-12.6z"></path>
        </svg>
      </div>
    );
  };

  const NextArrow = ({ onClick }) => {
    return (
      <div className="circle circle-next" onClick={onClick}>
        <svg
          viewBox="64 64 896 896"
          focusable="false"
          data-icon="right"
          width="1em"
          height="1em"
          fill="currentColor"
          aria-hidden="true"
        >
          <path d="M765.7 486.8L314.9 134.7A7.97 7.97 0 00302 141v77.3c0 4.9 2.3 9.6 6.1 12.6l360 281.1-360 281.1c-3.9 3-6.1 7.7-6.1 12.6V883c0 6.7 7.7 10.4 12.9 6.3l450.8-352.1a31.96 31.96 0 000-50.4z"></path>
        </svg>
      </div>
    );
  };

  const settings = {
    infinite: true,
    draggable: false,
    dots: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    initialSlide: 0,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
  };

  const theme = useSelector((state) => state.theme);

  return (
    <div className="carousel-card">
      {/* {hover && children} */}
      {children}

      <Slick
        {...settings}
        className={`carousel-card_slider ${className || ""}`}
      >
        {photos?.map((item, index) => (
          <div className="carousel-card_slide" key={index}>
            {item.url.match(/video/i) ? (
              <video controls src={item.url}></video>
            ) : (
              <img
                style={{ filter: theme ? "invert(1)" : "invert(0)" }}
                src={item.url}
                alt=""
              />
            )}
          </div>
        ))}
      </Slick>
    </div>
  );
};

export default Carousel;
