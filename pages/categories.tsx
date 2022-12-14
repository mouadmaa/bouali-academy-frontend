import { GetStaticProps, NextPage } from 'next'
import { Fragment } from 'react'
import CategoryCard from '../components/category/category-card'
import Breadcrumb from '../layouts/breadcrumb'
import { CategoriesDocument, useCategoriesQuery } from '../graphql/generated/schema'
import { addApolloState, initializeApollo } from '../lib/apolloClient'
import Image from 'next/image'

const Categories: NextPage = () => {
  const { data } = useCategoriesQuery()

  const categories = data?.categories?.data

  return (
    <Fragment>
      <Breadcrumb title='Categories' />
      <section className='category__area pt-120 pb-70'>
        <div className='container'>
          <div className='section__title-wrapper mb-45'>
            <h2 className='section__title'>
              Explore Our{' '}
              <span className='yellow-bg'>
                Popular
                <Image
                  src='/img/shape/yellow-bg-2.png'
                  alt='yellow bg shape'
                  width={150}
                  height={16}
                />{' '}
              </span>
              Courses
            </h2>
          </div>
          <div className='row'>
            {categories?.map((category) => (
              <CategoryCard
                key={category.id}
                categoryId={category.id as string}
                category={category.attributes as any}
              />
            ))}
          </div>
        </div>
      </section>
    </Fragment>
  )
}

export default Categories

export const getStaticProps: GetStaticProps = async () => {
  const apolloClient = initializeApollo()

  await apolloClient.query({
    query: CategoriesDocument,
  })

  return addApolloState(apolloClient, {
    props: {},
    revalidate: 60,
  })
}
