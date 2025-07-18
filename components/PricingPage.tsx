'use client'
import { pricingTiers } from '@/config/plans'
import React, { useState } from 'react'

const PricingPage = () => {
    const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>('annual')
    const [hoveredTier, setHoveredTier] = useState<string | null>(null)

    return (
        <div className="min-h-screen bg-black text-white pt-10">
            <main className="container mx-auto px-4 py-16">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <h1 className="text-4xl md:text-5xl font-bold mb-6">Simple, transparent pricing</h1>
                    <p className="text-xl text-white/80 mb-8">
                        Choose the plan that fits your needs. Scale up as your audience grows.
                    </p>

                    {/* Billing Toggle */}
                    <div className="inline-flex items-center bg-white/10 rounded-full p-1 mb-12">
                        <button
                            onClick={() => setBillingCycle('monthly')}
                            className={`px-6 py-2 rounded-full text-sm font-medium ${billingCycle === 'monthly' ? 'bg-white text-black' : 'text-white/80 hover:text-white'}`}
                        >
                            Monthly
                        </button>
                        <button
                            onClick={() => setBillingCycle('annual')}
                            className={`px-6 py-2 rounded-full text-sm font-medium ${billingCycle === 'annual' ? 'bg-white text-black' : 'text-white/80 hover:text-white'}`}
                        >
                            Annual (20% off)
                        </button>
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                    {pricingTiers.map((tier) => (
                        <div
                            key={tier.name}
                            onMouseEnter={() => setHoveredTier(tier.name)}
                            onMouseLeave={() => setHoveredTier(null)}
                            className={`relative flex flex-col border rounded-xl overflow-hidden transition-all duration-300 bg-gradient-to-b ${tier.popular ? 'from-green-900/20 to-black border-yellow-400/30' : 'from-black to-black border-white/10'} ${hoveredTier === tier.name ? 'transform scale-[1.02] shadow-xl' : ''}`}
                        >
                            {tier.popular && (
                                <div className="absolute top-0 right-0 bg-gradient-to-r from-yellow-500 to-green-600 text-black px-4 py-1 text-xs font-bold rounded-bl-lg shadow-md">
                                    MOST POPULAR
                                </div>
                            )}

                            <div className="p-8 flex-1">
                                <h2 className={`text-2xl font-bold mb-2 ${tier.popular ? 'text-yellow-400' : 'text-white'}`}>
                                    {tier.name}
                                    {tier.popular && (
                                        <span className="ml-2 text-yellow-200/70 text-sm">🔥 Best value</span>
                                    )}
                                </h2>
                                <p className="text-white/70 mb-6">{tier.description}</p>

                                <div className="mb-8">
                                    <span className={`text-4xl font-bold ${tier.popular ? 'text-yellow-400' : 'text-white'}`}>
                                        ${billingCycle === 'annual' ? tier.annualPrice : tier.monthlyPrice}
                                    </span>
                                    <span className="text-white/60">/{billingCycle === 'annual' ? 'mo' : 'mo'}</span>
                                    {billingCycle === 'annual' && tier.annualPrice > 0 && (
                                        <div className="text-sm text-green-400/80 mt-1">
                                            Save ${(tier.monthlyPrice * 12) - (tier.annualPrice * 12)} annually
                                        </div>
                                    )}
                                </div>

                                <ul className="space-y-3 mb-8">
                                    {tier.features.map((feature, index) => (
                                        <li key={index} className="flex items-start">
                                            <svg className={`h-5 w-5 ${tier.popular ? 'text-green-400' : 'text-yellow-500'} mr-2 mt-0.5 flex-shrink-0`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                            </svg>
                                            <span className={tier.popular ? 'text-white' : 'text-white/80'}>{feature}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <div className="p-8 pt-0">
                                <button
                                    className={`w-full py-3 rounded-md font-medium transition-colors ${tier.popular
                                        ? 'bg-gradient-to-r from-yellow-500 to-green-600 text-black hover:from-yellow-400 hover:to-green-500 shadow-lg'
                                        : 'bg-white/10 hover:bg-white/20 border border-white/10'}`}
                                >
                                    {tier.cta}
                                </button>
                                
                            </div>
                        </div>
                    ))}
                </div>
                <div className="max-w-3xl mx-auto mt-24">
                    <h2 className="text-3xl font-bold mb-8 text-center">Frequently asked questions</h2>
                    <div className="space-y-4">
                        {[
                            {
                                question: "Can I change plans later?",
                                answer: "Yes, you can upgrade or downgrade your plan at any time."
                            },
                            {
                                question: "Do you offer discounts for non-profits?",
                                answer: "We offer 50% off for registered non-profit organizations. Contact us for verification."
                            },
                            {
                                question: "What payment methods do you accept?",
                                answer: "We accept all major credit cards, PayPal, and in some cases, cryptocurrency."
                            },
                            {
                                question: "Is there a limit on poll responses?",
                                answer: "Each tier has different limits. Free tier allows 200 votes per poll, Pro allows 2,000, and Enterprise allows 20,000."
                            }
                        ].map((item, index) => (
                            <div key={index} className="border-b border-white/10 pb-4">
                                <button className="flex justify-between items-center w-full text-left">
                                    <h3 className="text-lg font-medium">{item.question}</h3>
                                    <svg className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                    </svg>
                                </button>
                                <p className="mt-2 text-white/60">{item.answer}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </main>
        </div>
    )
}

export default PricingPage