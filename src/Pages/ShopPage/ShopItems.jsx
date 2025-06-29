import React, { useState, useEffect } from 'react';

const productsData = [
    { id: 1, name: "Maize", price: 25, image: "/maize.jpg" },
    { id: 2, name: "Millet", price: 20, image: "/millet.jpg" },
    { id: 3, name: "Sorghum", price: 30, image: "/sorghum.jpg" },
    { id: 4, name: "Rice", price: 28, image: "/rice.jpg" },
];

const ShopItems = () => {
    const [cart, setCart] = useState(() =>{
      const savedCart = localStorage.getItem('grainCart');
        return savedCart? JSON.parse(savedCart) : []; 
    });
    const [search, setSearch] = useState('');
    const [showCart, setShowCart] = useState(false);


    // Save cart to localStorage
    useEffect(() => {
        localStorage.setItem('grainCart', JSON.stringify(cart));
    }, [cart]);

    const filteredProducts = productsData.filter(product =>
        product.name.toLowerCase().includes(search.toLowerCase())
    );

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
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-3xl font-bold">Shop Our Products</h1>
                    <input
                        type="text"
                        placeholder="Search products..."
                        className="border px-4 py-2 rounded-full"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
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
                            <div key={product.id} className="border shadow rounded-lg overflow-hidden p-4 text-center">
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
