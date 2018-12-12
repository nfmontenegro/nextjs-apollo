import Link from 'next/link'
import AsyncStorage from '@callstack/async-storage'
import {Image, Menu} from 'semantic-ui-react'

import User from './User'

const Nav = () => (
  <User>
    {({data: {me}}) => {
      return (
        <Menu fixed="top">
          <Menu.Item>
            <Image size="mini" src="https://react.semantic-ui.com/logo.png" />
          </Menu.Item>

          <div className="right menu">
            <div className="item">
              <Link href="/home">
                <a>Home</a>
              </Link>
            </div>
            {me && (
              <>
                <div className="item">
                  <Link href="/cart">
                    <a>Cart</a>
                  </Link>
                </div>
                <div className="item">
                  <Link href="/about">
                    <a>About</a>
                  </Link>
                </div>
                <div
                  className="item"
                  onClick={() => {
                    AsyncStorage.removeItem('token')
                      .then(() => {
                        window.location.href = '/'
                      })
                      .catch(() => {})
                  }}
                >
                  <Link href="/home">
                    <a>Log out</a>
                  </Link>
                </div>
              </>
            )}

            {!me && (
              <>
                <div className="item">
                  <Link href="/register">
                    <a>Sign Up</a>
                  </Link>
                </div>
                <div className="item">
                  <Link href="/login">
                    <a>Login</a>
                  </Link>
                </div>
              </>
            )}
          </div>
        </Menu>
      )
    }}
  </User>
)

export default Nav
