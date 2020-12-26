import { useMediaQuery, useTheme } from '@material-ui/core';
import { useState, useEffect } from 'react'
import { AppBar } from './appbar'
import { Drawer } from './drawer'

export function Scaffolding() {
    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.down('md'));
    const nonMobile = useMediaQuery(theme.breakpoints.up('sm'));

    const [navRailOpen, setNavRailOpen] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);

    useEffect(() => {
        if (matches && !navRailOpen)
            setNavRailOpen(true)

        if (!matches && navRailOpen)
            setNavRailOpen(false)
            
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
    </div>
}