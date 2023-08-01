import { Response, NextFunction, Request } from 'express';
import { controller, httpGet } from 'inversify-express-utils';
import { IWordCloudService } from './services.js'
import { inject } from 'inversify';

interface IController {
  healthCheck(req: Request, res: Response, next: NextFunction): Promise<void>;
  processFeeds(req: Request, res: Response, next: NextFunction): Promise<void>;
}

@controller('/api')
export class WordCloudController implements IController {
  private readonly wordCloudService: IWordCloudService;
  constructor(@inject('IWordCloudService') wordCloudService: IWordCloudService) {
    this.wordCloudService = wordCloudService;
  }
  @httpGet('/healthcheck')
  public async healthCheck(req: Request, res: Response ) {
    const result = await this.wordCloudService.healthCheck();
   res.status(200).send(result);
  }

  @httpGet('/process-feeds')
  public async processFeeds(req: Request, res: Response, next: NextFunction): Promise<void> {
    const result = await this.wordCloudService.processFeeds();
    res.status(200).json({ data: result });
  }
}

