export default function BackgroundPattern() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden opacity-[0.03] -z-0">
      {/* Motifs floraux répétés en arrière-plan */}
      <div className="absolute inset-0" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='120' height='120' xmlns='http://www.w3.org/2000/svg'%3E%3Cg opacity='0.4'%3E%3Cpath d='M60 25c-4 0-8 4-8 8s4 8 8 8 8-4 8-8-4-8-8-8zm0 12c-2 0-4-2-4-4s2-4 4-4 4 2 4 4-2 4-4 4z' fill='%236b1a2a'/%3E%3Cpath d='M25 60c-4 0-8 4-8 8s4 8 8 8 8-4 8-8-4-8-8-8zm0 12c-2 0-4-2-4-4s2-4 4-4 4 2 4 4-2 4-4 4z' fill='%23a55d6f'/%3E%3Cpath d='M95 60c-4 0-8 4-8 8s4 8 8 8 8-4 8-8-4-8-8-8zm0 12c-2 0-4-2-4-4s2-4 4-4 4 2 4 4-2 4-4 4z' fill='%236b1a2a'/%3E%3Cpath d='M60 95c-4 0-8 4-8 8s4 8 8 8 8-4 8-8-4-8-8-8zm0 12c-2 0-4-2-4-4s2-4 4-4 4 2 4 4-2 4-4 4z' fill='%23a55d6f'/%3E%3C/g%3E%3C/svg%3E")`,
        backgroundRepeat: 'repeat',
        backgroundSize: '250px 250px',
      }}></div>
    </div>
  )
}

