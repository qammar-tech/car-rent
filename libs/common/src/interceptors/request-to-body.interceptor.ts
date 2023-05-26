import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { get, set } from 'lodash';

@Injectable()
export class RequestToBodyInterceptor implements NestInterceptor {
  public requestAttributeName: string;
  public bodyAttributeName: string;

  constructor(requestAttributeName: string, bodyAttributeName: string) {
    this.requestAttributeName = requestAttributeName;
    this.bodyAttributeName = bodyAttributeName;
  }

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const requestAttributeValue = get(request, this.requestAttributeName);

    if (requestAttributeValue) {
      set(request.body, this.bodyAttributeName, requestAttributeValue);
    }

    return next.handle().pipe();
  }
}
