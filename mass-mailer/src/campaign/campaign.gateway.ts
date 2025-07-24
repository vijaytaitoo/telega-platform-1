import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  MessageBody,
  ConnectedSocket,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

export enum CampaignEventsEnum {
  PROGRESS = 'campaign-progress',
  COMPLETED = 'campaign-completed',
  ABORTED = 'campaign-aborted',
  ERROR = 'campaign-error',
}

@WebSocketGateway({ cors: { origin: '*', methods: ['GET', 'POST'] } })
export class CampaignGateway {
  @WebSocketServer()
  server: Server;

  @SubscribeMessage('join-campaign')
  handleJoinCampaign(@MessageBody() campaignId: string, @ConnectedSocket() socket: Socket) {
    socket.join(campaignId);
  }

  sendProgress(campaignId: string, payload: any) {
    this.server.to(campaignId).emit(CampaignEventsEnum.PROGRESS, payload);
  }

  sendCompleted(campaignId: string, payload: any) {
    this.server.to(campaignId).emit(CampaignEventsEnum.COMPLETED, payload);
  }

  sendAborted(campaignId: string, payload: any) {
    this.server.to(campaignId).emit(CampaignEventsEnum.ABORTED, payload);
  }

  sendError(campaignId: string, payload: any) {
    this.server.to(campaignId).emit(CampaignEventsEnum.ERROR, payload);
  }
} 