import { FC, ReactNode } from 'react'
import { Box, Flex } from 'components/primitives';
import Navbar from './navbar'
import { Footer } from './Footer';

type Props = {
  children: ReactNode
}

const Layout: FC<Props> = ({ children }) => {

  return (
    <Box
      css={{
        height: '100%',
        minHeight: '100vh',
        pt: 80
      }}
    >
      <Box
        css={{
          minHeight: 'calc(100vh - 80px - 87px)',
        }}
      >
        <Navbar />
        <main>{children}</main>
      </Box>
      <Footer/>
    </Box>
  )
}

export default Layout
