import { NgModule } from '@angular/core';
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';

const config: SocketIoConfig = { url: 'http://s5294121.elf.ict.griffith.edu.au:8888', options: {} };

@NgModule({
  imports: [SocketIoModule.forRoot(config)],
  exports: [SocketIoModule]
})
export class SocketIoConfigModule {}
