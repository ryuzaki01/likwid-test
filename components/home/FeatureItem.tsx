import {FC, useState} from "react";
import {useAccount} from "wagmi";
import {useMediaQuery} from "react-responsive";
import {faCircleCheck} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

import {Box, Flex, Button, Text} from "components/primitives";
import LoadingSpinner from "../common/LoadingSpinner";
import FeatureTaskItem from "./FeatureTaskItem";
import {useMounted} from "hooks";
import {formatNumber} from "utils/numbers";
import {LikwidFeature} from "types/common";

type FeatureItemProps = {
  data: LikwidFeature
  onFeatureEntry: (id: string) => Promise<void>
}

const FeatureItem : FC<FeatureItemProps> = (props) => {
  const { data, onFeatureEntry } = props
  const { address } = useAccount()
  const isMounted = useMounted()
  const [ loading, setLoading ] = useState(false)
  const isMobile = useMediaQuery({ query: '(max-width: 960px)' }) && isMounted

  const handleFeatureEntryLoad = async () => {
    setLoading(true)
    await onFeatureEntry(data.id)
    setLoading(false)
  }

  return (
    <Box
      css={{
        backgroundColor: '$gray2',
        border: '1px solid #ddd',
        borderRadius: '$lg',
        p: '$4'
      }}
    >
      <Box>
        <Box css={{
          position: 'absolute',
          top: -18,
          left: -18,
        }}>
          {!!data.entry && (
            <FontAwesomeIcon
              icon={faCircleCheck}
              height={16}
              width={16}
              style={{
                position: 'absolute',
                top: 5,
                left: 5,
                border: '1px solid #000',
                background: "#000",
                borderRadius: '60%'
              }}
            />
          )}
        </Box>
        <Flex direction="column" css={{ mr: 1, mb: 2, gap: 14 }}>
          <Flex justify="between">
            <Text style={isMobile ? 'body1': 'h5'} boldest>
              {data.title}
            </Text>
            <Text
              style={isMobile ? 'body1': 'h5'}
              css={{
                px: '$2',
                py: '$1',
                borderRadius: '$lg',
                border: '1px solid $primary8',
                backgroundColor: '$primary3'
              }}
              boldest
            >
              {`Exp: ${formatNumber(data.exp)}`}
            </Text>
          </Flex>
          <Text style={isMobile ? 'body1': 'body2'}>
            {data.description}
          </Text>
          <Flex direction="column" css={{ gap: 8 }}>
            <Text bolder style="body1">
              Tasks
            </Text>
            {data.tasks.map((r, i) => (
              <FeatureTaskItem
                key={`requirement-${i}`}
                data={r}
                hasEntry={!!data.entry}
              />
            ))}
          </Flex>
        </Flex>
      </Box>
      <Box css={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-end',
        justifyContent: 'space-between'
      }}>
        <Box>
          <Button
            size="sm"
            aria-label="register"
            title="Complete Task"
            corners="circle"
            onClick={handleFeatureEntryLoad}
            disabled={!address || !!data.entry || loading}>
            {loading ? (
              <Flex align="center" justify="center" css={{ width: 47 }}>
                <LoadingSpinner css={{ width: 16, height: 16 }}/>
              </Flex>
            ) : !!data.entry ? 'Completed' : 'Verify'}
          </Button>
        </Box>
      </Box>
    </Box>
  )
}

export default FeatureItem;