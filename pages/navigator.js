import Link from 'next/link'
import {Image, Menu} from 'semantic-ui-react'
import localStorage from 'localStorage'

class Navigator extends React.Component {
  clearStorage = () => {
    localStorage.removeItem('token')
    window.location.href = '/'
  }

  render() {
    const token = localStorage.getItem('token')
    return (
      <>
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
            {token && (
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

                <div className="item" onClick={this.clearStorage}>
                  <Link href="/home">
                    <a>Log out</a>
                  </Link>
                </div>
              </>
            )}

            {!token && (
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
  }
}

export default Navigator
