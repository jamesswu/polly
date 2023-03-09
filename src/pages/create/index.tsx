import React from "react"
import Head from "next/head"
import Link from "next/link";
import { useSession } from "next-auth/react"
import { type NextPage } from "next";
import { useForm } from "react-hook-form";
import { api } from "../../utils/api";
import { useRouter } from "next/router";
import { z } from "zod";

const createQuestionValidator = z.object({
  question: z.string().min(5).max(600),
  options: z
    .array(z.object({ text: z.string().min(1).max(200) }))
    .min(2)
    .max(20),
});
type CreateQuestionInputType = z.infer<typeof createQuestionValidator>;

const CreateQuestion = () => {
  const {data: sessionData} = useSession();
  const router = useRouter();
  const { register, handleSubmit, watch, formState: { errors } } = useForm<CreateQuestionInputTyper>({
    resolver:
  });

  const {mutate, data, isLoading} = api.question.create.useMutation({
    onSuccess: async (data) => {
      await router.push(`/question/${data.id}`);
    },
  })

  if (isLoading || data ) {
    return (
      <div className="antialiased min-h-screen flex items-center justify-center">>
        <p className="text-white/40">loading</p>
      </div>
    )
  }
  return (
    <>
      <Head>
        <title>Polly</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c]">
      <header>
        <h1>
          <Link href="/">Polly</Link>
        </h1>
      </header>
        <div className="text-2xl text-white">
          <h2>create a poll</h2>
          <form onSubmit={handleSubmit((data) => {
            mutate(data);
          })}>
            <label >Enter Question</label>
            <input
              {...register("question")}
              type="text"/>
          </form>
          form
        </div>
      </main>
    </>
  )
}

const Create: NextPage= () => {
  return <CreateQuestion />
}

export default Create;