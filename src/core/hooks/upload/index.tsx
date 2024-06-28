import { useMutation } from '@tanstack/react-query'
import axios from 'axios'

/**
 * @provider UploadHooks
 * @description An Upload hooks to upload one file
 * @function {({options: {file: File}) => Promise<{url: string}>} upload - Hook to upload the File to the server and return the url of the uploaded file so you can then store it
 * @usage `const {mutateAsync: upload} = useUploadPublic(); await upload({file});`
 * @isImportOverriden false
 * @import import { useUploadPublic } from '@/core/hooks/upload'
 */

export const useUploadPrivate = () =>
  useMutation({
    mutationFn: async (options: { file: File }): Promise<{ url: string }> => {
      const response = await axios.post<{ url: string }>(
        '/api/upload/private',
        options,
      )
      return response.data
    },
  })

export const useUploadPublic = () =>
  useMutation({
    mutationFn: async (options: { file: File }): Promise<{ url: string }> => {
      const response = await axios.post<{ url: string }>(
        '/api/upload/public',
        options,
      )
      return response.data
    },
  })
