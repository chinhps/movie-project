import { extendTheme } from "@chakra-ui/react";
import { containerTheme } from "./components/container";
import { inputTheme } from "./components/input";
import { buttonTheme } from "./components/button";

export default extendTheme({
    components: {
        Container: containerTheme,
        Input: inputTheme,
        Button: buttonTheme
    },
})