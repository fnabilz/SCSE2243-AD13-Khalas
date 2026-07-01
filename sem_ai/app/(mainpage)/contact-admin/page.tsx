
import { ArrowRight, Import} from 'lucide-react'
import { Button } from '@/components/button'
import Link from 'next/link'
import '@/app/globals.css'
import { Mail, User, TreePine, Circle } from 'lucide-react';

export default function Page() {
    return (
        /* Outer wrapper that stretches the space and perfectly centers the card */
        <div className="flex grow items-center justify-center px-4 py-12 bg-white">
            <div className="w-full max-w-md space-y-4 rounded-2xl border border-slate-300/30 bg-slate-200/40 p-6 backdrop-blur-md shadow-xl text-slate-900">
        
                {/* Card Header */}
                <div className="mb-4 flex items-center gap-2">
                    <TreePine className="h-5 w-5 text-green-800" />
                    <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-900">
                    Administrator Contact
                    </h3>
                </div>

                {/* Single Contact Row */}
                <div className="flex items-center justify-between rounded-xl bg-white/60 p-4 shadow-sm">
                    <div className="flex items-center gap-3">
                    
                    {/* Avatar with Status Indicator */}
                    <div className="relative flex h-12 w-12 items-center justify-center rounded-full bg-slate-200 text-slate-600">
                        <User size={24} />
                        {/* Hardcoded Online Status */}
                        <Circle className="absolute -bottom-0.5 -right-0.5 h-3.5 w-3.5 rounded-full border-2 border-white fill-green-500 text-green-500" />
                    </div>
                    
                    <div>
                        <p className="text-base font-bold text-slate-900">Fikri Nabil</p>
                        <p className="text-xs text-slate-700">Head Developer</p>
                        <p className="text-xs text-slate-500">+6012-441 6621</p>
                    </div>
                    </div>

                    {/* Action Button */}
                    <a 
                    href="mailto:fikri@semai.com"
                    className="rounded-lg bg-white p-2 text-slate-600 shadow-sm border border-slate-200 hover:text-green-600 transition-colors"
                    >
                    <Mail size={20} />
                    </a>
                </div>

                <div className="flex items-center justify-between rounded-xl bg-white/60 p-4 shadow-sm">
                    <div className="flex items-center gap-3">
                    
                    {/* Avatar with Status Indicator */}
                    <div className="relative flex h-12 w-12 items-center justify-center rounded-full bg-slate-200 text-slate-600">
                        <User size={24} />
                        {/* Hardcoded Online Status */}
                        <Circle className="absolute -bottom-0.5 -right-0.5 h-3.5 w-3.5 rounded-full border-2 border-white fill-green-500 text-green-500" />
                    </div>
                    
                    <div>
                        <p className="text-base font-bold text-slate-900">Azri Arif</p>
                        <p className="text-xs text-slate-700">Assistant Manager</p>
                        <p className="text-xs text-slate-500">+6011-041 2941</p>
                    </div>
                    </div>

                    {/* Action Button */}
                    <a 
                    href="mailto:azri@semai.com"
                    className="rounded-lg bg-white p-2 text-slate-600 shadow-sm border border-slate-200 hover:text-green-600 transition-colors"
                    >
                    <Mail size={20} />
                    </a>
                </div>
                <div className="flex justify-center mt-6">
                    <a 
                        href="/login" 
                        className="inline-flex items-center font-medium text-green-600 hover:text-green-500 transition-colors"
                    >
                        <span>Back to Login</span>
                        <ArrowRight className="ml-1.5" size={16} />
                    </a>
                </div>
            </div>
            
        </div>
    )
}