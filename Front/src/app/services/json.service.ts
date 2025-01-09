import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class JsonService {
  formatBodyAsJson(body: string): string {
    try {
      return JSON.stringify(JSON.parse(body), null, 2);
    } catch (e) {
      console.error('Invalid JSON body:', e);
      // Attempt to fix common issues
      try {
        // Replace single quotes with double quotes
        body = body.replace(/'/g, '"');
        // Add missing brackets
        if (!body.startsWith('{')) body = '{' + body;
        if (!body.endsWith('}')) body = body + '}';
        // Parse and stringify again
        const fixedBody = JSON.parse(body);
        return JSON.stringify(fixedBody, null, 2);
      } catch (e) {
        console.error('Unable to fix JSON body:', e);
        return body;
      }
    }
  }


  isJsonFormatted(body: string): boolean {
    try {
      JSON.parse(body);
      return true;
    } catch (e) {
      return false;
    }
  }
}
