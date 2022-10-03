import React from 'react'
import { useSession, signIn, signOut, getSession } from 'next-auth/react'
import Link from 'next/link'
import { useRouter } from 'next/router'


export default function Login() {
    const { data: session, status } = useSession()

    // When rendering client side don't display anything until loading is complete
    // once logged in, redirect to the restaurants page
    if (status === 'loading') return null

    if (session) {
        return (
            <>
                <h1>Logged in as {session.user.email}</h1>
                <button onClick={() => signOut()}>Sign out</button>
                <Link href="/restaurants">
                    <a>Restaurants</a>
                </Link>
            </>
        )
    }

    return (
        <>
            <h1>Not signed in</h1>
            <button onClick={() => signIn()}>Sign in</button>
        </>
    )
}



export async function getServerSideProps(context) {
    if (context.req.headers.cookie) {
        const session = await getSession(context)
        if (session) {
            return {
                redirect: {
                    destination: '/restaurants',
                    permanent: false,
                },
            }
        }
    }
    
    return {
        props: {
            session: await getSession(context)
        }
    }
}








/*
import React from 'react';
import { sanityClient } from '../lib/sanity.server';
import { Product } from '../components';

const Home = ({ products }) => (
  <div>
    <div className="products-heading">
      <h2>Best Seller Products</h2>
      <p>speaker There are many variations passages</p>
    </div>

    <div className="products-container">
      {products?.map((product) => <Product key={product._id} product={product} />)}
    </div>

  </div>
);

export const getServerSideProps = async () => {
  const query = '*[_type == "product"]';
  const products = await sanityClient.fetch(query);


  return {
    props: { products }
  }
}

export default Home;
*/
