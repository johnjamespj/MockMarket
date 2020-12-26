import { CssBaseline, ThemeProvider } from '@material-ui/core'
import React from 'react'
import { theme } from 'theme'

interface RootProps {
    children: React.ReactNode
}

export function Root({ children }: RootProps) {
    return <div>
        <CssBaseline />
        <ThemeProvider theme={theme}>
            {children}
        </ThemeProvider>
    </div>
}