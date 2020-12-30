import { useMediaQuery, useTheme, Theme, makeStyles, createStyles } from '@material-ui/core'
import { joinClass } from 'helpers/joinClass'
import { useState, useEffect } from 'react'
import { AppBar } from './appbar'
import { Drawer } from './drawer'
import { config } from 'config'

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        content: {
            marginTop: `calc(${theme.mixins.toolbar.minHeight}px + ${theme.spacing(2)}px)`
        },
        navRailContent: {
            marginLeft: theme.size.navigationRailWidth + theme.spacing(2),
            width: `calc(100% - ${theme.size.navigationRailWidth + theme.spacing(4)}px)`
        },
        drawerContent: {
            marginLeft: theme.size.drawerWidth + theme.spacing(2),
            width: `calc(100% - ${theme.size.drawerWidth + theme.spacing(4)}px)`
        },
        mobile: {
            marginTop: `calc(48px + ${theme.spacing(2)}px)`,
            marginLeft: theme.spacing(2),
            marginRight: theme.spacing(2)
        }
    }),
)


interface ScaffoldingProps {
    children?: React.ReactNode
}

export function Scaffolding({
    children
}: ScaffoldingProps) {
    const classes = useStyles()
    const theme = useTheme()
    const matches = useMediaQuery(theme.breakpoints.down('md'))
    const nonMobile = useMediaQuery(theme.breakpoints.up('sm'))

    const [navRailOpen, setNavRailOpen] = useState(config.drawerType === 'NavRail')
    const [mobileOpen, setMobileOpen] = useState(false)

    useEffect(() => {
        if (matches && !navRailOpen)
            setNavRailOpen(true)

        // eslint-disable-next-line
    }, [matches])

    const onMobileDrawerToggle = () => {
        if (nonMobile)
            setNavRailOpen((x: boolean) => !x)
        else
            setMobileOpen((x: boolean) => !x)
    }

    return <div>
        <AppBar
            navRailOpen={navRailOpen}
            onMenuToggle={onMobileDrawerToggle}
        />
        <Drawer
            navRailOpen={navRailOpen}
            mobileOpen={mobileOpen}
            onMobileDrawerToggle={onMobileDrawerToggle}
        />
        <div className={joinClass(classes.content, {
            [classes.navRailContent]: navRailOpen && nonMobile,
            [classes.drawerContent]: !navRailOpen && nonMobile,
            [classes.mobile]: !nonMobile
        })}>
            {children || ''}
        </div>
    </div>
}