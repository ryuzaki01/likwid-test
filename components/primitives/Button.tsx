import { styled } from 'stitches.config'

const Button = styled('button', {
  outline: 'none',
  fontWeight: '$medium',
  fontSize: 16,
  fontFamily: '$button',
  transition: 'background-color 250ms linear',
  gap: '$space$2',
  display: 'inline-flex',
  alignItems: 'center',
  lineHeight: '$3',
  $$focusColor: '$colors$gray12',
  '&:focus-visible': {
    boxShadow: '0 0 0 2px $$focusColor',
  },
  '&:disabled': {
    backgroundColor: '$gray8',
    color: '$gray11',
  },
  '&:disabled:hover': {
    backgroundColor: '$gray8',
    color: '$gray11',
  },
  variants: {
    color: {
      primary: {
        backgroundColor: '$primary10',
        color: '#fff',
        '&:hover': {
          backgroundColor: '$primary11',
        },
      },
      secondary: {
        backgroundColor: '#F7F8FC',
        color: '#000',
        '&:hover': {
          backgroundColor: '#E9ECF7'
        },
      },
      tertiary: {
        backgroundColor: '#DFE2EC',
        color: '#000',
        '&:hover': {
          backgroundColor: '#E9ECF7',
        },
      },
      loading: {
        backgroundColor: '$primary10',
        color: '#fff',
        '&:disabled': {
          backgroundColor: '$primary10',
          color: '#fff',
        },
        '&:disabled:hover': {
          backgroundColor: '$primary10',
          color: '#fff',
        }
      },
      gray3: {
        backgroundColor: '$neutralBgSubtle',
        color: '$gray12',
        '&:hover': {
          backgroundColor: '$gray6',
        },
      },
      gray4: {
        backgroundColor: '$gray4',
        color: '$gray12',
        '&:hover': {
          backgroundColor: '$gray7',
        },
      },
      white: {
        backgroundColor: '$whiteA12',
        color: '$secondary10',
        '&:hover': {
          backgroundColor: '$gray5',
        },
      },
      red: {
        backgroundColor: '$red10',
        color: '#fff',
        '&:hover': {
          backgroundColor: '$red11',
        },
      },
      ghost: {
        backgroundColor: 'transparent',
        p: 0,
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
    size: {
      none: {},
      xs: {
        p: '$space$3',
        lineHeight: '$2',
        minHeight: 30,
      },
      sm: {
        px: '$space$4',
        py: '$space$3',
        lineHeight: '$2',
        minHeight: 34,
      },
      md: {
        px: '$space$5',
        py: '$space$3',
        minHeight: 48,
      },
      lg: {
        px: '$space$5',
        py: '$space$4',
        minHeight: 56,
      },
    },
  },
  compoundVariants: [
    {
      size: 'xs',
      corners: 'circle',
      css: {
        height: 40,
        width: 40,
        p: 0,
      },
    },
    {
      size: 'small',
      corners: 'circle',
      css: {
        height: 44,
        width: 44,
        p: 0,
      },
    },
    {
      size: 'medium',
      corners: 'circle',
      css: {
        height: 44,
        width: 44,
        p: 0,
      },
    },
    {
      size: 'large',
      corners: 'circle',
      css: {
        height: 52,
        width: 52,
        p: 0,
      },
    },
  ],
  defaultVariants: {
    color: 'primary',
    corners: 'rounded',
    size: 'md',
  },
})

export default Button
