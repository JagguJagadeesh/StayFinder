import { motion } from 'framer-motion'
import clsx from 'clsx'

export default function Button({ children, variant = 'primary', onClick, type = 'button' }) {
  const baseStyles = 'w-full px-5 py-2 cursor-pointer rounded-xl font-semibold transition focus:outline-none focus:ring-2'
  const variants = {
    primary: 'bg-pink-500 text-white hover:bg-pink-600 hover:border-b border-black focus:ring-pink-400',
  }

  return (
    <motion.button
      type={type}
    //   whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      className={clsx(baseStyles, variants[variant])}
      onClick={onClick}
    >
      {children}
    </motion.button>
  )
}
