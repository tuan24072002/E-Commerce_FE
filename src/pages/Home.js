import React from 'react'
import CategoryList from '../components/CategoryList'
import BannerProduct from '../components/BannerProduct'
import HorizontalProductCard from '../components/HorizontalProductCard'
import VerticalProductCard from '../components/VerticalProductCard'

const Home = () => {
    return (
        <div>
            <CategoryList />
            <BannerProduct />
            <HorizontalProductCard category={'Mobile'} heading={"Top's Airpods"} />
            <HorizontalProductCard category={'Airpods'} heading={"Popular's Watches"} />
            <VerticalProductCard category={'Watch'} heading={"Mobiles"} />
            <VerticalProductCard category={'Television'} heading={"Televisions"} />
            <VerticalProductCard category={'Mouse'} heading={"Mouses"} />
            <VerticalProductCard category={'Camera'} heading={"Camera & Photography"} />
            <VerticalProductCard category={'Earphones'} heading={"Wired Earphones"} />
            <VerticalProductCard category={'Speaker'} heading={"Bluetooth Speakers"} />
            <VerticalProductCard category={'Refrigerator'} heading={"Refrigerators"} />
            <VerticalProductCard category={'Trimmer'} heading={"Trimmers"} />
        </div>
    )
}
export default Home