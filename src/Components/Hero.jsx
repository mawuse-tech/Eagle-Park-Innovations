import React from 'react'
import heroImg from '../assets/eagle2.webp'

const Hero = () => {
    return (
        <section className="bg-white py-12 px-6 md:px-20 lg:flex items-center justify-between">
            <div className="lg:w-1/2 space-y-6">
                <div className="inline-flex items-center gap-2 bg-green-100 text-green-700 text-sm font-medium px-4 py-1 rounded-full w-max">
                    <img src="/logo.svg" alt="grocery icon" className="w-4 h-4" />
                    The Best Online Grocery Store
                </div>

                <h1 className="text-4xl md:text-5xl font-bold leading-tight text-gray-900">
                    Your One-Stop Shop for <br />
                    <span className="text-green-600">Quality Groceries</span>
                </h1>

                <p className="text-gray-500 max-w-md">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore.
                </p>

                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row items-center gap-4">
                    <button className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 text-sm rounded-full">
                        Shop Now <i class="ri-arrow-right-line"></i>
                    </button>
                    <a href="#" className="text-sm font-medium text-gray-800 hover:underline">
                        View All Products
                    </a>
                </div>

            </div>

            <div className="lg:w-1/2 relative mt-10 lg:mt-0">
                <img
                    src={heroImg}
                    alt="hero"
                    className="w-full max-w-lg mx-auto"
                />

                {/* Floating Badges */}
                <div className="absolute top-8 right-4 bg-white shadow-md rounded-full px-4 py-2 flex items-center gap-2 text-sm text-green-800">
                   Secure Payment
                </div>
                <div className="absolute bottom-4 left-4 bg-white shadow-md rounded-full px-4 py-2 flex items-center gap-2 text-sm text-green-800">
                    Fast Delivery
                </div>
            </div>

        </section>
    )
}

export default Hero