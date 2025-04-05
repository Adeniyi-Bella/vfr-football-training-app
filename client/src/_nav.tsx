import CIcon from '@coreui/icons-react'
import { cilFootball, cilSpeedometer } from '@coreui/icons'
import { CNavItem } from '@coreui/react'

const _nav = [
  {
    component: CNavItem,
    name: 'Dashboard',
    to: '/dashboard',
    icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
  },

  {
    component: CNavItem,
    name: 'Training',
    to: '/training',
    icon: <CIcon icon={cilFootball} customClassName="nav-icon" />,
  },
]

export default _nav
