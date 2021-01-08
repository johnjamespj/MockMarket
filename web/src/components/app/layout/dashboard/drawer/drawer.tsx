import React from 'react'
import { makeStyles, useTheme, Theme, createStyles, Drawer as MUIDrawer, Hidden } from '@material-ui/core'
import { joinClass } from 'helpers/joinClass'
import { NavDrawer } from './nav_drawer'
import { NavRailDrawer } from './navrail_drawer'

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            display: 'flex',
        },
        drawer: {
            [theme.breakpoints.up('sm')]: {
                width: theme.size.drawerWidth,
                flexShrink: 0,
            },
        },
        drawerPaper: {
            width: theme.size.drawerWidth,
        },
        navRailDrawer: {
            width: theme.size.navigationRailWidth,
        },
        content: {
            flexGrow: 1,
            padding: theme.spacing(3),
        },
    }),
)

interface DrawerProps {
    mobileOpen: boolean
    navRailOpen: boolean
    onMobileDrawerToggle: () => void
}

export function Drawer({
    mobileOpen,
    navRailOpen,
    onMobileDrawerToggle
}: DrawerProps) {
    const classes = useStyles()
    const theme = useTheme()

    return (
        <div className={classes.root}>
            <nav className={classes.drawer} aria-label="mailbox folders">
                {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
                <Hidden smUp implementation="css">
                    <MUIDrawer
                        variant="temporary"
                        anchor={theme.direction === 'rtl' ? 'right' : 'left'}
                        open={mobileOpen}
                        onClose={onMobileDrawerToggle}
                        classes={{
                            paper: classes.drawerPaper,
                        }}
                        ModalProps={{
                            keepMounted: true, // Better open performance on mobile.
                        }}
                    >
                        <NavDrawer />
                    </MUIDrawer>
                </Hidden>
                <Hidden xsDown implementation="css">
                    <MUIDrawer
                        classes={{
                            paper: joinClass("", {
                                [classes.drawerPaper]: !navRailOpen,
                                [classes.navRailDrawer]: navRailOpen
                            }),
                        }}
                        variant="permanent"
                        open
                    >
                        {navRailOpen ? <NavRailDrawer /> : <NavDrawer />}
                    </MUIDrawer>
                </Hidden>
            </nav>
        </div>
    )
}