import React from 'react'
import Link from 'next/link'
import styled from 'styled-components'
import Nav from './Nav'

const StyledLogo = styled.h1`
  font-size: 4rem;
  margin-left: 2rem;
  position: relative;
  transform: skew(-7deg);
  z-index: 2;
  a {
    background: ${props => props.theme.red};
    color: white;
    padding: 0.5rem 1rem;
    text-transform: uppercase;
    textDecoration: none;
  }
  @media (max-width: 1100px) {
    margin: 0;
    text-align: center;
  }
`

const StyledHeader = styled.header`
  .bar {
    align-items: stretch;
    border-bottom: 10px solid ${props => props.theme.black};
    display: grid;
    grid-template-columns: auto 1fr;
    justify-content: space-between;
    @media (max-width: 1100px) {
      grid-template-columns: 1fr;
      justify-content: center;
    }
  }
  .sub-bar {
    border-bottom: 1px solid ${props => props.theme.lightgrey};
    display: grid;
    grid-template-columns: 1fr auto;

  }
`

const Header = (props) => (
  <StyledHeader>
    <div className="bar">
      <StyledLogo>
        <Link href="/"><a>Sick Fits</a></Link>
      </StyledLogo>
      <Nav />
    </div>
    <div className="sub-bar">
      <p>Search</p>
    </div>
    <div>Cart</div>
  </StyledHeader>
)

export default Header