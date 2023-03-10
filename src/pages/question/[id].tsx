import { useRouter } from "next/router";
import Head from "next/head";
import {api} from "../../utils/api";
import { useSession } from "next-auth/react";
import { spawn } from "child_process";

export default function Question() {
  const { data: sessionData } = useSession();
  const router = useRouter();
  const question = api.question.getById.useQuery({id: router.query.id as string});
  return (
    <>
      <Head>
        <title>Polly</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c]">
        <div className="text-2xl text-white">
          <p>the id of this page is: { sessionData && <span>{question.data?.id}</span>}</p>
          <p>the question is: {sessionData && <span>{question.data?.question}</span>}</p>
        </div>
        <div>
        </div>
      </main>
    </>
  )
}
