import { useRouter } from 'next/router'
import ErrorPage from 'next/error'
import Container from '../../components/container'
import Layout from '../../components/layout'
import { restaurantQuery, restaurantSlugsQuery } from '../../lib/queries'
import { urlForImage, usePreviewSubscription } from '../../lib/sanity'
import { sanityClient, getClient, overlayDrafts } from '../../lib/sanity.server'
import { useStateContext } from '../../context/StateContext'
import { AiOutlineSearch } from 'react-icons/ai'
import RestaurantCard from '../../components/RestaurantProducts'
import React, { useState, useEffect } from 'react'

export default function Post({ data = {}, preview }) {
  const router = useRouter()
  const { decQty, incQty, qty, onAdd } = useStateContext();
  const slug = data?.restaurant?.slug
  const restaurant = data?.restaurant

  const [search, setSearch] = useState('')
  const [filtered, setFiltered] = useState([])

  useEffect(() => {
    setFiltered(
      restaurant.products.filter((item) => {
        return item.name.toLowerCase().includes(search)
      })
    )
  } , [search, restaurant.products])



  if (!router.isFallback && !slug) {
    return <ErrorPage statusCode={404} />
  }

  return (
      <>
        {router.isFallback ? (
          <p>Loading…</p>
        ) : (
          <div className='pt-16 min-h-screen'>
            <Container>
              <div className='flex justify-between -z-10 items-center'>
                  <h1 className='text-4xl font-bold'>{restaurant.name}</h1>
                  <div className='relative'>
                      <AiOutlineSearch size={22} className='absolute top-2 left-3 text-gray-400' />
                      <input
                      type='text'
                      className='w-64 h-10 pl-10 pr-10 rounded-full border-2 border-gray-200 focus:outline-none focus:border-brand-1'
                      placeholder='Try "Burgers" or "Pizza"'
                      onChange={(e) => setSearch(e.target.value.toLowerCase())}
                      />
                  </div>
              </div>
              <hr className='my-4 border border-brand-2' />
              <div className="-mx-px grid grid-cols-2 sm:mx-0 md:grid-cols-3 lg:grid-cols-4">
                  {filtered.map((item) => (
                      <RestaurantCard key={item.name} item={item} />
                  ))}
              </div>
            </Container>
          </div>
          /*
          <div className='flex flex-col'>
            <h2 className='text-2xl font-bold'>{restaurant.name}</h2>
            <div>
                Menu Items
                <ul className='list-disc ml-8'>
                {restaurant.products.map((item) => (
                    <li key={item.name}>
                      <p>{item.name} - ${item.price}</p>
                      <button onClick={decQty}>-</button>
                      <p>{qty}</p>
                      <button onClick={incQty}>+</button>
                      <button onClick={() => onAdd(item, qty)}>
                        Add to Cart
                      </button>
                    </li>
                ))}
                </ul>
            </div>
          </div>
          */
        )}
      </>
  )
}

export async function getStaticProps({ params, preview = false }) {
  const { restaurant } = await getClient(preview).fetch(restaurantQuery, {
    slug: params.slug,
  })

  return {
    props: {
      preview,
      data: {
        restaurant,
      },
    },
    // If webhooks isn't setup then attempt to re-generate in 1 minute intervals
    revalidate: process.env.SANITY_REVALIDATE_SECRET ? undefined : 60,
  }
}

export async function getStaticPaths() {
  const paths = await sanityClient.fetch(restaurantSlugsQuery)
  return {
    paths: paths.map((slug) => ({ params: { slug } })),
    fallback: true,
  }
}
