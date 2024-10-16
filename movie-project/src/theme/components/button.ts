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
    color: 'var(--anti-text-main)',
    fontWeight: '600',
    _disabled: {
        background: 'var(--bg-gray)',
    },
    _hover: {
        background: 'var(--bg-section-hover)',
        color: 'var(--bg-navbar)',
    }
});

const secondButton = defineStyle({
    display: "flex",
    flexDirection: "column",
    padding: "2rem",
    gap: "0.5rem",
    // background: 'var(--bg-section)',
    color: 'var(--text-main)',
    _hover: {
        // background: 'var(--bg-main)',
        color: 'var(--bg-section-hover)',
    }
});

const transparentButton = defineStyle({
    background: 'var(--bg-transparent)',
    color: 'var(--text-main)',
    border: "solid 1px var(--bg-gray)",
    rounded: "full",
    _hover: {
        background: 'var(--bg-main)',
        color: 'var(--text-main)',
    }
});

const transparentCinemaButton = defineStyle({
    background: 'var(--bg-transparent)',
    color: 'var(--anti-text-main)',
    border: "solid 1px var(--bg-gray)",
    rounded: "full",
    _hover: {
        background: 'var(--bg-main)',
        border: "solid 1px var(--bg-gray)",
        color: 'var(--bg-section-hover)',
    }
});

const cinemaButton = defineStyle({
    background: 'var(--bg-section)',
    color: 'var(--anti-text-main)',
    rounded: "full",
    _hover: {
        background: 'var(--bg-main)',
        border: "solid 1px var(--bg-gray)",
        color: 'var(--bg-section-hover)',
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