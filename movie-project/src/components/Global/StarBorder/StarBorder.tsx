"use client";

import React, { ElementType, ReactNode } from "react";
import { Box, BoxProps } from "@chakra-ui/react";
import "./StarBorder.css";

interface StarBorderProps extends BoxProps {
  className?: string;
  color?: string;
  speed?: string;
  children?: ReactNode;
}

const StarBorder: React.FC<StarBorderProps> = ({
  className = "",
  color = "white",
  speed = "6s",
  children,
  ...rest
}) => {
  return (
    <Box className={`star-border-container ${className}`}>
      <Box
        className="border-gradient-bottom"
        sx={{
          background: `radial-gradient(circle, ${color}, transparent 80%)`,
          animationDuration: speed,
        }}
      ></Box>
      <Box
        className="border-gradient-top"
        sx={{
          background: `radial-gradient(circle, ${color}, transparent 80%)`,
          animationDuration: speed,
        }}
      ></Box>
      <Box className="inner-content" {...rest}>
        {children}
      </Box>
    </Box>
  );
};

export default StarBorder;
