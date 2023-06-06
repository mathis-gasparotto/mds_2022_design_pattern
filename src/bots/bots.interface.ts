export interface BotInterface {
  hello(any): Promise<string>
  react(string): Promise<string>
}
