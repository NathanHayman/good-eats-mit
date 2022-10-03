import { urlForImage } from '../lib/sanity'
import Image from 'next/image'
import Link from "next/link"
import React from "react"
import { AiFillStar } from 'react-icons/ai'
import { useStateContext } from '../context/StateContext';

export default function RestaurantCard({ item }) {

    function classNames(...classes) {
        return classes.filter(Boolean).join(' ')
      }

      const { decQty, incQty, qty, onAdd } = useStateContext();


    return (
        <div>
        <div key={item.name} className="group relative border-r border-b p-4 sm:p-6">
            <div className="flex flex-row space-x-4 absolute top-2 right-2">
                <div className="text-sm font-medium text-white px-2 rounded-full bg-brand-2">
                    {item.price}
                </div>
            </div>
            <div className="aspect-w-1 aspect-h-1 relative w-full mx-auto mt-4 h-32 overflow-hidden rounded-lg bg-gray-200 group-hover:opacity-75">
                <Image
                src={urlForImage(item?.image[0]).width(200).height(200).url()}
                layout="fill"
                objectFit="cover"
                objectPosition='center'
                alt={item.name}
                />
            </div>
            <div className="pt-3 pb-4 text-center">
                <h3 className="text-lg mb-4 font-semibold text-gray-900">
                    {item.name}
                </h3>
                <div className="mt-1 flex flex-row items-center relative">
                    <div className="flex flex-row items-center space-x-2">
                        <button onClick={decQty} className=' text-brand-2 px-2 rounded-full'>-</button>
                        <p className='text-black'>{qty}</p>
                        <button onClick={incQty} className=' text-brand-2 px-1 rounded-full'>+</button>
                    </div>
                    <button onClick={() => onAdd(item, qty)} className='bg-white absolute right-0 bottom-0 text-brand-2 border border-brand-2 hover:text-white hover:bg-brand-2 hover:border-transparent transition-all rounded-full px-2 text-sm'>
                        Add to Cart
                    </button>
                    {/* 
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
                    */}
                </div>
            </div>
        </div>
        </div>
    )
}