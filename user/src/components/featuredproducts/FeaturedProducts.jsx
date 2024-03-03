import React from 'react'
import featureBanner from '../../assets/featureBanner.png'
import ShopCard from '../../components/shopcard/ShopCard'
import feature_banner1 from '../../assets/feature_banner1.png'
import feature_banner2 from '../../assets/feature_banner2.png'
import { useSelector } from 'react-redux'


const FeaturedProducts = () => {
  const products=useSelector((state)=>state.productDetails.featuredProducts)

  return (
    <div>
      {/* head section*/}
      <div className='flex gap-3'>
        {/*left part*/}
        <div>
          <img src={featureBanner} alt='' className=' h-[500px]' />
        </div>
        {/*right section*/}
        <div>
            <div></div>
        </div>
        {/*body*/}
        <div className='flex flex-col gap-2'>
          <div className='font-bold'>Featured Products</div>
          <div className='flex flex-row  w-[800px]'>
            <ShopCard products={products}/>
          </div>
        </div>
      </div>
      {/* banner section*/}
      <div className='flex justify-center items-center mt-5 gap-3'>
        <img src={feature_banner1} alt="" className='w-[500px] h-[220px]' />
        <img src={feature_banner2} alt="" className='w-[500px] h-[220px]'/>
      </div>
    </div>
  )
}

export default FeaturedProducts
