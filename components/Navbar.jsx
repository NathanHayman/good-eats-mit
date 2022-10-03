import React from 'react';
import Link from 'next/link';
import { AiOutlineShopping, AiOutlineUser } from 'react-icons/ai'
import Logo from '../public/assets/good-eats-logo.png'
import { Cart } from './';
import { useStateContext} from '../context/StateContext';
import Image from 'next/image';
import { getSession, useSession } from 'next-auth/react';

const Navbar = () => {
  const { showCart, setShowCart, totalQuantities } = useStateContext();

  const { data: session, status } = useSession({required: true})



  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 shadow-md drop-shadow-lg" aria-label="Top">
        <div className="flex w-full items-center justify-between lg:border-none">
          <div className="">
            <Link href="/restaurants" className='cursor-pointer'>
              <Image src={Logo} alt="Good Eats Logo" width={275} height={130} className="cursor-pointer" />
            </Link>
          </div>
          <div className="ml-10 space-x-4">
            <button className="mr-8 font-medium cart-icon">
              {session ? 
              <Link href="/account">
                <div className="flex items-center text-base">
                  <img src={session.user.image} className='w-8 rounded-full'/>
                  <span className='ml-2'>{session.user.name}</span>
                </div>
              </Link> 
              : 
              <Link href="/login">Login</Link>
              }
            </button>
            <button type="button" className="cart-icon" onClick={() => setShowCart(true)}>
              <AiOutlineShopping size={30} />
              <span className="cart-item-qty absolute -top-2">{totalQuantities}</span>
            </button>
            {showCart && <Cart />}
          </div>
        </div>
        <div className="inline-flex justify-center space-x-8 py-4 lg:hidden">


        </div>
      </div>
    /*
    <div className="navbar-container">
      <p className="logo">
        <Link href="/">JSM Headphones</Link>
      </p>

      <button type="button" className="cart-icon" onClick={() => setShowCart(true)}>
        <AiOutlineShopping />
        <span className="cart-item-qty">{totalQuantities}</span>
      </button>

      {showCart && <Cart />}
    </div>
    */
  )
}

export default Navbar

export async function getServerSideProps(context) {
  const session = await getSession(context);

  return {
    props: {
      session,
    },
  };
}