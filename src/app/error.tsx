"use client"

type Props = {
  error: Error & { digest?: string },
  reset: () => void,
}

export default function error({ error, reset }: Props) {
  console.log(error)
  return (
    <div>
      Oops, unhandled error
    </div>
  )
}