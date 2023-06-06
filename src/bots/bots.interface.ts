export interface BotInterface {
  hello(any): Promise<string> | string
}
