interface EventEmitterType {
  on: (event: string, callback: Function) => void
  emit: (event: string, data: any) => void
}

interface Events {
  [T: string]: any[]
}

export class EventEmitter implements EventEmitterType {
  events: Events = {}
  on (event: string, callback: Function): void {
    this.events[event] = this.events[event] || []
    this.events[event].push(callback)
  }
  emit (event: string, ...rest: any): void {
    if (!(event in this.events)) return
    this.events[event].forEach(cb => {
      cb(...rest)
    })
  }
}
