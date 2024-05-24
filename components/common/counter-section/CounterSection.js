import { useEffect, useRef, useState } from "react";
import Counter from "../Counter/Counter";

const CounterSection = () => {
    const [isCounterStarted, setIsCounterStarted] = useState(false);

    useEffect(() => {
      const checkCounter = () => {
        const hasCounterStarted = localStorage.getItem("counterStarted");
        if (!hasCounterStarted) {
          setIsCounterStarted(true);
          localStorage.setItem("counterStarted", "true");
        }
      };
  
      checkCounter();
  
      return () => {
        localStorage.removeItem("counterStarted");
      };
    }, []);
    return (
        <section>
      <div className="py-20 px-20">
        <div className="grid grid-cols-12 bg-gradient-to-r from-spyne_blue-30 to-spyne_blue-80">
          <div className="col-span-6 mt-10">huukui</div>
          <div className="col-span-6 -mt-13">
            <br />
            <h3 className="">Award-Winning AI</h3>
            <p>Photography & Editing Software</p>
            {isCounterStarted && <Counter x={5} time={700} />}
            {isCounterStarted && <Counter x={75} time={30} />}
            {isCounterStarted && <Counter x={10} time={400} />}
            {isCounterStarted && <Counter x={100} time={20} />}
          </div>
        </div>
      </div>
    </section>
    );
  };
  
  export default CounterSection;
 
  
  
  
  
  
  