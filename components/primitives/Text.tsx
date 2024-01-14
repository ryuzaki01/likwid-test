import { styled } from 'stitches.config'

export default styled('span', {
  color: '#000000',
  fontFamily: '$body',
  letterSpacing: 0,
  variants: {
    style: {
      h1: {
        fontSize: 64,
      },
      h2: {
        fontSize: 48,
      },
      h3: {
        fontSize: 40,
      },
      h4: {
        fontSize: 32,
      },
      h5: {
        fontSize: 24,
      },
      h6: {
        fontSize: 20,
      },
      body1: {
        fontSize: 16,
      },
      body2: {
        fontSize: 14,
      },
      body3: {
        fontSize: 12,
      },
      body4: {
        fontSize: 10,
      },
    },
    color: {
      primary: {
        color: '$primary7',
      },
      secondary: {
        color: '$gray500',
      },
      dark: {
        color: '#08090c',
      },
      light: {
        color: '#fff',
      },
      subtle: {
        color: '$gray11',
      },
      error: {
        color: '#E84855',
      },
      success: {
        color: '#43AA8B'
      },
      inherit: {
        color: 'inherit',
      },
    },
    bold: {
      true: {
        fontWeight: 500,
      },
    },
    bolder: {
      true: {
        fontWeight: 600,
      },
    },
    boldest: {
      true: {
        fontWeight: 700,
      },
    },
    italic: {
      true: {
        fontStyle: 'italic',
      },
    },
    ellipsify: {
      true: {
        textOverflow: 'ellipsis',
        overflow: 'hidden',
        whiteSpace: 'nowrap',
      },
    },
  },

  defaultVariants: {
    style: 'body2',
  },
})
