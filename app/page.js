import Head from 'next/head';

export default function Home() {
  return (
    <>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" />
      <link href="https://fonts.googleapis.com/css2?family=Dancing+Script:wght@600&display=swap" rel="stylesheet" />
      <main className="flex min-h-screen flex-col items-center">
        <div className="z-10 max-w-5xl w-full items-center  font-mono text-sm lg:flex" style={{height : '35vh'}}>
          {/* for the centering */}
        </div>

        <div className="relative flex place-items-center">
          <p2 style={{fontSize : '4rem'}}> Class Grove </p2>
        </div>

        <div className="mb- grid text-center lg:max-w-5xl lg:w-full lg:mb-0 lg:grid-cols-2 lg:text-center justify-between p-28">
          <a
            href="/login"
            className="group rounded-lg border border-transparent px-5 py-4 hover:bg-white transition-colors duration-300 ease-in-out  "
            target="_blank"
            rel="noopener noreferrer"
          >
            <h2 className={`mb-3 text-2xl font-neutral`}>
              Login{' '}
            </h2>
            <p className={`m-0 max-w-[100ch] text-sm opacity-50 sm:text-center text-center`}>
              Login to access the forum page and chat with others!
            </p>
          </a>

          <a
            href="/signup"
            className="group rounded-lg border border-transparent px-5 py-4 hover:bg-white transition-colors duration-300 ease-in-out  "
            target="_blank"
            rel="noopener noreferrer"
          >
            <h2 className={`mb-3 text-2xl font-neutral`}>
              Signup{' '}
            </h2>
            <p className={`m-0 max-w-[100ch] text-sm opacity-50 sm:text-center text-center`}>
              Sign up to start experiencing the future!
            </p>
          </a>
        </div>
        <div className="relative flex place-items-center justify-between p-10 ">
          <p className='font-neutral opacity-30'> By Pablo, Akshit, and Nicholas</p>
        </div>
      </main>
    </>
  )
}