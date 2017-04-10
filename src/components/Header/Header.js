import React from 'react'
import { IndexLink, Link } from 'react-router'
import './Header.scss'

export const Header = () => (
  <div className="header">
    <div className="flex-container align-center space-between">
      <p>Assessment Editor</p>
      <div>
        <IndexLink to='/' activeClassName='route--active'>
          Home
        </IndexLink>
        {' · '}
        <Link to='/counter' activeClassName='route--active'>
          Counter
        </Link>
      </div>

    </div>
  </div>

)

export default Header
