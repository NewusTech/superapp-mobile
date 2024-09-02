import { useEffect, useRef, useState } from "react";

import { Typography } from "@/components";

const CountdownTimer = ({
  expirationTime,
  handleAfterExpired,
}: {
  expirationTime: string;
  handleAfterExpired?: () => void;
}) => {
  const calculateTimeLeft = () => {
    const difference =
      new Date(expirationTime).getTime() - new Date().getTime();
    let timeLeft = {} as any;

    if (difference > 0) {
      timeLeft = {
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    } else {
      timeLeft = { hours: 0, minutes: 0, seconds: 0 };
    }

    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());
  const hasExpired = useRef(false); // Ref untuk melacak apakah fungsi sudah dipanggil

  useEffect(() => {
    const timer = setInterval(() => {
      const newTimeLeft = calculateTimeLeft();
      setTimeLeft(newTimeLeft);

      // Mengecek apakah waktu sudah habis dan apakah fungsi sudah pernah dipanggil
      if (
        newTimeLeft.hours === 0 &&
        newTimeLeft.minutes === 0 &&
        newTimeLeft.seconds === 0
      ) {
        if (!hasExpired.current && handleAfterExpired) {
          console.log("Executing handleAfterExpired"); // Debugging: log eksekusi fungsi
          handleAfterExpired(); // Memanggil fungsi hanya satu kali
          hasExpired.current = true; // Menandai bahwa fungsi sudah dipanggil
          clearInterval(timer); // Hentikan interval setelah waktu habis
        }
      }
    }, 1000);

    return () => clearInterval(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [expirationTime]);

  return (
    <Typography
      fontFamily="Poppins-Regular"
      color="dangerbase"
      style={{ textAlign: "center" }}
      fontSize={12}
    >
      Selesaikan Pembayaran Dalam {String(timeLeft.hours).padStart(2, "0")} :{" "}
      {String(timeLeft.minutes).padStart(2, "0")} :{" "}
      {String(timeLeft.seconds).padStart(2, "0")}
    </Typography>
  );
};

export default CountdownTimer;
