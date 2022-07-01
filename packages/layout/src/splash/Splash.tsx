import { Stack } from "@mui/material";
import { useDebounceEffect } from "ahooks";
import React from "react";
import Lottie from "react-lottie";

import tree from "./tree.json";

const defaultOptions = {
  loop: true,
  autoplay: true,
  animationData: tree,
  rendererSettings: {
    preserveAspectRatio: "xMidYMid slice",
  },
};
interface SplashProps {
  onAnimationEnd: () => void;
}
export const Splash: React.FC<SplashProps> = ({
  onAnimationEnd,
}: SplashProps) => {
  useDebounceEffect(
    () => {
      onAnimationEnd();
    },
    [onAnimationEnd],
    {
      wait: 1500,
    }
  );
  return (
    <Stack justifyContent='center' alignItems='center'>
      <Lottie options={defaultOptions} height={500} width={400} />
    </Stack>
  );
};
