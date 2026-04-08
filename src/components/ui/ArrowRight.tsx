// components/ui/ArrowRight.tsx
import { motion } from 'motion/react'

export default function ArrowRight() {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            className='w-4 h-8 md:w-15 md:h-30'
            viewBox="0 0 91 181"
            fill="none"
        >
            <motion.path
                d="M42.6748 2.50044C19.6824 43.0395 -26.6249 110.164 28.351 145.632C41.8184 154.321 55.7596 153.378 71.1102 153.378C71.7733 153.378 87.1283 150.913 85.4339 149.558C80.897 145.928 54.4907 124.13 71.7468 138.099C73.5724 139.577 87.6621 147.519 87.6621 149.982C87.6621 156.695 62.9752 173.184 57.9536 178.205"
                stroke="currentColor"
                strokeWidth={5}
                strokeLinecap="round"
                fill="none"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{
                    pathLength: { duration: 1.4, delay: 1.0, ease: "easeInOut" },
                    opacity: { duration: 0.01, delay: 1.0 }
                }}
            />
        </svg>
    )
}