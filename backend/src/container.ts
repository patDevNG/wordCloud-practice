import {  Container  }  from   "inversify" ;
import { WordCloudService } from "./services.js";
export   const  container   =   new   Container ({
    defaultScope :   "Singleton" ,
} ) ;
container.bind( "IWordCloudService" ).to(WordCloudService) ;