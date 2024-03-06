import React from 'react'
import {Box,Breadcrumbs,Typography} from '@mui/material';
import { Link } from 'react-router-dom';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';


const BrudCrumbs = ({ breadcrumbs }) => {
  return (
    <div className=' h-[50px]  w-[100%]'>
       <div className='ml-[200px]'>
       <Box m={2}>
        <Breadcrumbs aria-label='breadcrumb' separator={<NavigateNextIcon fontSize='small'/>}>
        {breadcrumbs.map((breadcrumb, index) => (
              <Link key={index} to={breadcrumb.path} className='text-[14px]'>
                {breadcrumb.label}
              </Link>
            ))}
            <Typography color={'text.primary'}></Typography>
        </Breadcrumbs>
    </Box>
       </div>
    </div>
  )
}

export default BrudCrumbs