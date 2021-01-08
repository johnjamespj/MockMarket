import { PaletteOptions } from "@material-ui/core/styles/createPalette"
import { colors } from "@material-ui/core"

export const palette: PaletteOptions = {
    background: {
        default: "#f6faff",
        paper: colors.common.white,
    },
    text: {
        primary: colors.blueGrey[900],
        secondary: colors.blueGrey[600],
    },
    secondary: {
        main: "#12005E",
    },
    primary: {
        main: "#4A148C",
    },
    action: {
        selected: 'rgba(124, 67, 189, 0.36)',
        hover: 'rgba(124, 67, 189, 0.2)',
    },
    error: {
        main: "rgb(213,0,0)",
    },
    success: {
        main: "rgb(0,208,160)",
    },
    info: {
        main: "rgb(255,196,0)",
    },
    common: {
        black: "rgb(1,10,20)",
        white: "rgb(255,255,255)",
        sirius: "rgb(85,239,196)",
        earth: "rgb(0,184,148)",
        procyon: "rgb(255,234,167)",
        sun: "rgb(253,203,110)",
        canopus: "rgb(129,236,236)",
        achernar: "rgb(0,206,201)",
        altair: "rgb(250,177,160)",
        antares: "rgb(225,112,85)",
        vega: "rgb(116,185,255)",
        betelgeuse: "rgb(9,132,227)",
        aldebaran: "rgb(255,118,117)",
        pollux: "rgb(214,48,49)",
        rigel: "rgb(162,155,254)",
        agena: "rgb(108,92,231)",
        spica: "rgb(253,121,168)",
        mimosa: "rgb(232,67,147)",
        decorative: "rgb(244,58,172)",
        accent: "rgb(25,231,252)"
    },
}