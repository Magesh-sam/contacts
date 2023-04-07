import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA, VitePWAOptions } from "vite-plugin-pwa";

const mainfestForPlugin: Partial<VitePWAOptions> = {
  registerType: 'prompt',
  includeAssets:['favicon.ico','apple-touch-icon.png','masked-icon.svg'],
  manifest:{
    name:'Contacts',
    short_name:'Contacts',
    description:'Manage your Contacts Easily!',
    icons:[
      {
        src:"/public/icons/icons8-contacts-192.png",
        sizes:'192x192',
        type:'image/png',
      },
      {
        src:'/public/icons/icons8-contacts-512.png',
        sizes:'512x512',
        type:'image/png',
      },
      {
        src:'/public/icons/icons8-contacts-180.png',
        sizes:'180x180',
        type:'image/png',
        purpose:'apple touch icon',
      },
      {
        src:'/public/icons/icons8-contacts-256.png',
        sizes:'256x256',
        type:'image/png',
        purpose:'any maskable'
      },
    ],
    theme_color:'#0f0f0f',
    background_color:'#f0f0f0',
    display:'standalone',
    scope:'/',
    start_url:'/',
    orientation:'portrait',
  }
}


// https://vitejs.dev/config/
export default defineConfig({
  base:'./',
  plugins: [react(), VitePWA(mainfestForPlugin)],
})
