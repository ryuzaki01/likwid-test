import * as TooltipPrimitive from '@radix-ui/react-tooltip'
import * as Popover from '@radix-ui/react-popover'
import { useMediaQuery } from 'react-responsive'

import Box from './Box'
import { styled } from 'stitches.config'
import { useMounted } from 'hooks'

export const TooltipArrow = styled(TooltipPrimitive.Arrow, {
  fill: '#000',
})

const PopoverArrow = styled(Popover.Arrow, {
  fill: '#000',
})

const Tooltip = ({
  children,
  content,
  open,
  defaultOpen,
  onOpenChange,
  ...props
}: any) => {
  const isMounted = useMounted()
  const isSmallDevice = useMediaQuery({ maxWidth: 600 }) && isMounted

  if (isSmallDevice) {
    return (
      <Popover.Root
        open={open}
        defaultOpen={defaultOpen}
        onOpenChange={onOpenChange}
      >
        <Popover.Trigger asChild>{children}</Popover.Trigger>
        <Popover.Content
          sideOffset={2}
          side="bottom"
          align="center"
          style={{ zIndex: 100, outline: 'none' }}
          {...props}
        >
          <PopoverArrow />
          <Box
            css={{
              zIndex: 9999,
              $$shadowColor: '$colors$panelShadow',
              boxShadow: '0px 1px 5px rgba(0,0,0,0.2)',
              borderRadius: 12,
              overflow: 'hidden',
            }}
          >
            <Box
              css={{
                background: '#000',
                p: '$2',
                color: '#fff'
              }}
            >
              {content}
            </Box>
          </Box>
        </Popover.Content>
      </Popover.Root>
    )
  }
  return (
    <TooltipPrimitive.Root
      open={open}
      defaultOpen={defaultOpen}
      onOpenChange={onOpenChange}
      delayDuration={250}
    >
      <TooltipPrimitive.Trigger asChild>{children}</TooltipPrimitive.Trigger>
      <TooltipPrimitive.Content
        sideOffset={2}
        side="bottom"
        align="center"
        style={{ zIndex: 100 }}
        {...props}
      >
        <TooltipArrow />
        <Box
          css={{
            zIndex: 9999,
            $$shadowColor: '$colors$panelShadow',
            boxShadow: '0px 1px 5px rgba(0,0,0,0.2)',
            borderRadius: 12,
            overflow: 'hidden',
          }}
        >
          <Box
            css={{
              background: '#000',
              p: '$2',
              color: '#fff'
            }}
          >
            {content}
          </Box>
        </Box>
      </TooltipPrimitive.Content>
    </TooltipPrimitive.Root>
  )
}

export default Tooltip
