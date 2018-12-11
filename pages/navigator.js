import Link from 'next/link'
import {Image, Menu} from 'semantic-ui-react'

const Navigator = ({token}) => (
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
    </div>
  </Menu>
)

Navigator.getInitialProps = async () => {
  if (document.cookie.token) {
    const token = document.cookie.token
    return token
  }
}

export default Navigator
