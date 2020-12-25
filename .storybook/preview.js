import React from 'react';
import { Root } from '../src/components/App';
import { Helmet } from 'react-helmet';

const withThemeProvider = (Story, context) => {
  return (
    <Root>
      <Helmet>
        <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
      </Helmet>
      <Story {...context} />
    </Root>
  )
}

export const decorators = [withThemeProvider];

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
}