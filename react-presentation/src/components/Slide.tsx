import { motion } from 'framer-motion';
import type { ReactNode } from 'react';

interface SlideProps {
    children: ReactNode;
}

export function Slide({ children }: SlideProps) {
    return (
        <motion.div
            initial={{ opacity: 0, filter: 'blur(10px)', scale: 0.98 }}
            animate={{ opacity: 1, filter: 'blur(0px)', scale: 1 }}
            exit={{ opacity: 0, filter: 'blur(10px)', scale: 1.02 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            style={{
                width: '100%',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '5rem',
                position: 'absolute',
                top: 0,
                left: 0,
                textAlign: 'center',
            }}
        >
            {children}
        </motion.div>
    );
}
