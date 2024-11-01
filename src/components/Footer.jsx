import { Heart } from 'lucide-react'

const Footer = () => {
    return (
        <footer className="bg-gray-900 text-gray-300 py-8">
            <div className="container mx-auto px-4">
                <div className="flex flex-col items-center justify-center">
                    <p className="text-sm md:text-base flex items-center">
                        Made with <Heart className="text-red-500 mx-1 animate-pulse" size={16} /> by <a href="https://github.com/mjsaify" target='_blank' className='ml-2 hover:underline'>Mujeeb Saifi</a>
                    </p>
                    <p className="mt-2 text-xs md:text-sm text-gray-500">
                        &copy; {new Date().getFullYear()} ZipLink. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    )
}

export default Footer