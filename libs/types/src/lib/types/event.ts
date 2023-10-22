import { NotificationData } from './notification';

export type MessageBody = {
  action: 'SEND_NOTIFICATION';
  body: NotificationData;
};

export const ScheduleType = {
  SCHEDULE_ONE: 'SCHEDULE_ONE',
} as const;

export type ScheduleType = typeof ScheduleType[keyof typeof ScheduleType];
