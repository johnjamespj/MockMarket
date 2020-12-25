import { ThemeProvider } from '@material-ui/core'
import React from 'react'
import { theme } from 'theme'

interface RootProps {
    children: React.ReactChild | React.ReactChildren
}

export function Root({ children }: RootProps) {
    return <ThemeProvider theme={theme}>
        {children}
    </ThemeProvider>
}