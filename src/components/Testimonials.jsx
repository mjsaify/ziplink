import React from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent } from './ui/card'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { ChevronLeft, ChevronRight, Star } from 'lucide-react'
import { Button } from './ui/button'

const Testimonials = () => {
    const [currentIndex, setCurrentIndex] = React.useState(0)

    const testimonials = [
        {
            id: 1,
            name: "Alex Johnson",
            role: "Digital Marketer",
            avatar: "/placeholder.svg?height=60&width=60&text=AJ",
            content: "ZipLink has revolutionized the way I share links. It's fast, reliable, and the analytics are incredibly useful!",
            rating: 5
        },
        {
            id: 2,
            name: "Sarah Lee",
            role: "Social Media Influencer",
            avatar: "/placeholder.svg?height=60&width=60&text=SL",
            content: "I love how easy it is to create and manage short links with ZipLink. It's become an essential tool in my content strategy.",
            rating: 5
        },
        {
            id: 3,
            name: "Mike Chen",
            role: "E-commerce Owner",
            avatar: "/placeholder.svg?height=60&width=60&text=MC",
            content: "The custom domains feature is a game-changer. It's helped me maintain brand consistency across all my product links.",
            rating: 4
        }
    ]


    const nextTestimonial = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length)
    }

    const prevTestimonial = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length)
    }


    return (
        <section className="py-16 ">
            <div className="px-4">
                <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center text-white">What Our Users Say</h2>
                <div className="relative max-w-4xl mx-auto">
                    <motion.div
                        key={currentIndex}
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -50 }}
                        transition={{ duration: 0.5 }}
                    >
                        <Card className="bg-gray-800 border-gray-700">
                            <CardContent className="p-8">
                                <div className="flex items-center mb-4">
                                    <Avatar className="h-12 w-12 mr-4">
                                        <AvatarImage src={testimonials[currentIndex].avatar} alt={testimonials[currentIndex].name} />
                                        <AvatarFallback>{testimonials[currentIndex].name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                                    </Avatar>
                                    <div>
                                        <h3 className="text-xl font-semibold text-white">{testimonials[currentIndex].name}</h3>
                                        <p className="text-sm text-gray-400">{testimonials[currentIndex].role}</p>
                                    </div>
                                </div>
                                <p className="text-gray-300 mb-4 italic">"{testimonials[currentIndex].content}"</p>
                                <div className="flex items-center">
                                    {[...Array(5)].map((_, i) => (
                                        <Star
                                            key={i}
                                            className={`h-5 w-5 ${i < testimonials[currentIndex].rating ? 'text-yellow-400' : 'text-gray-600'}`}
                                            fill={i < testimonials[currentIndex].rating ? 'currentColor' : 'none'}
                                        />
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    </motion.div>
                    <div className="flex justify-between mt-6">
                        <Button
                            variant="outline"
                            size="icon"
                            onClick={prevTestimonial}
                            className="bg-gray-800 text-white hover:bg-gray-700"
                        >
                            <ChevronLeft className="h-4 w-4" />
                            <span className="sr-only">Previous testimonial</span>
                        </Button>
                        <Button
                            variant="outline"
                            size="icon"
                            onClick={nextTestimonial}
                            className="bg-gray-800 text-white hover:bg-gray-700"
                        >
                            <ChevronRight className="h-4 w-4" />
                            <span className="sr-only">Next testimonial</span>
                        </Button>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Testimonials