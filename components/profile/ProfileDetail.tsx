import { useState, useEffect, FC, SyntheticEvent, useContext } from 'react'
import { useDropzone, FileError } from 'react-dropzone';
import { Text, Flex, Box, Input, Button, TextArea } from 'components/primitives'
import { StyledInput } from "components/primitives/Input";
import { ToastContext } from 'context/ToastContextProvider'
import {useDebounce, useMounted, useProfileCheck} from "hooks";
import {useAccount} from "wagmi";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faDiscord, faTwitter} from "@fortawesome/free-brands-svg-icons";
import {resizeImage} from "../../utils/image";

type Props = {
  profile: ReturnType<typeof useProfileCheck>["data"]
}

const Thumbs = ({ image } : { image: string }) => (
  <Box
    css={{
      height: '100%',
      boxSizing: 'border-box',
      position: 'relative'
    }}>
    <Flex
      css={{
        overflow: 'hidden',
        height: '100%',
      }}>
      <img
        src={image}
        style={{ display: 'block', width: '100%', height: '100%', objectFit: 'cover' }}
        onLoad={() => { URL.revokeObjectURL(image) }}/>
    </Flex>
  </Box>
);

const fileUpload = async (file: File) => {
  const formData = new FormData();
  formData.append('file', file, file.name);

  const base64Image = await resizeImage(file)

  await fetch(`/api/upload`, {
    method: 'POST',
    body: JSON.stringify({
      image: base64Image
    }),
    mode: 'no-cors'
  }).then(res => res.json())

  return base64Image
}

