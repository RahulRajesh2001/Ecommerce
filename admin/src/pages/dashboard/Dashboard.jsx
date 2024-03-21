import React, { useState } from 'react'
import SideBar from '../../components/sidebar/SideBar'
import Navbar from '../../components/navbar/Navbar'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import SaleChart from '../../components/chart/SaleChart.jsx'
import axios from 'axios'
import {baseUrl} from '../../../baseURL.js'


const Dashboard = () => {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  const [data,setData]=useState([])
  const [total,setTotal]=useState({})
  const submitHandler = () => {
    const formattedStartDate = startDate.toISOString();
    const formattedEndDate = endDate.toISOString();
    axios.get(`${baseUrl}/api/v1/admin/getSales/?startDate=${formattedStartDate}&endDate=${formattedEndDate}`)
      .then((res) => {
        setTotal(res.data)
        console.log(res.data.salesData);
        setData(res.data.salesData)
      })
      .catch((error) => {
        console.error('Error fetching sales data:', error);
      });
  };

  return (
    <div className='bg-[#F5F5F9] flex w-[100%]'>
      <SideBar/>
      <div className='w-[100%] '>
        <Navbar/>
        <div className="flex justify-center items-center ">
          <div className="mb-3 me-4">
            <label className="form-label d-block">Start Date</label>
            <DatePicker
              selected={startDate}
              onChange={(date) => setStartDate(date)}
              selectsStart
              startDate={startDate}
              endDate={endDate}
              className='form-control'
            />  
          </div>
          <div className="mb-3">
            <label className="form-label d-block">End Date</label>
            <DatePicker
              selected={endDate}
              onChange={(date) => setEndDate(date)}
              selectsEnd
              startDate={startDate}
              endDate={endDate}
              minDate={startDate}
              className='form-control'
            />
          </div>
          <button onClick={submitHandler} className=" bg-orange-400 font-semibold flex justify-center items-center text-[#ffff] rounded-lg h-[30px] w-[60px] ms-4 mt-3 px-5">Fetch</button>
        </div>

        <div className="flex justify-center items-center mt-2 ">
          <div className="col-xl-6 col-sm-12 mb-3 flex justify-center ">
            <div className="card text-white bg-success o-hidden h-100 w-[60%]">
              <div className="card-body">
                <div className="text-center card-font-size">
                  Sales
                  <br />
                  <b>₹ {total.totalSales}</b>
                </div>
              </div>
            </div>
          </div>

          <div className="col-xl-6 col-sm-12 mb-3 flex justify-center ">
            <div className="card text-white bg-danger o-hidden h-100 w-[60%]">
              <div className="card-body">
                <div className="text-center card-font-size">
                  Orders
                  <br />
                  <b>{total.totalNumOrders}</b>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className='h-[480px] w-[100%] flex justify-center items-center'>
          <SaleChart salesData={data}/>
        </div>
        <div className="mb-5"></div>
      </div>
    </div>
  );
};

export default Dashboard;
