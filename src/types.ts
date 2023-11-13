export interface IEventPayload {
  [key: string]: any;
}

export type EventType =
  | "route"
  | "viewCard"
  | "viewCardPromo"
  | "addToCart"
  | "purchase";

export interface IEvent {
  type: EventType;
  payload: IEventPayload;
  timestamp: Date;
}