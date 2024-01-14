import { Text, Flex } from './primitives'

export const Footer = () => {
  return (
    <Flex
      css={{
        backgroundColor: '$neutralBgSubtle'
      }}
    >
      <Flex
        justify="center"
        align="center"
        css={{
          py: '$5',
          width: '100%',
          flexDirection: 'column',
          gap: 36
        }}
      >
        <Text color="secondary">© 2024 Likwid. All rights reserved.</Text>
      </Flex>
    </Flex>
  )
}
