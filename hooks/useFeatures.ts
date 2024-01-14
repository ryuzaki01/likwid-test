import {useAccount} from "wagmi";
import useSWR from "swr";

export default function useFeatures() {
  const { address: accountAddress } = useAccount()

  const { data, mutate, isLoading } = useSWR(
    `/api/feature?wallet=${accountAddress}`,
    (url: string) => {
      return fetch(url).then((response) => response.json())
    },
    {
      revalidateOnFocus: true,
      revalidateIfStale: true,
      revalidateOnReconnect: true,
      refreshInterval: 3_000
    }
  )

  return {
    data: data?.message ? [] : data,
    mutate,
    isLoading
  };
}