const ProfileDetail:FC<Props> = ({ profile }) => {
  const { addToast } = useContext(ToastContext)
  const [loading, setLoading] = useState(false);
  const { address } = useAccount()
  const mounted = useMounted()

  const [username, setUsername] = useState('')
  const [bio, setBio] = useState('')
  const [profileImage, setProfileImage] = useState<string | undefined>('')
  const [websiteLink, setWebsiteLink] = useState('')

  const debouncedUsername = useDebounce(username, 1000);
  const {data: existingProfile} = useProfileCheck(
    debouncedUsername
  )

  useEffect(() => {
    if (profile) {
      setUsername(profile.username as string)
      setBio(profile.bio || '')
      setProfileImage(profile.avatar || '')
      setWebsiteLink(profile.website || '')
    }
  }, [profile])

  const {
    getRootProps: getProfileImageRootProps,
    getInputProps: getProfileImageInputProps } = useDropzone({
      maxSize: 5000000,
      accept: {
        'image/*': []
      },
      onDrop: async (acceptedFiles, rejectedFiles) => {
        if (rejectedFiles.length > 0) {
          handleErrorDropImage(rejectedFiles)
        }

        if (acceptedFiles.length > 0) {
          const base64Image = await fileUpload(acceptedFiles[0]);

          setProfileImage(base64Image || '');
        }
      }
    }
  );

  const handleErrorDropImage = (rejectedFiles: any) => {
    rejectedFiles.forEach((file: any) => {
      file.errors.forEach((err: any) => {
        addToast?.({
          title: err.code,
          description: err.message
        })
      });
    });
  }

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await fetch(`/api/profile/update`, {
        method: 'POST',
        body: JSON.stringify({
          username,
          avatar: profileImage || null,
          website: websiteLink,
          bio: bio
        }),
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
      })
      addToast?.({
        title: 'Success',
        status: 'success',
        description: 'Profile details updated'
      })
    } catch (err: any) {
      addToast?.({
        title: 'ERROR',
        description: err.message
      })
    }

    setLoading(false)
  }

  if (!mounted) {
    return null;
  }
  
  return (
    <Box
      css={{
        width: '100%',
        '@md': {
          mx: 'auto',
          width: '60%'
        },
        '@lg': {
          mx: 'auto',
          width: '50%'
        }
      }}>
      <form onSubmit={handleSubmit} >
        <Box
          css={{
            marginBottom: 18
          }}>
          <Text style='h4'>
             Edit Profile
          </Text>
        </Box>
        <Box css={{ marginBottom: 32 }}>
          <Text style="h6" css={{ color: '$gray11' }}>Username</Text>
          <Box css={{ position: 'relative', width: '100%' }}>
            <StyledInput
              disabled={loading}
              value={username}
              pattern="^[a-z0-9_-]$"
              onChange={(e) => setUsername(e.target.value)}
              placeholder='Enter username'
              css={{
                marginTop: 6,
                width: '100%',
                border: '1px solid $gray8',
                borderRadius: 6,
                boxSizing: 'border-box'
              }}
            />
          </Box>
          {(existingProfile && existingProfile._id !== profile._id) && (
            <Text css={{ color: 'red' }}>Username unavailable</Text>
          )}
        </Box>
        <Box css={{ marginBottom: 32 }}>
          <Text style="h6" css={{ color: '$gray11' }}>Bio</Text>
          <TextArea
            disabled={loading}
            rows={5}
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            placeholder='Tell the world your story!'
            containerCss={{
              marginTop: 6,
              width: '100%',
              border: '1px solid $gray8',
              borderRadius: 6,
            }}
          />
        </Box>
        <Box css={{ marginBottom: 40 }}>
          <Flex direction='column'>
            <Text style="h6" css={{ color: '$gray11' }}>Profile Image</Text>
            <Text style='body2' css={{ color: '$gray11', marginBottom: 6 }}>
              Recommended 350px x 350px, Max size: 20MB
            </Text>
          </Flex>
          <Box css={{ position: 'relative', width: 160 }}>
            {!profileImage ? (
              <Box {...getProfileImageRootProps()}>
                <Input
                  disabled={loading}
                  {...getProfileImageInputProps()}
                  containerCss={{
                    marginTop: 6,
                    width: '100%',
                    border: '1px solid $gray8',
                    borderRadius: 6,
                    borderStyle: 'dashed',
                    height: 160,
                    cursor: 'pointer'
                  }}
                />
                <Flex
                  align='center'
                  css={{
                    color: '$gray10',
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translateX(-50%) translateY(-50%)',
                    height: '100%'
                  }}>
                  <Text css={{ cursor: 'pointer', fontSize: 10, textAlign: 'center', color: '$gray11' }}>
                    Drag 'n' drop some files here, or click to select
                  </Text>
                </Flex>
              </Box>
            ) : (
              <Box
                css={{
                  width: 160,
                  height: 160,
                  border: 'solid 1px $gray10',
                  borderStyle: 'dashed',
                  marginTop: 6,
                  borderRadius: 6
                }}>
                <Thumbs image={profileImage} />
                <Button
                  disabled={loading}
                  color='ghost'
                  size="none"
                  css={{ padding: 0, fontSize: 14 }}
                  onClick={() => setProfileImage(undefined)}>
                  Reset
                </Button>
              </Box>
            )}
          </Box>
        </Box>
        <Box css={{ marginBottom: 32 }}>
          <Text style="h6" css={{ color: '$gray11' }}>Links</Text>
          <Box css={{ position: 'relative', width: '100%' }}>
            <StyledInput
              value={websiteLink}
              disabled={loading}
              onChange={(e) => setWebsiteLink(e.target.value)}
              placeholder='https://yoursite.io'
              css={{
                marginTop: 6,
                width: '100%',
                border: '1px solid $gray8',
                borderRadius: 6,
                boxSizing: 'border-box'
              }}
            />
          </Box>
        </Box>
        <Box css={{ marginBottom: 32 }}>
          <Text style="h6" css={{ color: '$gray11' }}>Socials</Text>
          <Flex
            direction="column"
            css={{
              gap: 20,
              mt: '$3'
            }}
          >
            <Flex
              align="center"
              justify="between"
            >
              <Text>
                <FontAwesomeIcon icon={faTwitter} width={16} height={16} style={{ marginRight: 10, display: 'inline-block' }} />
                {`Twitter`}
              </Text>
              <Button as="a" color="secondary" href={`/api/social/twitter?wallet=${address}`} size="xs" css={{ justifyContent: 'center'}}>
                {!profile?.twitter_id ? 'Connect' : 'Re-Connect'}
              </Button>
            </Flex>
            <Flex
              align="center"
              justify="between"
            >
              <Text>
                <FontAwesomeIcon icon={faDiscord} width={30} height={30} style={{ marginRight: 10, display: 'inline-block' }} />
                {`Discord`}
              </Text>
              <Button as="a" color="secondary" href={`/api/social/discord?wallet=${address}`} size="xs">
                {!profile?.discord_id ? 'Connect' : 'Re-Connect'}
              </Button>
            </Flex>
          </Flex>
        </Box>
        <Button
          type="submit"
          disabled={loading}
          css={{
            marginBottom: 12,
            width: '100%',
            justifyContent: 'center'
          }}>
          Save
        </Button>
      </form>
    </Box>
  )
}

export default ProfileDetail