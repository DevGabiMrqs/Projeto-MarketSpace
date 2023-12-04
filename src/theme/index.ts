import { extendTheme } from "native-base";

export const THEME = extendTheme({

    colors: {
        blue: {
            100:'#364d9d',
            200:'#647ac7',
    },  
        red: {
            100: '#ee7979'
    },  
        gray: {
            100: '#1a181b',
            200: '#3e3a40',
            300: '#5f5b62',
            400: '#9f9ba1',
            500: '#d9d8da',
            600: '#edecee',
            700: '#f7f7f8',
        } 
    },

    fonts: {
        heading: 'Karla_700Bold',
        body: 'Karla_400Regular',
    },

    fontSize: {
        xs: 12,
        sm: 14,
        md: 16,
        lg: 20,
        xl: 24,
    },
    components: {
        Text: {
          baseStyle: {
            color: '#1a181b', // Substitua pelo tom de cinza desejado
          },
        }
    }
})