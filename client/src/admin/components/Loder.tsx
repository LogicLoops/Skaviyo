import Lottie from "lottie-react";
import loaderAnimation from "../../assets/lottie/loader.json"; // adjust path

interface LottieLoaderProps {
  size?: number;      // optional
  message?: string;   // optional
}

const LottieLoader: React.FC<LottieLoaderProps> = ({
//   size = 100,
  message = "Loading...",
}) => {
  return (
    <div className="flex flex-col items-center justify-center bg-gradient-to-br from-emerald-50 via-green-50 to-teal-50 h-screen w-screen">
      <div style={{ width: 200, height: 120 }}>
        <Lottie animationData={loaderAnimation} loop autoplay />
      </div>
      {message && (
        <p className="mt-1 text-sm text-green-500 font-semibold">{message}</p>
      )}
    </div>
  );
};

export default LottieLoader;
