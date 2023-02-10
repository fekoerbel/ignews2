import { SubscribeButton } from '@/components/SubscribeButton'
import Head from 'next/head'
import styles from './home.module.scss'
import { GetServerSideProps, GetStaticProps } from 'next'
import { stripe } from '@/services/stripe'

interface HomeProps {
  product: {
    priceId: string;
    amount: number;
  }
}

export default function Home({ product }: HomeProps) {

  return (
    <>
    <Head>
    <title>Home | ig.news</title>
  </Head>
    <main className={styles.contentContainer}>
      <section className={styles.hero}>
        <span>👏 Hey, welcome</span>
        <h1>News abaout the <span>React</span> world.</h1>
        <p>
          Get access to al the publications <br />
          <span>for {product.amount} month</span>
        </p>
        <SubscribeButton priceId={product.priceId} />
      </section>

      <img src="/images/avatar.svg" alt="Girl coding" />
    </main>
    </>
  )
}

// CASO FOSSE USAR SERVERSIDE RENDER
// export const getServerSideProps: GetServerSideProps = async () => { // sempre async quando usa o get serverside props
//   const price = await stripe.prices.retrieve('price_1MZGHqJV0wQKD1PewW4YlxwH', {
//     expand: ['product'] // PEGA TODAS AS INFOS DO PRODUTO COMO NOME, ETC
//   })

//   const product = {
//     priceId: price.id,
//     amount: new Intl.NumberFormat('en-US', {
//       style: 'currency',
//       currency: 'USD',
//     }).format(price.unit_amount / 100),
//   }

//   return {
//     props : {
//       product
//     }
//   }
// }

// PARA EVITAR Q SEMPRE QUE UMA PESSOA CARREGAR A PÁGINA REALIZAR UMA CHAMADA AIP, EXISTE ESTÁ OUTRA PROPRIEDADE DO NEXT QUE CRIA UMA PÁGINA HTML ESTÁTICA COM OS DADOS DA API. USADA PARA RENDERIZAR PÁGINAS Q SEJAM IGUAIS PARA TODOS QUE ACESSAREM A PÁGINA
export const getStaticProps: GetStaticProps = async () => {
  const price = await stripe.prices.retrieve('price_1MZGHqJV0wQKD1PewW4YlxwH')
  const product = {
    priceId: price.id,
    amount: new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(price.unit_amount! / 100),
  }

  return {
    props : {
      product,
    },
    revalidate: 60 * 60 * 24 // 24 horas
  }
}