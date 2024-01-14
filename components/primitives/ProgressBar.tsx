import { Flex, AnimatedFlex, Text } from '../primitives'
import React, {ComponentPropsWithoutRef, FC, ReactNode, useRef} from 'react'
import {CSS} from "@stitches/react";
import {useInView} from "framer-motion";

type Props = {
  value: number
  max: number
  hidePercentage?: boolean
  label?: ReactNode | string
  color?: string
  labelCSS?: CSS
  textCSS?: CSS
} & ComponentPropsWithoutRef<typeof Flex>

const ProgressBar: FC<Props> = ({ value, hidePercentage, max, label, labelCSS, color = '$secondary8', css, textCSS, ...props }) => {
  const percent = (value / max) * 100
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <Flex
      {...props}
      css={{
        width: '100%',
        backgroundColor: '#e6e8ef',
        marginTop: '1.4em',
        borderRadius: 16,
        position: 'relative',
        ...css
      }}
    >
      {label && (<Text css={{ position: 'absolute', top: '-1.4em', ...labelCSS }}>{label}</Text>)}
      <AnimatedFlex
        ref={ref}
        initial={{
          width: 0
        }}
        animate={{ width: isInView ? `${percent}%` : '0%' }}
        css={{
          height: 8,
          borderRadius: 16,
          background: color,
          width: `${percent}%`,
          transition: 'all 0.5s ease',
          position: 'relative',
        }}
      >
        {!hidePercentage && (
          <Text css={{ position: 'absolute', top: '-1.4em', right: 0, fontWeight: 500, ...textCSS }}>{`${value}%`}</Text>
        )}
      </AnimatedFlex>
    </Flex>
  )
}

export default ProgressBar
