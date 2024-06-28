import { Configuration } from '@/core/configuration'
import { FileHelper } from '@/core/helpers/file'
import {
  FromPrivateToPublicUrlOptions,
  UploadPrivateOptions,
  UploadPrivateReturn,
  UploadProvider,
  UploadPublicOptions,
  UploadPublicReturn,
} from '../../../upload.provider'

export class UploadProviderLocal extends UploadProvider {
  static path = '/api-static'

  static setup() {
    // return ServeStaticModule.forRoot({
    //   rootPath: join(FileHelper.getRoot(), `.${this.path}`),
    //   serveRoot: this.path,
    // })
  }

  private staticServerUrl: string

  private pathPublic = `.${UploadProviderLocal.path}/public`
  private pathPrivate = `.${UploadProviderLocal.path}/private`

  public initialise(): Promise<void> {
    try {
      FileHelper.writeFolder(this.pathPublic)

      this.staticServerUrl = `${Configuration.getBaseUrl()}`

      console.log(`Upload Local is active`)
    } catch (error) {
      console.error(`Upload Local failed to start: ${error.message}`)
    }

    return
  }

  async uploadPublic({
    file,
  }: UploadPublicOptions): Promise<UploadPublicReturn> {
    const arrayBuffer = await file.arrayBuffer()
    const content = Buffer.from(arrayBuffer)

    const filename = this.ensureFilename(file.name)

    const path = FileHelper.joinPaths(this.pathPublic, filename)

    FileHelper.writeFile(path, content)

    const url = `${this.staticServerUrl}/${path}`

    return { url }
  }

  async uploadPrivate({
    file,
  }: UploadPrivateOptions): Promise<UploadPrivateReturn> {
    const arrayBuffer = await file.arrayBuffer()
    const content = Buffer.from(arrayBuffer)

    const filename = this.ensureFilename(file.name)

    const path = FileHelper.joinPaths(this.pathPrivate, filename)

    FileHelper.writeFile(path, content)

    const url = `${this.staticServerUrl}/${path}`

    return { url }
  }

  async fromPrivateToPublicUrl({
    url,
  }: FromPrivateToPublicUrlOptions): Promise<UploadPrivateReturn> {
    return { url }
  }
}
