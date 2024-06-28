import { z } from 'zod'

import { Trpc } from '@/core/trpc/server'
import { TRPCError } from '@trpc/server'
import { ReadStream } from 'fs'
import { OpenaiService } from '../libraries/openai'

/**
 * @provider AiApi
 * @description An AI library to query OpenAI
 * @function {(options: {prompt: string}) => Promise<string>} generateText - Send the prompt to OpenAI and get back its answer
 * @function {(options: {prompt: string}) => Promise<string>} generateImage - Send the prompt to OpenAI to generate an Image and get back the URL of the image in the answer
 * @function {(options: {readStream: ReadStream}) => Promise<string>} audioToText - Send the readStream of an audio file to OpenAI to transcribe it into text and get back the text in the answer
 * @function {(options: {prompt: string} => Promise<{url: string}>} textToAudio - Send the text to OpenAI to convert it into an mp3 file and get back the url of the audio file
 * @usage `  const {mutateAsync: generateText} = api.ai.generateText.useMutation();  await generateText({prompt}) ; `
 * @isImportOverriden false
 * @import import { api } from '@/core/trpc'
 */

const check = () => {
  if (!OpenaiService.isActive()) {
    throw new TRPCError({
      code: 'INTERNAL_SERVER_ERROR',
      message: 'Set OPENAI_API_KEY in your .env to activate OpenAI',
    })
  }
}

export const AiRouter = Trpc.createRouter({
  generateText: Trpc.procedure
    .input(z.object({ prompt: z.string() }))
    .mutation(async ({ ctx, input }) => {
      check()

      const content = await OpenaiService.generateText(input.prompt)

      return content
    }),

  generateImage: Trpc.procedure
    .input(z.object({ prompt: z.string() }))
    .mutation(async ({ ctx, input }) => {
      check()

      const imageUrl = await OpenaiService.generateImage(input.prompt)
      return imageUrl
    }),

  audioToText: Trpc.procedure
    .input(z.object({ readStream: z.instanceof(ReadStream) }))
    .mutation(async ({ ctx, input }) => {
      check()

      const transcription = await OpenaiService.fromAudioToText(
        input.readStream,
      )
      return transcription
    }),

  textToAudio: Trpc.procedure
    .input(z.object({ text: z.string() }))
    .mutation(async ({ ctx, input }) => {
      check()

      const buffer = await OpenaiService.fromTextToAudio(input.text)
      return buffer
    }),
})
