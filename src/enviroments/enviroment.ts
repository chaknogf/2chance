import { HostListener } from '@angular/core';

const hostname = window.location.hostname.split(':')[0];
const ip0 = 'http://' + hostname + ':8000';
//const ip = 'http://192.168.0.200:8000';

export const environment = {
  production: true,
  apiUrl: ip0
};
