import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import ReactMarkdown from 'react-markdown';
import {faCircleCheck, faCancel, faQuestionCircle, faInfoCircle} from "@fortawesome/free-solid-svg-icons";

import {Flex, Tooltip} from "components/primitives";
import LinkRenderer from "components/common/LinkRenderer";
import {FeatureTask} from "types/common";

const CheckRequirementIcon = ({ passed, withCheck } : { passed: boolean, withCheck: boolean }) => {
  return withCheck ? (passed ? (
    <FontAwesomeIcon
      color="#14aeff"
      icon={faCircleCheck}
      width={20}
      height={20}
    />
  ) : (
    <FontAwesomeIcon
      icon={faCancel}
      color="red"
      width={20}
      height={20}
    />
  )) : (
    <FontAwesomeIcon
      icon={faQuestionCircle}
      color="#2fa80e"
      width={20}
      height={20}
    />
  );
}

const FeatureTaskItem = ({ data, hasEntry } : { data: FeatureTask, hasEntry: boolean }) => {
  const withCheck = hasEntry || typeof data?.passes === 'boolean';

  if (data?.type === 'connection') {
    return (
      <div className="requirement">
        <Flex
          align="center"
          css={{
            borderRadius: 35,
            py: 1,
            px: 2,
            gap: 15
          }}
        >
          <CheckRequirementIcon passed={hasEntry || !!data?.passes} withCheck={withCheck}/>
          <Flex css={{ gap: 8 }}>
            {`Connect ${data?.name} `}
            <Tooltip
              content={data?.name === 'wallet' ? `You can connect your ${data?.name} by clicking "Connect wallet" button on the top right page` : `You can connect your ${data?.name} account on your profile page`}
              sx={{
                verticalAlign: 'middle'
              }}
            >
              <FontAwesomeIcon
                icon={faInfoCircle}
                width={16}
                height={16}
              />
            </Tooltip>
          </Flex>
        </Flex>
      </div>
    );
  }

  if (data?.type === 'profile') {
    return (
      <div className="requirement">
        <Flex
          align="center"
          css={{
            borderRadius: 35,
            py: 1,
            px: 2,
            gap: 15
          }}
        >
          <CheckRequirementIcon passed={hasEntry || !!data?.passes} withCheck={withCheck}/>
          <Flex css={{ gap: 8 }}>
            {`Set your ${data?.name} `}
            <Tooltip
              content={`You can set ${data?.name} account on your profile page`}
              sx={{
                verticalAlign: 'middle'
              }}
            >
              <FontAwesomeIcon
                icon={faInfoCircle}
                width={16}
                height={16}
              />
            </Tooltip>
          </Flex>
        </Flex>
      </div>
    );
  }

  if (data?.type === 'discord') {
    return (
      <div className="requirement">
        <Flex
          css={{
            alignItems: 'center',
            borderRadius: 35,
            py: 1,
            px: 2,
            gap: 15
          }}
        >
          <CheckRequirementIcon passed={hasEntry || !!data?.passes} withCheck={withCheck}/>
          <ReactMarkdown components={{ a: LinkRenderer}}>
            {`Join ${data?.url ? `[**${data?.name || ''}**](${data?.url || ''})` : `**${data?.name || ''}**`} Discord ${data?.roles ?
              ` & have role ${data?.roles.map(r => `**${r.name} (x${r.multiplier})**`).join(', ')}` : ''}`}
          </ReactMarkdown>
        </Flex>
      </div>
    );
  }

  if (data?.type === 'twitter_follow') {
    return (
      <div className="requirement">
        <Flex css={{
          alignItems: 'center',
          borderRadius: 35,
          py: 1,
          px: 2,
          gap: 15
        }}>
          <CheckRequirementIcon passed={hasEntry || !!data?.passes} withCheck={withCheck}/>
          <ReactMarkdown components={{ a: LinkRenderer}}>
            {`Follow [**${data?.user || ''}**](<https://twitter.com/intent/user?screen_name=${data?.user?.replace('@', '')}&utm_source=likwid.co>) on X`}
          </ReactMarkdown>
        </Flex>
      </div>
    )
  }

  if (data?.type === 'twitter_like') {
    return (
      <div className="requirement">
        <Flex css={{
          alignItems: 'center',
          borderRadius: 35,
          py: 1,
          px: 2,
        }}>
          <CheckRequirementIcon passed={hasEntry || !!data?.passes} withCheck={withCheck}/>
          <ReactMarkdown components={{ a: LinkRenderer}}>
            {`Like [**this tweet**](<${data?.url}>)`}
          </ReactMarkdown>
        </Flex>
      </div>
    );
  }

  if (data?.type === 'twitter_retweet') {
    return (
      <div className="requirement">
        <Flex css={{
          display: 'flex',
          alignItems: 'center',
          borderRadius: 35,
          py: 1,
          px: 2,
        }}>
          <CheckRequirementIcon passed={hasEntry || !!data?.passes} withCheck={withCheck}/>
          <ReactMarkdown components={{ a: LinkRenderer}}>
            {`retweet [**this tweet**](<${data?.url}>)`}
          </ReactMarkdown>
        </Flex>
      </div>
    );
  }

  if (data?.type === 'twitter_like_retweet') {
    return (
      <div className="requirement">
        <Flex css={{
          display: 'flex',
          alignItems: 'center',
          borderRadius: 35,
          py: 1,
          px: 2,
        }}>
          <CheckRequirementIcon passed={hasEntry || !!data?.passes} withCheck={withCheck}/>
          <ReactMarkdown components={{ a: LinkRenderer}}>
            {`Like & retweet [**this tweet**](<${data?.url}>)`}
          </ReactMarkdown>
        </Flex>
      </div>
    );
  }

  return null;
};

export default FeatureTaskItem;