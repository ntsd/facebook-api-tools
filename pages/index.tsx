import { useSession } from "next-auth/react"

export default function Home() {
  const { data: session } = useSession()

  return (
    <div className="flex items-center justify-center flex-col h-full">
      <h1>
        Welcome&nbsp;<span className="font-bold">{session?.user?.name}</span>
      </h1>
      <h2 className="mt-4">Facebook Tools are ready to use</h2>
    </div>
  )
}
