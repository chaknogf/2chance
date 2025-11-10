import { HostListener } from '@angular/core';

const hostname = window.location.hostname.split(':')[0];
const ip0 = 'http://' + hostname + ':8000';
// const ip0 = 'http://200.12.44.174:8000';

export const environment = {
  production: true,
  apiUrl: ip0
};


