import { HttpService } from '@nestjs/axios'

export class MiamService {
  constructor(private http: HttpService) {}

  public async get(): Promise<string> {
    const response = await this.http.axiosRef.get(
      'https://baconipsum.com/api/?type=meat-and-filler&sentences=1'
    )
    return response.data[0]
  }
}
