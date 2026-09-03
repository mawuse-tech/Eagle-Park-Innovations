import React from 'react'
import logo from '../assets/loggo.png'
import backgroundImage from '../assets/happy-farm.jpg'

const MaintenancePage = () => {
  return (
    <main className="relative min-h-screen w-full overflow-hidden bg-green-950 text-white">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${backgroundImage.src})` }}
      />
      <div className="absolute inset-0 bg-[#021210]/80" />
      <div className="absolute inset-0 bg-gradient-to-b from-green-950/30 via-transparent to-green-950/70" />

      <section className="relative z-10 flex min-h-screen items-center justify-center px-6 py-10 sm:px-8 md:px-12">
        <div className="mx-auto flex w-full max-w-3xl flex-col items-center text-center">
          <div className="mb-8 rounded-xl bg-white px-4 py-3 shadow-lg">
            <img
              src={logo.src}
              alt="Eagle Park Innovations logo"
              className="h-16 w-auto sm:h-20"
            />
          </div>

          <div className="mb-5 inline-flex items-center rounded-full bg-yellow-300 px-4 py-2 text-sm font-semibold text-green-950 shadow-md">
            We will be back shortly
          </div>

          <h1 className="mb-6 text-4xl font-bold leading-tight text-white sm:text-5xl md:text-6xl">
            Website Under Maintenance
          </h1>

          <p className="mx-auto max-w-2xl text-base leading-relaxed text-green-50 sm:text-lg md:text-xl">
            We&rsquo;re currently making improvements to provide you with a better
            experience. Our website will be back online shortly. Thank you for
            your patience and understanding.
          </p>
        </div>
      </section>
    </main>
  )
}

export default MaintenancePage
