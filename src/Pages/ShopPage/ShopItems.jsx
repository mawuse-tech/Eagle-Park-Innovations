import React, { useState, useEffect } from 'react';
import cow from "../ShopPage/cow.webp";
import corn from "../ShopPage/corn.jpg";
import white from "../ShopPage/whitem.jpeg";
import soy from "../ShopPage/soyb.jpeg";
import rice from "../ShopPage/rice.jpg";
import nut from "../ShopPage/nut.jpeg";
import hen from "../ShopPage/redhen.jpg";
import eggs from "../ShopPage/eggs.webp";
import man from "../ShopPage/mann.png";

const productsData = [
    { id: 1, name: "Cowpea/kg", price: 40, image: cow, category: "grain" },
    { id: 2, name: "Cowpea/50kg", price: 350, image: cow, category: "grain" },
    { id: 3, name: "Yellow Maize/50kg", price: 350, image: corn, category: "grain" },
    { id: 4, name: "White Maize/50kg", price: 350, image: white, category: "grain" },
    { id: 5, name: "Soyabeans(Favour)/kg", price: 25, image: soy, category: "grain" },
    { id: 6, name: "Soyabeans(Afayak)/kg", price: 25, image: soy, category: "grain" },
    { id: 7, name: "Soyabeans/50kg", price: 350, image: soy, category: "grain" },
    { id: 8, name: "Rice/50kg", price: 360, image: rice, category: "grain" },
    { id: 9, name: "Groundnut/50kg", price: 650, image: nut, category: "grain" },
    { id: 10, name: "Spent layer/50kg", price: 70, image: hen, category: "poultry products" },
    { id: 11, name: "   Crate of eggs/unsorted", price: 70, image: eggs, category: "poultry products" },
    { id: 12, name: "   Compost/kg", price: 70, image: man, category: "poultry products" },
];

const ShopItems = () => {
    const [cart, setCart] = useState(() => {
        const savedCart = localStorage.getItem('grainCart');
        return savedCart ? JSON.parse(savedCart) : [];
    });
    const [search, setSearch] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [showCart, setShowCart] = useState(false);


    // Save cart to localStorage
    useEffect(() => {
        localStorage.setItem('grainCart', JSON.stringify(cart));
    }, [cart]);

    const filteredProducts = productsData.filter((product) => {
        const matchesSearch = product.name.toLowerCase().includes(search.toLowerCase());
        const matchesCategory = selectedCategory === 'All' || product.category.toLowerCase() === selectedCategory.toLowerCase()
        return matchesSearch && matchesCategory;
    });


    const handleAddOrRemove = (product) => {
        const exists = cart.find(item => item.id === product.id);
        if (exists) {
            setCart(cart.filter(item => item.id !== product.id));
            alert(`${product.name} removed from cart.`);
        } else {
            setCart([...cart, { ...product, quantity: 1 }]);
            alert(`${product.name} added to cart.`);
        }
    };

    const handleIncrease = (id) => {
        const updatedCart = cart.map(item =>
            item.id === id ? { ...item, quantity: item.quantity + 1 } : item
        );
        setCart(updatedCart);
    };

    const handleDecrease = (id) => {
        const updatedCart = cart.map(item =>
            item.id === id ? { ...item, quantity: item.quantity - 1 } : item
        ).filter(item => item.quantity > 0);
        setCart(updatedCart);
    };

    const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

    return (
        <div className="min-h-screen bg-white text-green-900 relative">
            <div className="max-w-7xl mx-auto py-12 px-4 md:px-8">
                <div className="flex flex-col gap-4 sm:flex-row sm:justify-between sm:items-center mb-6">
                    <h1 className="text-3xl font-bold">Shop Our Products</h1>

                    <input
                        type="text"
                        placeholder="Search products..."
                        className="border px-4 py-2 rounded-full"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />

                    <div className="relative inline-block">
                        <select
                            className="appearance-none border px-6 py-2 rounded-full pr-10"
                            value={selectedCategory}
                            onChange={(e) => setSelectedCategory(e.target.value)}
                        >
                            <option value="All">All</option>
                            <option value="grain">Grains</option>
                            <option value="poultry products">Poultry Products</option>
                            <option value="seeds">Seeds</option>
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-gray-500">
                            <svg
                                className="w-4 h-4"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M10 12a1 1 0 01-.7-.3l-3-3a1 1 0 111.4-1.4L10 9.58l2.3-2.3a1 1 0 111.4 1.42l-3 3a1 1 0 01-.7.3z"
                                    clipRule="evenodd"
                                />
                            </svg>
                        </div>
                    </div>


                    <button
                        onClick={() => setShowCart(!showCart)}
                        className="bg-green-800 text-white px-4 py-2 rounded-full hover:bg-green-900"
                    >
                        View Cart ({cart.length})
                    </button>
                </div>

                <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                    {filteredProducts.map(product => {
                        const inCart = cart.find(item => item.id === product.id);
                        return (
                            <div key={product.id} className="border-gray-900 shadow-lg rounded-lg overflow-hidden p-4 text-center">
                                <img src={product.image} alt={product.name} className="w-full h-40 object-cover mb-4" />
                                <h2 className="text-xl font-semibold">{product.name}</h2>
                                <p className="text-green-800 font-bold mb-2">GH₵{product.price}</p>
                                <button
                                    className={`w-48 px-4 py-2 rounded-full ${inCart ? 'bg-red-600 hover:bg-red-700' : 'bg-green-900 hover:bg-green-900'} text-white`}
                                    onClick={() => handleAddOrRemove(product)}
                                >
                                    {inCart ? 'Remove from Cart' : 'Add to Cart'}
                                </button>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Cart Sidebar */}
            {showCart && (
                <div className="fixed right-0 top-0 w-full sm:w-[400px] h-full bg-white shadow-lg border-l p-6 overflow-y-auto z-50">
                    {/* Close Button */}
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-xl font-bold">Your Cart</h2>
                        <button
                            onClick={() => setShowCart(false)}
                            className="text-green-800 hover:text-red-600 text-2xl font-bold"
                            aria-label="Close cart"
                        >
                            &times;
                        </button>
                    </div>

                    {cart.length === 0 ? (
                        <p>Your cart is empty.</p>
                    ) : (
                        <>
                            {cart.map(item => (
                                <div key={item.id} className="flex items-center justify-between mb-4 border-b pb-2">
                                    <div>
                                        <h3 className="font-semibold">{item.name}</h3>
                                        <p>GH₵{item.price} x {item.quantity}</p>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <button onClick={() => handleDecrease(item.id)} className="px-2 py-1 bg-gray-200 rounded">-</button>
                                        <span>{item.quantity}</span>
                                        <button onClick={() => handleIncrease(item.id)} className="px-2 py-1 bg-gray-200 rounded">+</button>
                                    </div>
                                </div>
                            ))}
                            <div className="mt-6 font-semibold">
                                Total: GH₵{total}
                            </div>
                            <button className="mt-4 w-full bg-green-800 text-white py-2 rounded-full hover:bg-green-900">
                                Click to Pay
                            </button>
                        </>
                    )}
                </div>
            )}

        </div>
    );
};

export default ShopItems;
