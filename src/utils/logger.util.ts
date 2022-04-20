import chalk from 'chalk'

/**
 * @description Success response ✔
 * @param {string} message - success message */
export const complete = (message: string) => {
    console.log(`${chalk.greenBright('✔ Success:')} ${message}`)
}

/**
 * @description Fail response ✖
 * @param {string} message - error message
 * @param {string} error - error trace message
 * @param {string} layer - layer abstraction */
export const fail = (message: string, error?: string, layer?: string) => {
    console.log(`${chalk.redBright('✖ Error:')} ${message}`)
    layer && info(layer)
    console.log(`${chalk.cyanBright('◌')} ${error}`)
}

/**
 * @description Info response ℹ
 * @param {string} message - info message */
export const info = (message: string) => {
    console.log(`${chalk.yellowBright('ℹ Info:')} ${message}`)
}
