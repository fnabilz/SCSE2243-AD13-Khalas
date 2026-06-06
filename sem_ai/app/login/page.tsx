
import { ArrowRight, Import} from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import '@/app/globals.css'

export default function Page() {
    return (
        <div className='flex min-h-screen flex-col bg-white' >
            <div className='container mx-auto my-50 text-center'>
                <p className='font-bold mb-3 text-5xl text-gray-900'>
                    Login
                </p>
            </div>
        </div>
    )
}