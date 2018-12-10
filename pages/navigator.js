import Link from 'next/link'
import {Image, Menu} from 'semantic-ui-react'

const Navigator = () => (
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
      <a className="item">Messages</a>
      {/* <div className="ui dropdown item">
        Language <i className="dropdown icon" />
        <div className="menu">
          <a className="item">English</a>
          <a className="item">Russian</a>
          <a className="item">Spanish</a>
        </div>
      </div> */}
      <div className="item">
        <Link href="/register">
          <a>Sign Up</a>
        </Link>
      </div>
    </div>
  </Menu>
)

export default Navigator
