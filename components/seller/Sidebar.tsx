"use client"; 

import Link from 'next/link'; 
import { assets } from '@assets/assets';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

const Sidebar = () => {

  const pathname = usePathname();
  const menuItems = [
        { name: 'Add Product', path: '/seller', icon: assets.add_icon },
        { name: 'Product List', path: '/seller/product-list', icon: assets.product_list_icon },
        { name: 'Orders', path: '/seller/orders', icon: assets.order_icon },
    ];

  return (
    <div className='md:w-64 w-16 border-r min-h-screen text-base border-[#1E3A5F] bg-[#071525] py-2 flex flex-col'>
      {menuItems.map((item) => {
        const isActive = pathname === item.path;

        return (
          <Link href={item.path} key={item.name} passHref>
            <div 
            className={`flex items-center py-3 px-4 gap-3 ${isActive ? "border-r-4 md:border-r-[6px] bg-orange-600/10 border-orange-500/90 text-slate-200" : "hover:bg-[#0C1F35] border-transparent text-slate-400"}`}
            >
              <Image 
                src={item.icon}
                alt={item.name}
                className='w-7 h-7'
              />
              <p className='md:block hidden text-center'>
                {item.name}
              </p>
            </div>
          </Link>
        ); 
      })}
    </div>
  )
}

export default Sidebar