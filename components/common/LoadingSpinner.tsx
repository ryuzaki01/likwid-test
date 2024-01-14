import { keyframes } from '@stitches/react'
import Image from 'next/image'
import { Box } from 'components/primitives'
import { CSS } from '@stitches/react'
import { FC } from 'react'

export const spin = keyframes({
  '0%': { transform: 'rotate(0deg)' },
  '100%': { transform: 'rotate(360deg)' },
})

type Props = {
  css?: CSS
}

const LoadingSpinner: FC<Props> = ({ css }) => {
  return (
    <Box
      css={{
        width: 35,
        height: 35,
        display: 'inline-block',
        animation: `${spin} 1s cubic-bezier(0.76, 0.35, 0.2, 0.7) infinite`,
        position: 'relative',
        ...css,
      }}
    >
      <Image src="/images/loader.svg" unoptimized fill alt="Loading" priority/>
    </Box>
  )
}

export default LoadingSpinner
