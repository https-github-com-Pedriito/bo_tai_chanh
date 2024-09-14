/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brightColor: "#3F8B33",       // Couleur personnalisée vert brillant
        backgroundColor: "#195612",   // Couleur de fond personnalisée vert foncé
        lightText:"#959595",  
        greenlight:"#698061",
        greendark: "#5B7559",
        whitespecial:"#EDEBE4",
        greyspecial:"#222524"  ,
        greenspecial:"#87FE25"   // Couleur de texte personnalisée gris clair
      },
      keyframes: {
        shake: {
          '0%, 100%': { transform: 'translateX(0)' },
          '10%, 30%, 50%, 70%, 90%': { transform: 'translateX(-5px)' },
          '20%, 40%, 60%, 80%': { transform: 'translateX(5px)' },
        },
      },
      boxShadow: {
        neumorphic: '8px 8px 16px rgba(0, 0, 0, 0.2), -2px -2px 16px rgba(255, 255, 255, 0.9)',
        neumorphicInset: 'inset 8px 8px 16px rgba(0, 0, 0, 0.3), inset -8px -8px 16px rgba(255, 255, 255, 0.6)',
      }  
    },
  },
  plugins: [],
};