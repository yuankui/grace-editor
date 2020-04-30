export interface UserCommand {
    title: string,

    command: string,

    /**
     * 快捷键执行
     */
    hotkey?: string,

    /**
     * 定期执行
     */
    cron?: string,

    /**
     * 按钮执行
     */
    button?: boolean
}