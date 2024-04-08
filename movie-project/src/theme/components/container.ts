import { defineStyle, defineStyleConfig } from "@chakra-ui/react";

// define the base styles of the component
const baseStyle = {
    borderRadius: 'xl', // add a border radius
    fontWeight: 'medium', // change the font weight
  };

// define custom sizes
const sizes = {
    sm: defineStyle({
        maxW: '45ch',
        p: '4',
    }),
    md: defineStyle({
        maxW: '1200px',
    }),
    lg: defineStyle({
        maxW: '75ch',
        p: '8',
        fontSize: 'xl',
    }),
};

// define which sizes, variants, and color schemes are applied by default
// const defaultProps = {
//     size: 'md',
//     variant: 'colorful',
//     colorScheme: 'brand',
// };

// export the component theme
export const containerTheme = defineStyleConfig({
    sizes,
    baseStyle,
    // defaultProps,
});