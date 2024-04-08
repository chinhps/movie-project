import { defineStyle, defineStyleConfig } from "@chakra-ui/react";

const customIconButton = defineStyle({
    background: 'var(--bg-section)',
    color: 'var(--text-main)',

    _hover: {
        background: 'var(--bg-main)',
        color: 'var(--bg-navbar)',
    }
})

export const buttonTheme = defineStyleConfig({
    defaultProps: {
        variant: "customIconButton"
    },
    variants: { customIconButton }
})