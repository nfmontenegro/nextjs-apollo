import Link from 'next/link'
import {Dropdown, Image, Menu} from 'semantic-ui-react'

import User from './User'
import Signout from './Signout'

import NavItem from './styles/NavItem'

const Nav = () => (
  <User>
    {({data: {me}}) => {
      return (
        <>
          <Menu fixed="top" className="shadow-depth-1">
            <Menu.Item>
              <Image
                href="/home"
                size="mini"
                src="https://react.semantic-ui.com/logo.png"
              />
            </Menu.Item>

            <div className="right menu">
              {me && (
                <>
                  <div>
                    <Link href="/item">
                      <NavItem>Create Item</NavItem>
                    </Link>
                  </div>
                  <div className="item">
                    <Image
                      src={
                        me
                          ? me.urlProfilePicture
                          : 'https://react.semantic-ui.com/images/wireframe/image.png'
                      }
                      avatar
                    />
                    <Dropdown pointing>
                      <Dropdown.Menu>
                        <Dropdown.Item>
                          <Link
                            href={{pathname: '/profile', query: {id: me.id}}}
                          >
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
        </>
      )
    }}
  </User>
)

export default Nav
