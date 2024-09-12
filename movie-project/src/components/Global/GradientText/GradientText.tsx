"use client";

import React, { ReactNode } from "react";
import "./GradientText.css";
import { Box, BoxProps } from "@chakra-ui/react";

interface GradientTextProps extends BoxProps {
  children: ReactNode;
  className?: string;
  colors?: string[];
  animationSpeed?: number;
  showBorder?: boolean;
}

const GradientText: React.FC<GradientTextProps> = ({
  children,
  className = "",
  colors = ["#40ffaa", "#4079ff"], // Default colors
  animationSpeed = 8, // Default animation speed in seconds
  showBorder = false, // Default overlay visibility
  ...res
}) => {
  const gradientStyle = {
    backgroundImage: `linear-gradient(to right, ${colors.join(", ")})`,
    animationDuration: `${animationSpeed}s`,
  };

  return (
    <Box className={`animated-gradient-text ${className}`} {...res}>
      {showBorder && (
        <div className="gradient-overlay" style={gradientStyle}></div>
      )}
      <div className="text-content" style={gradientStyle}>
        {children}
      </div>
    </Box>
  );
};

export default GradientText;
