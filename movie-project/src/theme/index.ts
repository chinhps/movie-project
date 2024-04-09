import { extendTheme } from "@chakra-ui/react";
import { containerTheme } from "./components/container";
import { inputTheme } from "./components/input";
import { buttonTheme } from "./components/button";
import { globalStyles } from "./styles/globalStyles"

export default extendTheme({
    globalStyles,
    components: {
        Container: containerTheme,
        Input: inputTheme,
        Button: buttonTheme
    },
})