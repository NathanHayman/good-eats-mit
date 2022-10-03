import Head from 'next/head'
import { useState, useEffect } from 'react'
import Container from '../components/container'
import Layout from '../components/Layout'
import { getClient, overlayDrafts } from '../lib/sanity.server'
import { usePreviewSubscription } from '../lib/sanity'
import { indexQuery } from '../lib/queries'
import RestaurantCard from '../components/RestaurantCard'
import React from 'react'
import { AiOutlineSearch } from 'react-icons/ai'

export default function Restaurants({ allRestaurants: initialAllRestaurants, preview }) {
    const [allRestaurants, setAllRestaurants] = useState(initialAllRestaurants)

    // filter by search
    const [search, setSearch] = useState('')
    const [filtered, setFiltered] = useState([])

    useEffect(() => {
        setFiltered(
            allRestaurants.filter((item) => {
                return item.name.toLowerCase().includes(search)
            })
        )
    }, [search, allRestaurants])






    return (
        <>
        <div className='pt-16 min-h-screen'>
            <Container>
                <div className='flex justify-between items-center'>
                    <h1 className='text-4xl font-bold'>All Restaurants</h1>
                    <div className='relative'>
                        <AiOutlineSearch size={22} className='absolute top-2 left-3 text-gray-400' />
                        <input
                        type='text'
                        className='w-64 h-10 pl-10 pr-10 rounded-full border-2 border-gray-200 focus:outline-none focus:border-brand-1'
                        placeholder='Try "Bobs Burgers"'
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
        </>
    )
}


export async function getStaticProps({ preview = false } ) {
    const allRestaurants = overlayDrafts(await getClient(preview).fetch(indexQuery))

    return {
      props: { 
        preview,
        allRestaurants,
      },
      // If webhooks isn't setup then attempt to re-generate in 1 minute intervals
      revalidate: process.env.SANITY_REVALIDATE_SECRET ? undefined : 60,
    }
}





