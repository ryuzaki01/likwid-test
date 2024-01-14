import { Text } from 'components/primitives'
import { ComponentPropsWithoutRef, forwardRef, ReactNode } from 'react'
import {CSS} from "@stitches/react";
import { ReactComponentLike } from 'prop-types';

type NavItemProps = {
  active?: boolean
  css?: CSS
  children: ReactNode
  as?: string | ReactComponentLike
  href?: string
}

const NavItem = forwardRef<
  HTMLParagraphElement,
  ComponentPropsWithoutRef<typeof Text> & NavItemProps
>(({ children, as, href, active, css, ...props }, forwardedRef) => (
  <Text
    ref={forwardedRef}
    css={{
      color: active ? 'rgba(43, 82, 238, 1)' : '#08090C',
      cursor: 'pointer',
      '&:hover': {
        color: 'rgba(43, 82, 238, 1)',
      },
      ...css
    }}
    as={as}
    href={href}
    style="body1"
    {...props}
  >
    {children}
  </Text>
))

NavItem.displayName = 'NavItem'

export default NavItem
