import Nav from './Nav'
import NProgress from 'next-nprogress/component'

const Header = () => (
  <>
    <NProgress color="#29d" spinner={false} />
    <Nav />
  </>
)

export default Header
