import { useApi } from '@/services/axios';
import Head from 'next/head';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

export default function Home() {
  const router = useRouter();
  const api = useApi();

  function handleSubmit(e: React.FormEvent<HTMLElement>) {
    e.preventDefault();
    router.push("/Dashboard")
  }

  useEffect(()=>{
    async function call(){
      const response = await api.hello();

      alert(response);
    }

    call();
  }, [])

  return (
    <div className="h-screen bg-blue-100 flex">
      <Head>
        <title>Managerr</title>
      </Head>


      <img src="image.svg" alt='office' className='hidden sm:block w-2/4 h-full pointer-events-none' />

      <div className=" flex flex-col h-full flex flex-col w-full sm:w-3/5 items-center justify-center px-10">
        <form onSubmit={handleSubmit} className="gap-5  w-full flex flex-col p-2 items-center max-w-md h-3/5 justify-around mb-2">
          <div className="">
            <p className="text-4xl text-blue-700 font-medium font-serif">Managerr</p>
          </div>
          <div className="flex flex-col w-full">
            <input
              className="mb-2 p-2 border-2 border-slate-300"
              type="email"
              placeholder="Email address"
            />
            <input
              className="mb-2 p-2 border-2 border-slate-300"
              type="password"
              placeholder="Password"
            />

            <div className="inline px-2 justify-between items-center sm:flex">
              <div className="flex items-center">
                <input
                  className="border-1 border-slate-600 text-red-500 mr-2"
                  type="checkbox"
                />
                <p className="">Remember me</p>
              </div>
              <a href="" className="text-blue-500 hover:text-blue-400">
                Forgot Password?
              </a>
            </div>
          </div>

          <button type='submit' className="bg-blue-700 rounded-md w-full text-blue-100 text-lg font-bold hover:bg-blue-600 h-12">
            <p className="active:text-base">Login</p>
          </button>

          <div className="">
            <p className="">
              Don't have an account?{' '}
              <a
                href=""
                className="text-blue-500 font-medium hover:text-blue-400"
              >
                Sign Up
              </a>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}