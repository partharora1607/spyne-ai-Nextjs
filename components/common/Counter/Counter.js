import React, { useState, useEffect } from "react";

const Counter = ({counterValue, counterTime,data}) => {
  const [counter, setCounter] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const { scrollTop, clientHeight } = document.documentElement;
      const triggerPoint = clientHeight * 0.5; 

      if (scrollTop > triggerPoint) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    let start = 0;
    let interval;

    if (isVisible) {
      interval = setInterval(() => {
        if (start >= counterValue) {
          clearInterval(interval);
        } else {
          setCounter((prevCounter) => prevCounter + 1);
          start += 1;
        }
      }, counterTime); 
    }

    return () => {
      clearInterval(interval);
    };
  }, [isVisible]);

  useEffect(() => {
    if (!isVisible) {
      setCounter(0);
    }
  }, [isVisible]);

  return (
    <div>
      {isVisible && <div className="xl:text-5xl md:text-xl md:leading-6 xl:leading-[58px] text-3xl text-spyne_blue-600 font-extrabold">{counter}
      {data?.text}</div>}
    </div>
  );
};

export default Counter;
