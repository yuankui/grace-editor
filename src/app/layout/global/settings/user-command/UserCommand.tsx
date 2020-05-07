export interface UserCommand {
    title: string,

    command: {
        type: string,
        config: any,
    },

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

export const UserCommandName = 'core.user-command';
export const UserCommandSettingKey = 'commands';