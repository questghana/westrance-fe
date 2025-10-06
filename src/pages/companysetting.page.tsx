import Setting from '@/components/support/setting/setting'
import { Box } from '@/components/ui/box'
import React from 'react'

const SettingPage:React.FC = () => {
  return (
    <Box className='pt-4'>
      <Setting showtabs={true}/>
    </Box>
  )
}

export default SettingPage