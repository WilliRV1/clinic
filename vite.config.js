import { resolve } from 'path'
import { defineConfig } from 'vite'

export default defineConfig({
  // Añade esta sección para permitir el host de ngrok
  server: {
    allowedHosts: ['disbursable-discontentedly-kasey.ngrok-free.dev']
  },
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        servicios: resolve(__dirname, 'servicios.html'),
        doctor: resolve(__dirname, 'el-doctor.html'),
        contacto: resolve(__dirname, 'contacto.html'),
        testimonios: resolve(__dirname, 'testimonios.html'),
        internacionales: resolve(__dirname, 'pacientes-internacionales.html'),
        consulta: resolve(__dirname, 'primera-consulta.html'),
        casosclinicos: resolve(__dirname, 'casos-clinicos.html'),
      },
    },
  },
})
