import React from 'react'
import { motion } from 'framer-motion'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { MessageCircle, Zap, Lock, Users, Smartphone, Gift } from 'lucide-react'

export default function LandingPage() {
  return (
    <main className="bg-gray-900 text-gray-100">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-24">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900 via-indigo-900 to-gray-900 opacity-50"></div>
        <div className="absolute inset-0 bg-[url('/placeholder.svg?height=1080&width=1920')] opacity-10"></div>
        <div className="container mx-auto px-4 relative z-10">
          <motion.h1 
            className="text-6xl font-bold mb-6 text-center bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Connect Instantly with ChatterBox
          </motion.h1>
          <motion.p 
            className="text-xl mb-8 text-center text-gray-300"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Experience lightning-fast, secure, and feature-rich real-time messaging
          </motion.p>
          <motion.div
            className="flex justify-center"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Button size="lg" className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white">
              Get Started for Free
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Feature Highlights */}
      <section className="container mx-auto px-4 py-24">
        <h2 className="text-4xl font-bold text-center mb-16 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">Why Choose ChatterBox?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { icon: <Zap className="h-8 w-8 mb-4 text-yellow-400" />, title: "Lightning Fast", description: "Instant message delivery for seamless conversations" },
            { icon: <Lock className="h-8 w-8 mb-4 text-green-400" />, title: "Secure & Private", description: "End-to-end encryption for all your messages" },
            { icon: <Users className="h-8 w-8 mb-4 text-blue-400" />, title: "Group Chats", description: "Create and manage multiple group conversations" },
            { icon: <Smartphone className="h-8 w-8 mb-4 text-purple-400" />, title: "Cross-Platform", description: "Available on web, iOS, and Android devices" },
            { icon: <Gift className="h-8 w-8 mb-4 text-pink-400" />, title: "Rich Media Sharing", description: "Easily share photos, videos, and files" },
            { icon: <MessageCircle className="h-8 w-8 mb-4 text-indigo-400" />, title: "Message History", description: "Access your conversation history anytime" },
          ].map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="bg-gray-800 border-gray-700 hover:bg-gray-750 transition-colors duration-300">
                <CardHeader>
                  <CardTitle className="flex flex-col items-center text-center">
                    {feature.icon}
                    <span className="mt-2 text-gray-100">{feature.title}</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-center text-gray-400">{feature.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      {/* How It Works */}
      <section className="container mx-auto px-4 py-24 bg-gray-850">
        <h2 className="text-4xl font-bold text-center mb-16 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">How It Works</h2>
        <div className="flex flex-col md:flex-row justify-center items-center space-y-12 md:space-y-0 md:space-x-8">
          {[
            { step: 1, title: "Sign Up", description: "Create your free account in seconds" },
            { step: 2, title: "Add Friends", description: "Invite your friends or find new ones" },
            { step: 3, title: "Start Chatting", description: "Begin conversations instantly" },
          ].map((step, index) => (
            <motion.div
              key={index}
              className="flex flex-col items-center"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
            >
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 text-white flex items-center justify-center text-3xl font-bold mb-6">
                {step.step}
              </div>
              <h3 className="text-2xl font-semibold mb-3 text-gray-100">{step.title}</h3>
              <p className="text-center text-gray-400">{step.description}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="container mx-auto px-4 py-24">
        <h2 className="text-4xl font-bold text-center mb-16 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">What Our Users Say</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            { name: "Alex Johnson", role: "Student", quote: "ChatterBox has made group projects so much easier. It's fast, reliable, and fun to use!" },
            { name: "Sarah Lee", role: "Entrepreneur", quote: "As a business owner, I love how ChatterBox keeps my team connected. It's a game-changer for remote work." },
            { name: "Mike Chen", role: "Software Developer", quote: "The API is a breeze to work with. I integrated ChatterBox into our app, and our users love it!" },
          ].map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="bg-gray-800 border-gray-700 hover:bg-gray-750 transition-colors duration-300">
                <CardContent className="pt-6">
                  <p className="mb-4 text-gray-300 italic">"{testimonial.quote}"</p>
                  <p className="font-semibold text-gray-100">{testimonial.name}</p>
                  <p className="text-sm text-gray-400">{testimonial.role}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Pricing Plans */}
      <section className="container mx-auto px-4 py-24 bg-gray-850">
        <h2 className="text-4xl font-bold text-center mb-16 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">Choose Your Plan</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { name: "Basic", price: "Free", features: ["Unlimited 1-on-1 chats", "Group chats up to 10 people", "1 GB file storage", "24/7 customer support"] },
            { name: "Pro", price: "$9.99/mo", features: ["Everything in Basic", "Group chats up to 100 people", "10 GB file storage", "Custom emojis", "Priority support"] },
            { name: "Enterprise", price: "Custom", features: ["Everything in Pro", "Unlimited group sizes", "Unlimited file storage", "Advanced admin controls", "Dedicated account manager"] },
          ].map((plan, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="bg-gray-800 border-gray-700 hover:bg-gray-750 transition-colors duration-300">
                <CardHeader>
                  <CardTitle className="text-center">
                    <h3 className="text-2xl font-bold mb-2 text-gray-100">{plan.name}</h3>
                    <p className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">{plan.price}</p>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center text-gray-300">
                        <Zap className="h-5 w-5 mr-2 text-yellow-400" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Button className="w-full mt-6 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white">
                    Choose Plan
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Call to Action */}
      <section className="container mx-auto px-4 py-24">
        <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg p-12 text-center">
          <h2 className="text-4xl font-bold mb-6 text-white">Ready to Get Started?</h2>
          <p className="text-xl mb-8 text-gray-100">Join millions of users and experience the future of communication today.</p>
          <Button size="lg" className="bg-white text-purple-600 hover:bg-gray-100">
            Sign Up Now
          </Button>
        </div>
      </section>
    </main>
  )
}