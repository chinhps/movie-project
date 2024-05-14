import { extendTheme, withDefaultSize } from "@chakra-ui/react";
import { containerTheme } from "./components/container";
import { inputTheme } from "./components/input";
import { buttonTheme } from "./components/button";
import { globalStyles } from "./styles/globalStyles"
import { breakpoints } from "./foundations/breakpoints"
import { sizes } from "./sizes";

export default extendTheme(
    withDefaultSize({
        size: "lg",
        components: ['Table'],
    }), {
    globalStyles,
    components: {
        Container: containerTheme,
        Input: inputTheme,
        Button: buttonTheme
    },
    breakpoints,
    sizes
});