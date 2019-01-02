import React from 'react'
import styled, { injectGlobal, ThemeProvider } from 'styled-components'
import Header from './Header'
import Meta from './Meta'

const theme = {
  black: '#393939',
  bs: '0 12px 24px 0 rgba(0, 0, 0, 0.09)',
  grey: '#3A3A3A',
  lightgrey: '#E1E1E1',
  maxWidth: '1000px',
  offWhite: '#EDEDED',
  red: '#FF0000',
}

const StyledPage = styled.div`
  background: white;
  color: ${props => props.theme.black};
`

const Inner = styled.div`
  // border: 1px solid black;
  margin: 0 auto;
  max-width: ${props => props.theme.maxWidth};
  padding: 2rem;
`

// Global CSS. Be sure to write selectors explicitly!
injectGlobal`
  @font-face {
    font-family: 'radnika_next';
    font-style: normal;
    font-weight: normal;
    format('webfont2');
    src: url('/static/radnikanext-medium-webfont.woff2');
  }
  html {
    box-sizing: border-box;
    font-size: 10px; /* 1 rem */
  }
  *, *:after, *:before {
    box-sizing: inherit;
  }
  body {
    font-family: 'radnika_next';
    font-size: 1.5rem;
    line-height: 2;
    margin: 0;
    padding: 0;
  }
  a {
    color: ${theme.black};
    text-decoration: none;
  }
`

class Page extends React.Component {
  render() {
    return (
      <ThemeProvider theme={theme}>
        <StyledPage>
          <Meta />
          <Header />
          <Inner>{this.props.children}</Inner>
        </StyledPage>
      </ThemeProvider>
    )
  }
}

export default Page