import { ElementRef, forwardRef, ComponentPropsWithoutRef } from 'react'
import { styled } from 'stitches.config'

export const StyledAnchor = styled('a', {
  cursor: 'pointer',
  fontFamily: '$body',
  fontSize: 16,
  $$focusColor: '$colors$primary8',
  '&:focus-visible': {
    color: '$primary7',
    outline: 'none',
    borderRadius: 4,
    boxShadow: '0 0 0 2px $$focusColor',
  },
  variants: {
    color: {
      primary: {
        color: '$primary11',
        '&:hover': {
          color: '$primary10',
        },
      },
      gray: {
        color: '#08090C',
        '&:hover': {
          color: '$primary7',
        },
      },
    },
    weight: {
      heavy: {
        fontWeight: 700,
      },
      medium: {
        fontWeight: 500,
      },
      normal: {
        fontWeight: 400,
      },
    },
  },
  defaultVariants: {
    color: 'gray',
    weight: 'medium',
  },
})

const Anchor = forwardRef<
  ElementRef<typeof StyledAnchor>,
  ComponentPropsWithoutRef<typeof StyledAnchor>
>(({ children, ...props }, forwardedRef) => (
  <StyledAnchor ref={forwardedRef} {...props} tabIndex={0}>
    {children}
  </StyledAnchor>
))

Anchor.displayName = 'Anchor'

export default Anchor;
