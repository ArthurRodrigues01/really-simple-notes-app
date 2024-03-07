export class NotNoteFileError extends Error {
  private notNoteFileErrorName = 'notNote'

  protected super(message?: string) {
    this.message = message || 'Not a note backup file.'
  }
  public getErrorName() {
    return this.notNoteFileErrorName
  }
}

export function isNotNoteFileError(e: unknown) {
  if ((e as NotNoteFileError).getErrorName() == 'notNote') return true

  return false
}

export class TooLargeFileError extends Error {
  private tooLargeFileErrorName = 'tooLargeFile'

  protected super(message?: string) {
    this.message = message || 'File is too large.'
  }

  public getErrorName() {
    return this.tooLargeFileErrorName
  }
}

export function isTooLargeFileError(e: unknown) {
  if ((e as TooLargeFileError).getErrorName() == 'tooLargeFile') return true

  return false
}

export class NoNotesToExportError extends Error {
  private noNotesToExportErrorName = 'noNotesToExport'

  protected super(message?: string) {
    this.message = message || 'File is too large.'
  }

  public getErrorName() {
    return this.noNotesToExportErrorName
  }
}

export function isNoNotesToExportError(e: unknown) {
  if ((e as NoNotesToExportError).getErrorName() == 'noNotesToExport') return true

  return false
}