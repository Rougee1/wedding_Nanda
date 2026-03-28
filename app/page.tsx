import { Suspense } from 'react'
import StoryInvitation from '@/components/StoryInvitation'

export default function Home() {
  return (
    <Suspense>
      <StoryInvitation />
    </Suspense>
  )
}
