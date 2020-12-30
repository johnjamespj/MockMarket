import * as createMuiTheme from '@material-ui/core/styles/createMuiTheme'

declare module '@material-ui/core/styles/createMuiTheme' {
    interface Size {
        drawerWidth: number
        utilityDrawerWidth: number
        navigationRailWidth: number
    }

    interface ThemeOptions {
        size?: Size
    }

    interface Theme{
        size: Size
    }
}