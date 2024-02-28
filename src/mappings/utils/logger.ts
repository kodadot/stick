import { serializer } from '@kodadot1/metasquid'
import { logger } from '@kodadot1/metasquid/logger'
import { Interaction } from '../../model'

type Action = Interaction

type ErrorCallback = (error: Error) => void

export const logError = (e: Error | unknown, cb: ErrorCallback) => {
  if (e instanceof Error) {
    cb(e)
  }
}

/**
 * Log a successful action
 * @param action - the action being performed
 * @param message - the message to log
**/
export const success = (action: Action, message: string) => {
  logger.info(`💚 [${action}] ${message}`)
}

export const error = (e: Error | unknown, action: Action, message: string) => {
  logError(e, (e) => logger.error(`💔 [${action}] ${e.message} ${message}`))
}

/**
 * Log a started action
 * @param action - the action being performed
 * @param message - the message to log
**/
export const pending = (action: Action, message: string) => {
  logger.info(`⏳ [${action}] ${message}`)
}

/**
 * Log a debug message
 * @param action - the action being performed
 * @param message - the message to log
 * @param serialize - whether to serialize the message
 * @example
 * ```ts
 * debug('action', { key: 'value' }, true)
 * ```
**/
export const debug = (action: Action, message: Record<any, any>, serialize?: boolean) => {
  logger.debug(`[${action}] ${JSON.stringify(message, serialize ? serializer : undefined, 2)}`)
}

/**
 * Log a warning message
 * @param action - the action being performed
 * @param message - the message to log
**/
export const warn = (action: Action, message: string) => {
  logger.warn(`⚠️ [${action}] ${message}`)
}

export { logger as default } from '@kodadot1/metasquid/logger'
