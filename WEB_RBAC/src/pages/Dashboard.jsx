import { useEffect, useState } from 'react'
import Alert from '@mui/material/Alert'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import CircularProgress from '@mui/material/CircularProgress'
import Divider from '@mui/material/Divider'
import authenrizedAxiosInstance from '~/utils/authorizedAxios'
import { API_ROOT, TAB_ULRS } from '~/utils/constants'
import { Button } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { handleLogoutAPI } from '~/apis'
import { Link } from 'react-router-dom'
import Duckhanhdev from '~/assets/hinh-nen-ronaldo-19.jpg'
import imgcontent from '~/assets/nen.jpg'
import Tab from '@mui/material/Tab'
import TabContext from '@mui/lab/TabContext'
import TabList from '@mui/lab/TabList'
import TabPanel from '@mui/lab/TabPanel'

function Dashboard() {
  const [user, setUser] = useState(null)
  const navigate = useNavigate()


  useEffect(() => {
    const fetchData = async () => {
      const res = await authenrizedAxiosInstance.get(`${API_ROOT}/v1/dashboards/access`)
       //console.log(res.data)
      setUser(res.data)
    }
    fetchData()
  }, [])
  const handleLogout = async () => {
    //Gọi API logout
    await handleLogoutAPI()
    // Nếu như trường hợp dùng cookie thì nhớ xoá userInfo trong Localstorage
    //localStorage.removeItem('userInfo')
    
    // Điều hướng về trang login
    navigate('/login')
  }

  const [tab, setTab] = useState(TAB_ULRS.DASHBOARD)

  const handleChange = (event, newTab) => {
    setTab(newTab)
  }

  if (!user) {
    return (
      <Box sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 2,
        width: '100vw',
        height: '100vh'
      }}>
        <CircularProgress />
        <Typography>Loading dashboard user...</Typography>
      </Box>
    )
  }

  return (
    <Box sx={{
      maxWidth: '1200px',
      margin: '0 auto',
      display: 'flex',
      justifyContent: 'center',
      flexDirection: 'column',
      padding: '0 1em',
      gap: 2
    }}>
      <Box as={Link} to="https://www.facebook.com/KH7NH" target="blank">
          <Box
          component="img"
          sx={{width:'100%', height:'300px', borderRadius: '6px', objectFit: 'fit-content'}}
          src={Duckhanhdev}
          />
      </Box>
      <Alert severity="info" sx={{ '.MuiAlert-message': { overflow: 'hidden' } }}>
        Đây là trang Dashboard sau khi user:&nbsp;
        <Typography variant="span" sx={{ fontWeight: 'bold', '&:hover': { color: '#fdba26' } }}>{user?.email}</Typography>
        &nbsp; đăng nhập thành công thì mới cho truy cập vào.
      </Alert>
      <Alert severity="success" variant='outlined' 
      sx={{ '.MuiAlert-message': { overflow: 'hidden' }, 
      width: {md:'max-content' } }}>
        Role hiện tại của user là: &nbsp;
        <Typography variant="span" sx={{ fontWeight: 'bold', '&:hover': { color: '#fdba26' } }}>
          {user?.role}
        </Typography>
      </Alert>

      {/* Khu vực phân quyền truy cập. Sử dụng Mui Tabs cho đơn giản để test các trang khác nhau */}
      <TabContext value={tab}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <TabList onChange={handleChange} aria-label="Duckhanhdev">
            <Tab label="Dashboard" value={TAB_ULRS.DASHBOARD} />
            <Tab label="Support" value={TAB_ULRS.SUPPORT}/>
            <Tab label="Messages" value={TAB_ULRS.MESSAGES}/>
            <Tab label="Revenue" value={TAB_ULRS.REVENUE}/>
            <Tab label="Admin Tools" value={TAB_ULRS.ADMIN_TOOLS} />
          </TabList>
        </Box>
        <TabPanel value={TAB_ULRS.DASHBOARD}>
          <Alert severity='success' sx={{ width: 'max-content' }}>
            Nội dung trang dashboard dành cho tất cả các Roles!
          </Alert>
        </TabPanel>
        <TabPanel value={TAB_ULRS.SUPPORT}>
          <Alert severity='success' sx={{ width: 'max-content' }}>
            Nội dung trang support dành cho tất cả các Roles!
          </Alert>
        </TabPanel>
        <TabPanel value={TAB_ULRS.MESSAGES}>
          <Alert severity='info' sx={{ width: 'max-content' }}>
            Nội dung trang messages
          </Alert>
        </TabPanel>
        <TabPanel value={TAB_ULRS.REVENUE}>
          <Alert severity='warning' sx={{ width: 'max-content' }}>
            Nội dung trang revenue
          </Alert>
        </TabPanel>
        <TabPanel value={TAB_ULRS.ADMIN_TOOLS}>
          <Alert severity='error' sx={{ width: 'max-content' }}>
            Nội dung trang admin
          </Alert>
        </TabPanel>
      </TabContext>
      <Divider />
      <Button
      type='button'
      variant='contained'
      color='info'
      size='large'
      sx={{mt: 2, maxWidth: 'min-content', alignSelf: 'flex-end'}}
      onClick={handleLogout}
      >
        Logout
      </Button>
        <Box
          component="img"
          sx={{ width: '100%', height: '300px', borderRadius: '6px', objectFit: 'fit-content' }}
          src={imgcontent}
        />
    </Box>
  
  )
}
export default Dashboard
