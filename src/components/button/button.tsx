import { withStyles, Button as B, ButtonProps, PropTypes, Theme } from "@material-ui/core"

type CommonColors =
    | 'black'
    | 'white'
    | 'sirius'
    | 'earth'
    | 'procyon'
    | 'sun'
    | 'canopus'
    | 'achernar'
    | 'altair'
    | 'antares'
    | 'vega'
    | 'betelgeuse'
    | 'aldebaran'
    | 'pollux'
    | 'rigel'
    | 'agena'
    | 'spica'
    | 'mimosa';

export type ExtendedColor =
    PropTypes.Color
    | CommonColors
    | 'accent'
    | 'decorative';

interface ExtendedColorProps {
    color?: ExtendedColor;
}

type ExtendedButtonProps = ExtendedColorProps & Omit<ButtonProps, 'color'>;

function getColor(color: ExtendedColor, theme: Theme): string | null {
    switch (color) {
        case 'inherit':
        case 'primary':
        case 'secondary':
        case 'default':
            return null
        default:
            return theme.palette.common[color]
    }
}

function getPropColor(color: ExtendedColor): PropTypes.Color{
    switch (color) {
        case 'inherit':
        case 'primary':
        case 'secondary':
        case 'default':
            return color
        default:
            return 'default'
    }
}

export const Button = (props: ExtendedButtonProps) => {
    const { color = "default", ...rest } = props

    const _button = withStyles((theme) => {
        const colorCode = getColor(color, theme)

        if (colorCode === null || colorCode === undefined) {
            return ({ root: {} })
        }

        return ({
            root: {
                color: theme.palette.getContrastText(colorCode),
                backgroundColor: colorCode,
                "&:hover": {
                    backgroundColor: colorCode,
                },
            },
        })
    })(B)

    return <_button color={getPropColor(color)} {...rest} />
}
