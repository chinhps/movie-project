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
    },
    _active: {
        border: "solid 1px red !important",
    }
});

const customIconButton = defineStyle({
    background: 'var(--bg-section)',
    color: 'var(--text-main)',
    _hover: {
        background: 'var(--bg-main)',
        color: 'var(--bg-navbar)',
    }
});

const mainButton = defineStyle({
    background: 'var(--bg-section)',
    color: 'var(--text-main)',
    _hover: {
        background: 'var(--bg-main)',
        color: 'var(--bg-navbar)',
    }
});

const secondButton = defineStyle({
    background: 'var(--bg-navbar)',
    color: 'var(--text-main)',
    _hover: {
        background: 'var(--bg-main)',
        color: 'var(--bg-navbar)',
    }
});

const transparentButton = defineStyle({
    background: 'var(--bg-transparent)',
    color: 'var(--text-main)',
    border: "solid 1px var(--bg-gray)",
    rounded: "full",
    _hover: {
        background: 'var(--bg-main)',
        color: 'var(--bg-navbar)',
    }
});

const transparentCinemaButton = defineStyle({
    background: 'var(--bg-transparent)',
    color: 'var(--text-black)',
    border: "solid 1px var(--bg-gray)",
    rounded: "full",
    _hover: {
        background: 'var(--bg-main)',
        color: 'var(--bg-navbar)',
    }
});

const cinemaButton = defineStyle({
    background: 'var(--bg-section)',
    color: 'var(--text-main)',
    rounded: "full",
    _hover: {
        background: 'var(--bg-white)',
        color: 'var(--bg-navbar)',
    }
});

const buttonPlayer = defineStyle({
    color: 'white',
    fontSize: "1.2rem",
    _hover: {
        background: 'black',
        color: 'gray',
    }
});

export const buttonTheme = defineStyleConfig({
    defaultProps: {
        // variant: "customIconButton"
    },
    variants: {
        customIconButton, mainButton, secondButton,
        episode, transparentButton, cinemaButton,
        transparentCinemaButton, buttonPlayer
    }
})