import Link from 'next/link'
import {Dropdown, Image, Menu} from 'semantic-ui-react'

import User from './User'
import Signout from './Signout'

const Nav = () => (
  <User>
    {({data: {me}}) => {
      return (
        <Menu fixed="top" className="shadow-depth-1">
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
                <Dropdown
                  item
                  text={`${me.name} ${me.lastname}`}
                  pointing
                  className="item"
                >
                  <Dropdown.Menu>
                    <Dropdown.Item>
                      <Link href={{pathname: '/profile', query: {id: me.id}}}>
                        <a>Profile</a>
                      </Link>
                    </Dropdown.Item>
                    <Dropdown.Item>
                      <Link href="/home">
                        <Signout />
                      </Link>
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
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
