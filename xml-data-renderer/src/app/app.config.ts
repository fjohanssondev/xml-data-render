import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core'
import { provideHttpClient, withFetch } from '@angular/common/http'
import { provideRouter } from '@angular/router'
import { LucideAngularModule, FolderOpen, FolderClosed, File, CloudUpload, Save, Link, Link2 } from 'lucide-angular'

import { routes } from './app.routes'
import { provideQuillConfig } from 'ngx-quill'

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(
      withFetch()
    ),
    importProvidersFrom(LucideAngularModule.pick({ FolderOpen, FolderClosed, File, CloudUpload, Save, Link, Link2 })),
    provideQuillConfig({
      modules: {
        toolbar: {
          
        }
      }
    })
  ]
};
