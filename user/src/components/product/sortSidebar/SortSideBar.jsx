import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { baseUrl } from '../../../../baseUrl.js'
import { useDispatch } from 'react-redux'
import { setFullProducts } from '../../../../redux/reducers/productSlice.js'
import Slider from '@mui/material/Slider'

const SortSideBar = () => {
  const dispatch = useDispatch()
  const [categories, setCategories] = useState([])

  useEffect(() => {
    axios.get(`${baseUrl}/api/v1/getCategories`).then((res) => {
      setCategories(res.data.categories)
    })
  }, [])

  const [check, setCheck] = useState('')
  //sort for category
  axios.interceptors.request.use((config) => {
    const token = localStorage.getItem('userToken')
    if (token) {
      config.headers.Authorization = token
    }
    return config
  })
  axios
    .get(`${baseUrl}/api/v1/category-sort`, { params: { check } })
    .then((res) => {
      console.log('res from cat', res.data.products)
      dispatch(setFullProducts(res.data.products))
    })
    .catch((err) => {
      console.log(err)
    })

    //filter using range
  const [value, setValue] = useState([20, 37])

  const handleChange = (event, newValue) => {
    setValue(newValue)
    console.log(newValue)
  }

  useEffect(() => {
    axios.interceptors.request.use((config) => {
      const token = localStorage.getItem('userToken')
      if (token) {
        config.headers.Authorization = token
      }
      return config
    })

    axios
      .get(`${baseUrl}/api/v1/price-range`, {
        params: { min: value[0], max: value[1] },
      })
      .then((res) => {
        console.log('res from range', res.data.products)
        dispatch(setFullProducts(res.data.products))
      })
      .catch((err) => {
        console.log(err)
      })
  }, [value, dispatch])

  //taking brands
  const [brands, setBrands] = useState([])

  useEffect(() => {
    axios.interceptors.request.use((config) => {
      const token = localStorage.getItem('userToken')
      if (token) {
        config.headers.Authorization = token
      }
      return config
    })

    axios
      .get(`${baseUrl}/api/v1/getProducts`)
      .then((res) => {
        console.log('res from range', res.data.products)
        setBrands(res.data.products)
      })
      .catch((err) => {
        console.log(err)
      })
  }, [])


    //sort with tags
  const [tag, setTag] = useState('')

  axios.interceptors.request.use((config) => {
    const token = localStorage.getItem('userToken')
    if (token) {
      config.headers.Authorization = token
    }
    return config
  })
  axios
    .get(`${baseUrl}/api/v1/sort-tag`, { params: {tag } })
    .then((res) => {
      console.log('res from cat', res.data.products)
      dispatch(setFullProducts(res.data.products))
    })
    .catch((err) => {
      console.log(err)
    })


  //sort with alphabetically
  const [alpha, setAlpha] = useState('')


  axios.interceptors.request.use((config) => {
    const token = localStorage.getItem('userToken')
    if (token) {
      config.headers.Authorization = token
    }
    return config
  })
  axios
    .get(`${baseUrl}/api/v1/alpha-sort`, { params: {alpha} })
    .then((res) => {
      console.log('res from cat', res.data.products)
      dispatch(setFullProducts(res.data.products))
    })
    .catch((err) => {
      console.log(err)
    })


  return (
    <section className='flex flex-col gap-2 '>
      {/*leftside */}
      <section className='w-[200px] flex flex-col gap-3 '>
        <div className='text-[18px] font-semibold font-Playfair'>CATEGORY</div>
        {/*one Radio button*/}

        {categories.map((category) => (
          <div className='flex items-center gap-2' key={category.title}>
            <input
              id={category.title}
              type='radio'
              name='category'
              value={category.title}
              onChange={(e) => setCheck(e.target.value)}
              className='w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 '
            />
            <label
              htmlFor={category.title}
              className='text-[17px] font-Josefin font-semibold'
            >
              {category.title}
            </label>
          </div>
        ))}
      </section>

      {/*Price range*/}
      <section className='w-[200px] flex flex-col gap-5 mt-4'>
        <div className='text-[18px] font-semibold font-Playfair'>
          PRICE RANGE
        </div>

        <Slider
          getAriaLabel={() => 'Temperature range'}
          value={value}
          onChange={handleChange}
          valueLabelDisplay='auto'
        />
      </section>

      {/*Poppular brands*/}
      <section className='w-[200px] flex flex-col gap-5 mt-4'>
        <div className='text-[18px] font-semibold font-Playfair'>BRANDS</div>
        {/*one Radio button*/}
        {[...new Set(brands.map((brand) => brand.brand))].map((uniqueBrand) => (
          <div className='flex items-center gap-2' key={uniqueBrand}>
            <input
              id='default-checkbox'
              type='checkbox'
              value={uniqueBrand}
              onChange={(e)=>setTag(e.target.value)}
              className='w-6 h-6 text-blue-600 bg-gray-100 border-gray-300 rounded'
            />
            <div className='text-[#475156] text-[15px] font-Josefin font-semibold'>
              {uniqueBrand}
            </div>
          </div>
        ))}
      </section>

      {/*Poppular brands*/}
      <section className='w-[200px] flex flex-col gap-5 mt-4'>
        <div className='text-[18px] font-semibold font-Playfair'>ALPHABETICALY</div>
        <div className='flex gap-3  '>
        <input
              id='a-z'
              type='radio'
              name='category'
              value='1'
              onChange={(e) => setAlpha(e.target.value)}
              className='w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 '
            />
            <label
              htmlFor='a-z'
              className='text-[17px] font-Josefin font-semibold'
            >
              A - Z
            </label>
        </div>
        <div className='flex gap-3  '>
        <input
              id='a-z'
              type='radio'
              name='category'
              value='-1'
              onChange={(e) => setAlpha(e.target.value)}
              className='w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 '
            />
            <label
              htmlFor='a-z'
              className='text-[17px] font-Josefin font-semibold'
            >
              Z - A
            </label>
        </div>
      </section>



    </section>
  )
}

export default SortSideBar
