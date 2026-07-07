import React, { useState } from 'react';
import { ShoppingBag, X, Trash2, Plus, Minus, CreditCard, CheckCircle2 } from 'lucide-react';

export default function Shop({ products }) {
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [checkoutStep, setCheckoutStep] = useState(0); // 0: Cart, 1: Details/Payment, 2: Success
  const [checkoutData, setCheckoutData] = useState({ name: '', email: '', cardNumber: '' });
  const [isProcessing, setIsProcessing] = useState(false);

  const handleAddToCart = (product) => {
    const existing = cart.find(item => item.id === product.id);
    if (existing) {
      setCart(prev => prev.map(item => 
        item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
      ));
    } else {
      setCart(prev => [...prev, { ...product, quantity: 1 }]);
    }
    // Auto open cart drawer
    setIsCartOpen(true);
    setCheckoutStep(0);
  };

  const handleQuantityChange = (id, delta) => {
    setCart(prev => prev.map(item => {
      if (item.id === id) {
        const nextQty = item.quantity + delta;
        return nextQty > 0 ? { ...item, quantity: nextQty } : item;
      }
      return item;
    }));
  };

  const handleRemoveItem = (id) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const cartTotal = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const totalItemsCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCheckoutData(prev => ({ ...prev, [name]: value }));
  };

  const handleCheckoutSubmit = (e) => {
    e.preventDefault();
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setCheckoutStep(2);
      setCart([]); // clear cart
    }, 1500);
  };

  return (
    <div className="container" style={{ paddingBottom: '5rem', position: 'relative' }}>
      
      {/* Header */}
      <section style={{ padding: '5rem 0 3rem 0', textAlign: 'center' }}>
        <span className="section-subtitle">Digital Academy Shop</span>
        <h1 style={{ fontSize: '3rem', fontWeight: 800, marginBottom: '1.5rem' }}>Ecosystem Shop</h1>
        <p style={{ fontSize: '1.1rem', color: 'var(--text-secondary)', maxWidth: '750px', margin: '0 auto', lineHeight: '1.7' }}>
          Purchase physical card decks, playbook hardcovers, digital templates, and self-paced programs to practice innovation.
        </p>
      </section>

      {/* Cart Float Button */}
      <button 
        onClick={() => { setIsCartOpen(true); setCheckoutStep(0); }}
        className="btn btn-primary"
        style={{
          position: 'fixed',
          bottom: '2rem',
          right: '2rem',
          zIndex: 95,
          borderRadius: '50%',
          width: '56px',
          height: '56px',
          padding: 0,
          boxShadow: '0 8px 32px rgba(249, 115, 22, 0.4)'
        }}
      >
        <div style={{ position: 'relative' }}>
          <ShoppingBag size={22} />
          {totalItemsCount > 0 && (
            <span style={{
              position: 'absolute',
              top: '-12px',
              right: '-12px',
              background: '#fff',
              color: '#000',
              fontSize: '0.7rem',
              fontWeight: 800,
              borderRadius: '50%',
              width: '18px',
              height: '18px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              {totalItemsCount}
            </span>
          )}
        </div>
      </button>

      {/* Products Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        gap: '2rem',
        textAlign: 'left'
      }}>
        {products.map(prod => (
          <div key={prod.id} className="glass-panel" style={{ borderRadius: '16px', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
            <img 
              src={prod.image} 
              alt={prod.title}
              style={{ width: '100%', height: '200px', objectFit: 'cover' }}
            />
            <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem', flexGrow: 1 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span className="badge badge-primary" style={{ fontSize: '0.65rem' }}>{prod.type}</span>
                <span style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--accent-orange)' }}>${prod.price.toFixed(2)}</span>
              </div>

              <h3 style={{ fontSize: '1.15rem', color: '#fff', fontWeight: 700 }}>{prod.title}</h3>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: '1.5', flexGrow: 1 }}>
                {prod.description}
              </p>

              <button 
                onClick={() => handleAddToCart(prod)}
                className="btn btn-outline btn-sm"
                style={{ width: '100%', marginTop: 'auto' }}
              >
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Cart / Checkout Drawer Overlay */}
      {isCartOpen && (
        <div 
          onClick={() => setIsCartOpen(false)}
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(5, 8, 15, 0.75)',
            backdropFilter: 'blur(4px)',
            zIndex: 1000,
            display: 'flex',
            justifyContent: 'flex-end'
          }}
        >
          <div 
            onClick={(e) => e.stopPropagation()}
            style={{
              width: '100%',
              maxWidth: '420px',
              height: '100%',
              backgroundColor: '#0F1626',
              borderLeft: '1px solid rgba(255,255,255,0.08)',
              padding: '1.5rem',
              display: 'flex',
              flexDirection: 'column',
              textAlign: 'left'
            }}
          >
            {/* Drawer Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--glass-border)', paddingBottom: '1rem', marginBottom: '1.5rem' }}>
              <h3 style={{ fontSize: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <ShoppingBag size={20} color="var(--accent-orange)" /> 
                {checkoutStep === 2 ? 'Receipt' : 'Shopping Cart'}
              </h3>
              <button onClick={() => setIsCartOpen(false)} style={{ background: 'none', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer' }}>
                <X size={20} />
              </button>
            </div>

            {/* Step 0: Cart List */}
            {checkoutStep === 0 && (
              <>
                <div style={{ flexGrow: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '1.5rem' }}>
                  {cart.length === 0 ? (
                    <div style={{ textAlign: 'center', padding: '3rem 0', color: 'var(--text-secondary)' }}>
                      Your cart is empty.
                    </div>
                  ) : (
                    cart.map(item => (
                      <div key={item.id} style={{ display: 'flex', gap: '1rem', alignItems: 'center', background: 'rgba(255,255,255,0.01)', border: '1px solid var(--glass-border)', padding: '0.75rem', borderRadius: '10px' }}>
                        <img src={item.image} alt={item.title} style={{ width: '50px', height: '50px', objectFit: 'cover', borderRadius: '6px' }} />
                        <div style={{ flexGrow: 1 }}>
                          <h5 style={{ fontSize: '0.85rem', color: '#fff', fontWeight: 600 }}>{item.title}</h5>
                          <span style={{ fontSize: '0.8rem', color: 'var(--accent-orange)' }}>${(item.price * item.quantity).toFixed(2)}</span>
                          
                          {/* Qty adjust */}
                          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '0.25rem' }}>
                            <button onClick={() => handleQuantityChange(item.id, -1)} style={{ background: 'rgba(255,255,255,0.05)', border: 'none', color: '#fff', width: '20px', height: '20px', borderRadius: '4px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                              <Minus size={10} />
                            </button>
                            <span style={{ fontSize: '0.8rem' }}>{item.quantity}</span>
                            <button onClick={() => handleQuantityChange(item.id, 1)} style={{ background: 'rgba(255,255,255,0.05)', border: 'none', color: '#fff', width: '20px', height: '20px', borderRadius: '4px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                              <Plus size={10} />
                            </button>
                          </div>
                        </div>
                        <button onClick={() => handleRemoveItem(item.id)} style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}>
                          <Trash2 size={16} />
                        </button>
                      </div>
                    ))
                  )}
                </div>

                {cart.length > 0 && (
                  <div style={{ borderTop: '1px solid var(--glass-border)', paddingTop: '1.25rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.25rem', fontSize: '1.1rem', fontWeight: 700 }}>
                      <span>Subtotal:</span>
                      <span>${cartTotal.toFixed(2)}</span>
                    </div>
                    <button onClick={() => setCheckoutStep(1)} className="btn btn-primary" style={{ width: '100%' }}>
                      Proceed to Checkout
                    </button>
                  </div>
                )}
              </>
            )}

            {/* Step 1: Payment Checkout form */}
            {checkoutStep === 1 && (
              <form onSubmit={handleCheckoutSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', flexGrow: 1 }}>
                <h4 style={{ fontSize: '1rem', color: '#fff' }}>Secure Checkout</h4>

                <div className="form-group">
                  <label className="form-label">Full Name</label>
                  <input type="text" required name="name" value={checkoutData.name} onChange={handleInputChange} placeholder="Enter your name" className="form-input" />
                </div>

                <div className="form-group">
                  <label className="form-label">Email Address</label>
                  <input type="email" required name="email" value={checkoutData.email} onChange={handleInputChange} placeholder="you@example.com" className="form-input" />
                </div>

                <div className="form-group">
                  <label className="form-label">Mock Card Details</label>
                  <div style={{ position: 'relative' }}>
                    <CreditCard size={16} style={{ position: 'absolute', left: '12px', top: '14px', color: 'var(--text-muted)' }} />
                    <input type="text" required name="cardNumber" value={checkoutData.cardNumber} onChange={handleInputChange} placeholder="4111 2222 3333 4444" className="form-input" style={{ paddingLeft: '2.5rem', width: '100%' }} />
                  </div>
                </div>

                <div style={{ borderTop: '1px solid var(--glass-border)', paddingTop: '1.25rem', marginTop: 'auto' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.25rem', fontSize: '1.1rem', fontWeight: 700 }}>
                    <span>Total Payment:</span>
                    <span>${cartTotal.toFixed(2)}</span>
                  </div>
                  <div style={{ display: 'flex', gap: '0.75rem' }}>
                    <button type="button" onClick={() => setCheckoutStep(0)} className="btn btn-secondary" style={{ flexGrow: 1 }}>Back</button>
                    <button type="submit" disabled={isProcessing} className="btn btn-primary" style={{ flexGrow: 2 }}>
                      {isProcessing ? 'Processing...' : 'Pay Now'}
                    </button>
                  </div>
                </div>
              </form>
            )}

            {/* Step 2: Success Payment Screen */}
            {checkoutStep === 2 && (
              <div style={{ textAlign: 'center', padding: '2rem 0', display: 'flex', flexDirection: 'column', gap: '1.5rem', alignItems: 'center' }}>
                <CheckCircle2 size={56} color="var(--accent-orange)" />
                <div>
                  <h4 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#fff' }}>Purchase Completed!</h4>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: '0.5rem' }}>
                    We've emailed download access credentials for your digital assets.
                  </p>
                </div>
                <button onClick={() => setIsCartOpen(false)} className="btn btn-secondary" style={{ width: '100%' }}>Close Cart</button>
              </div>
            )}

          </div>
        </div>
      )}

    </div>
  );
}
