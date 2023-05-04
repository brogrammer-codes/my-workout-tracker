import { ChakraProvider, extendTheme } from '@chakra-ui/react'
import '@/styles/globals.css'
import { Context } from "../context/context"
import Layout from '@/component/Layout'

export default function App({ Component, pageProps }) {
  const theme = extendTheme({
    colors: {
      facebook: {
        50: "#E8F4F9",
        100: "#D9DEE9",
        200: "#B7C2DA",
        300: "#6482C0",
        400: "#4267B2",
        500: "#385898",
        600: "#314E89",
        700: "#29487D",
        800: "#223B67",
        900: "#1E355B",
      },
      brand: {
        50: "#E2E2E2",
        100: "#5158BB",
        200: '#043565',
        500: '#223B67',
        800: "#1E355B",
        900: "#030508",
      },
      brandCard: {
        50: '#35823c',
        100: '#3e4a3d',
        200: '#a1afa0',
        300: '#0083b4',
        400: '#647899',
        500: '#008c8c',
      }
    },
  })

  return (
    <ChakraProvider theme={theme}>
      <Context>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </Context>
    </ChakraProvider>
  )
}
