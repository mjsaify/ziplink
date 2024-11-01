import { motion } from 'framer-motion'
import { ArrowRight, Zap, Globe, ChartBar } from 'lucide-react'
import { Card, CardContent } from "../components/ui/card"
import { Button } from "../components/ui/button"

export default function About() {
    const features = [
        { icon: Zap, title: 'Lightning Fast', description: 'Create short links in seconds' },
        { icon: Globe, title: 'Global Reach', description: 'Share your links worldwide' },
        { icon: ChartBar, title: 'Detailed Analytics', description: 'Track and analyze your link performance' },
    ]

    return (
        <section className="px-4 md:px-8">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="max-w-6xl mx-auto"
            >
                <h2 className="text-3xl md:text-5xl font-bold mb-8 text-center text-white">
                    About <span className="gradient-heading">ZipLink</span>
                </h2>
                <div className="w-full text-center flex justify-center mb-12">
                    <div className='lg:w-[75%]'>
                        <p className="text-gray-300 mb-6 text-lg leading-relaxed">
                            ZipLink is more than just a URL shortener. We're on a mission to simplify the web, one link at a time. Our powerful tools help you create, manage, and track short links with ease.
                        </p>
                        <p className="text-gray-300 mb-8 text-lg leading-relaxed">
                            Whether you're a social media influencer, a digital marketer, or just someone who wants to share links more efficiently, ZipLink has got you covered.
                        </p>
                        <Button
                            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-6 rounded-full transition duration-300 ease-in-out transform hover:scale-105"
                        >
                            Learn More
                            <ArrowRight className="ml-2 h-5 w-5" />
                        </Button>
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
                    {features.map((feature, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: index * 0.2 }}
                        >
                            <Card className="bg-gray-800 border-gray-700 hover:border-blue-500 transition-colors duration-300">
                                <CardContent className="p-6">
                                    <feature.icon className="h-12 w-12 text-blue-500 mb-4" />
                                    <h3 className="text-xl font-semibold text-white mb-2">{feature.title}</h3>
                                    <p className="text-gray-400">{feature.description}</p>
                                </CardContent>
                            </Card>
                        </motion.div>
                    ))}
                </div>
            </motion.div>
        </section>
    )
}