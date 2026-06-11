
import { ArrowRight, Import} from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import '@/app/globals.css'

export default function Page() {
    return (
        <div className='justify-center' >
            <div className='container mx-auto my-50 text-center'>
                <p className='font-bold mb-3 text-5xl text-white'>
                    Tree Plantation Live Tracking Platform
                </p>
                <div>
                    <p className='text-blue-2 text-lg'>
                        Submit tree plantation records, monitor ongoing progress, track key performance indicators,<br/>
                        and analyze environmental impact through dynamic data trends.
                    </p>
                </div>
                <div className='my-10'>
                    <Link href='/login'>
                        <Button className='h-12 px-10 text-lg bg-blue-3 font-bold'>Login <ArrowRight/></Button>
                    </Link>
                </div>
            </div>
        </div>
    )
}