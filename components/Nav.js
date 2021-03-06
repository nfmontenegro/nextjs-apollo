import React from 'react'
import Link from 'next/link'
import {Dropdown, Image, Menu} from 'semantic-ui-react'

import User from './User'
import Signout from './Signout'

import NavItem from './styles/NavItem'

class Nav extends React.Component {
  render() {
    return (
      <User>
        {({data: {me}}) => {
          return (
            <>
              <Menu fixed="top" className="shadow-depth-1">
                <Menu.Item>
                  <Link href="/home?page=1">
                    <Image
                      style={{cursor: 'pointer'}}
                      size="mini"
                      src="https://react.semantic-ui.com/logo.png"
                    />
                  </Link>
                </Menu.Item>
                {me && (
                  <>
                    <Menu.Item>
                      <Link href="/shop">
                        <a>Shop</a>
                      </Link>
                    </Menu.Item>
                    <Menu.Item>
                      <Link
                        href={{
                          pathname: 'items',
                          query: {page: 1}
                        }}
                      >
                        <a>My Publications</a>
                      </Link>
                    </Menu.Item>
                  </>
                )}

                <div className="right menu">
                  {me && (
                    <>
                      <div>
                        <Link href="/createItem">
                          <NavItem>Create Item</NavItem>
                        </Link>
                      </div>
                      <div className="item">
                        {me.username}
                        <Image
                          style={{marginLeft: '10px'}}
                          src={
                            me.urlProfilePicture
                              ? me.urlProfilePicture
                              : 'https://react.semantic-ui.com/images/wireframe/image.png'
                          }
                          avatar
                        />
                        <Dropdown pointing>
                          <Dropdown.Menu>
                            <Dropdown.Item>
                              <Link
                                href={{
                                  pathname: '/profile',
                                  query: {id: me.id}
                                }}
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
  }
}

export default Nav
