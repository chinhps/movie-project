import { defineStyle, defineStyleConfig } from "@chakra-ui/react";

const episode = defineStyle({
    background: 'var(--bg-white)',
    border: "solid 1px var(--bg-tag)",
    rounded: "md",
    px: 4,
    py: 2,
    minW: "61px",
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
    _hover: {
        background: 'var(--bg-main)',
        color: 'var(--bg-navbar)',
    }
})

const secondButton = defineStyle({
    background: 'var(--bg-navbar)',
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
    variants: { customIconButton, mainButton, secondButton, episode }
})