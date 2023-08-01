import { injectable } from 'inversify'
import { renderFile, getFeedData } from './util.js'

export interface IWordCloudService {
  healthCheck(): Promise<string>;
  processFeeds(): Promise<Record<string, number>>;
}

@injectable()
export class WordCloudService implements IWordCloudService {
  public async healthCheck(): Promise<string> {
    try {
      return await renderFile() 
    } catch (error) {
      throw new Error(`Error rendering file: ${error}`)
    }

  }
  public async processFeeds(): Promise<Record<string, number>> {
    try {
      return await getFeedData()
    } catch (error) {
      console.log(error)
      throw new Error(`Error processing feeds: ${error}`)
    }
  }
}