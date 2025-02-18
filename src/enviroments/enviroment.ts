import { HostListener } from '@angular/core';

const hostname = window.location.hostname.split(':')[0];
const ip0 = 'http://' + hostname + ':8000';
// const ip0 = 'https://hgtecpan.duckdns.org/api';

export const environment = {
  production: true,
  apiUrl: ip0
};


