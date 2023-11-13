import {EventType, IEvent, IEventPayload} from "../types";


class AnalysisService {
  async sendEvent(type: EventType, payload: IEventPayload) {
    const obj: IEvent = {
      type,
      payload,
      timestamp: new Date()
    }

     await fetch('/api/sendEvent', {
      method: "POST",
      body: JSON.stringify(obj)
    })
  }
}

export const analysisService = new AnalysisService();
