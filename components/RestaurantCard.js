import { urlForImage } from '../lib/sanity'
import Image from 'next/image'
import Link from "next/link"
import React from "react"
import { AiFillStar } from 'react-icons/ai'


export default function RestaurantCard({ item }) {

    function classNames(...classes) {
        return classes.filter(Boolean).join(' ')
      }

      // item.reviewCount to standard , format
        const reviewCount = item.reviewCount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
    return (
        /*
        <Link href={`/restaurants/${item.slug}`}>
            <div className="cursor-pointer">
                <div className="w-20 h-20 relative rounded-full">
                    <Image
                    src={urlForImage(item.restaurantImage).width(200).height(200).url()}
                    width={200}
                    height={200}
                    objectFit="cover"
                    objectPosition='center'
                    alt={item.name}
                    />
                </div>
                <h1 className="text-2xl">{item.name}</h1>
            </div>
        </Link>
        */
        <div key={item.name} className="group relative border-r border-b p-4 sm:p-6">
            <div className="flex flex-row space-x-4 absolute top-2 right-2">
                {item.categories.map((category) => (
                    <div key={category} className="text-xs font-medium text-white px-2 rounded-full bg-brand-2">
                        {category}
                    </div>
                ))}
            </div>
            <div className="aspect-w-1 aspect-h-1 relative w-full mx-auto mt-4 h-32 overflow-hidden rounded-lg bg-gray-200 group-hover:opacity-75">
                <Image
                src={urlForImage(item.restaurantImage).width(200).height(200).url()}
                layout="fill"
                objectFit="cover"
                objectPosition='center'
                alt={item.name}
                />
            </div>
            <div className="pt-3 pb-4 text-center">
                <h3 className="text-lg font-semibold text-gray-900">
                    <Link href={`/restaurants/${item.slug}`}>
                    {item.name}
                    </Link>
                </h3>
                <div className="mt-1 flex flex-col items-center">
                    <p className="sr-only">{item.rating} out of 5 stars</p>
                    <div className="flex items-center">
                    {[0, 1, 2, 3, 4].map((rating) => (
                        <AiFillStar
                        key={rating}
                        className={classNames(
                            item.rating > rating ? 'text-yellow-400' : 'text-gray-200',
                            'flex-shrink-0 h-5 w-5'
                        )}
                        aria-hidden="true"
                        />
                    ))}
                    </div>
                    <p className="mt-1 text-sm text-gray-500">
                        {reviewCount} reviews</p>
                </div>
            </div>
        </div>
    )
}