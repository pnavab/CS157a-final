import Head from 'next/head';

export default function Home() {
  return (
    <>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
      <link href="https://fonts.googleapis.com/css2?family=Dancing+Script:wght@600&display=swap" rel="stylesheet" />
      <main className="flex min-h-screen flex-col items-center">
      <div className="z-10 max-w-5xl w-full items-center  font-mono text-sm lg:flex" style={{height : '35vh'}}>
        <div className="fixed bottom-0 left-0 flex h-48 w-full items-end justify-center bg-gradient-to-t from-white via-white dark:from-black dark:via-black lg:static lg:h-auto lg:w-auto lg:bg-none">
          <a
            className="pointer-events-none flex place-items-center gap-2 p-8 lg:pointer-events-auto lg:p-0"
            href="https://vercel.com?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
          </a>
        </div>
      </div>

      <div className="relative flex place-items-center">
        <p2 style={{fontSize : '4rem'}}> Class Grove </p2>
      </div>

      <div className="mb- grid text-center lg:max-w-5xl lg:w-full lg:mb-0 lg:grid-cols-2 lg:text-center justify-between p-28">
        <a
          href=""
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
          href=""
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
        <p className='font-neutral opacity-30'> By Pablo And Akshit</p>
      </div>
    </main>
    </>
  )
}