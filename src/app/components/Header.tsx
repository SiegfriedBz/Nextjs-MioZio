import NotificationBar from './nav/NotificationBar'
import NavBar from './nav/NavBar'

const Header = () => {
  return (
    <div className='fixed left-0 right-0 top-0 z-50 h-24'>
      <NotificationBar />
      <NavBar />
    </div>
  )
}

export default Header
