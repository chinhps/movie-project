import { defineStyle, defineStyleConfig } from "@chakra-ui/react";

const episode = defineStyle({
    background: 'var(--bg-white)',
    borderColor: 'var(--bg-gray)',
    border: "solid 1px",
    rounded: "md",
    px: 4,
    py: 2,
    minW: "50px",
    _hover: {
        background: 'var(--bg-main)',
        color: 'var(--bg-navbar)',
    }
})

const customIconButton = defineStyle({
    background: 'var(--bg-section)',
    color: 'var(--text-main)',
    _hover: {
        background: 'var(--bg-main)',
        color: 'var(--bg-navbar)',
    }
})

const mainButton = defineStyle({
    background: 'var(--bg-section)',
    color: 'var(--text-main)',
    width: "100%",
    padding: "20px 0",
    _hover: {
        background: 'var(--bg-gray)',
        color: 'var(--bg-navbar)',
    }
})

const secondButton = defineStyle({
    background: 'var(--bg-navbar)',
    color: 'var(--text-main)',
    width: "100%",
    padding: "23px 0",
    _hover: {
        background: 'var(--bg-gray)',
        color: 'var(--bg-navbar)',
    }
})

export const buttonTheme = defineStyleConfig({
    defaultProps: {
        variant: "customIconButton"
    },
    variants: { customIconButton, mainButton, secondButton, episode }
})