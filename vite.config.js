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
        doctora: resolve(__dirname, 'la-doctora.html'),
        contacto: resolve(__dirname, 'contacto.html'),
        testimonios: resolve(__dirname, 'testimonios.html'),
        internacionales: resolve(__dirname, 'pacientes-internacionales.html'),
        consulta: resolve(__dirname, 'primera-consulta.html'),
        casosclinicos: resolve(__dirname, 'casos-clinicos.html'),
        // English pages
        en_main: resolve(__dirname, 'en/index.html'),
        en_servicios: resolve(__dirname, 'en/servicios.html'),
        en_doctor: resolve(__dirname, 'en/el-doctor.html'),
        en_doctora: resolve(__dirname, 'en/la-doctora.html'),
        en_contacto: resolve(__dirname, 'en/contacto.html'),
        en_testimonios: resolve(__dirname, 'en/testimonios.html'),
        en_internacionales: resolve(__dirname, 'en/pacientes-internacionales.html'),
        en_consulta: resolve(__dirname, 'en/primera-consulta.html'),
        en_casosclinicos: resolve(__dirname, 'en/casos-clinicos.html'),
      },
    },
  },
})
