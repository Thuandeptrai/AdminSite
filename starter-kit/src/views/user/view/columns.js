// ** React Imports
import { Fragment } from 'react'
import { Link } from 'react-router-dom'

// ** Custom Components
import Avatar from '@components/avatar'
// ** Reactstrap Imports
import { UncontrolledTooltip } from 'reactstrap'

// ** Third Party Components
import {
  Eye,
  Send,
  Edit,
  Save,
  Info,
  PieChart,
  Download,
  TrendingUp,
  CheckCircle,
  ArrowDownCircle
} from 'react-feather'
import moment from 'moment'

// ** Vars
const invoiceStatusObj = {
  Sent: { color: 'light-secondary', icon: Send },
  Paid: { color: 'light-success', icon: CheckCircle },
  Draft: { color: 'light-primary', icon: Save },
  Downloaded: { color: 'light-info', icon: ArrowDownCircle },
  'Past Due': { color: 'light-danger', icon: Info },
  'Partial Payment': { color: 'light-warning', icon: PieChart }
}

// ** Table columns
export const columns = [
  {
    name: 'Giờ Vào',
    sortable: true,
    sortField: 'id',
    minWidth: '107px',
    selector: row => moment.unix(row.userDateIn).format("HH:mm")
  },
  {
    name: 'Giờ Giờ Ra',
    sortable: true,
    sortField: 'id',
    minWidth: '107px',
    selector: row => moment.unix(row.userDateOut).format("HH:mm")

  },

  {
    name: 'Tổng Số Giờ',
    sortable: true,
    minWidth: '150px',
    sortField: 'total',
    selector: row => row.total,
    cell: row => <span>${row.total || 0}</span>
  }
  
 
]
