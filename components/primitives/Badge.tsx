import { styled } from 'stitches.config'

export default styled('span', {
  display: 'inline-block',
  fontSize: 12,
  fontFamily: '$button',
  px: 8,
  py: 2,
  variants: {
    color: {
      primary: {
        backgroundColor: '$purple50',
        color: '$purple700'
      },
      secondary: {
        backgroundColor: '$gray100',
        color: '$gray700'
      },
    },
    corners: {
      square: {
        borderRadius: '$base',
      },
      rounded: {
        borderRadius: '$lg',
      },
      pill: {
        borderRadius: 99999,
      },
      circle: {
        borderRadius: '99999px',
        alignItems: 'center',
        justifyContent: 'center',
      },
    },
  },
  defaultVariants: {
    color: 'primary',
    corners: 'rounded'
  },
})
