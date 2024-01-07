// components/ImageSlideshow.js
import React, { useState, useEffect } from "react";
import Image from "next/image";
import styles from "./ImageSlideshow.module.css";
import one from "../images/1.png";
import two from "../images/2.png";
import three from "../images/3.png";
import four from "../images/4.png";
import five from "../images/5.png";
import six from "../images/6_1.png";

const ImageSlideshow = () => {
  const [index, setIndex] = useState(0);
  const images = [one, two, three, four, five, six];
  

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [images]);

  return (
    <div className={styles.slideshow}>
      {images.map((image, i) => (
        <div
          key={i}
          className={`${styles.slide} ${i === index ? styles.active : ""}`}
        >
          <Image src={image} alt={`Slide ${i + 1}`} width={800} height={400} />
        </div>
      ))}
    </div>
  );
};

export default ImageSlideshow;
