import React from "react";
import Lottie from "react-lottie-player";

const style = {
  coverLottieStyle: { width: "100vw", height: "100vh" },
  lottieStyle: {
    width: "100%",
    height: "100%",
  },
};

function NotFound(props) {
  return (
    <div style={{ ...style.coverLottieStyle }}>
      <Lottie
        loop
        animationData={require(`../../assets/json/notfound.json`)}
        play
        speed={1}
        style={style.lottieStyle}
      />
    </div>
  );
}

export default NotFound;
