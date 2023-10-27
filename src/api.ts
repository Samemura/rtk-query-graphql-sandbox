import { createApi } from '@reduxjs/toolkit/query/react'
import { request, gql, ClientError } from 'graphql-request'

const graphqlBaseQuery =
  ({ baseUrl }: { baseUrl: string }) =>
  async ({ body }: { body: string }) => {
    try {
      const result = await request(baseUrl, body)
      return { data: result }
    } catch (error) {
      if (error instanceof ClientError) {
        return { error: { status: error.response.status, data: error } }
      }
      return { error: { status: 500, data: error } }
    }
  }

export const pokemonApi = createApi({
  baseQuery: graphqlBaseQuery({
    baseUrl: 'https://beta.pokeapi.co/graphql/v1beta',
  }),
  endpoints: (builder) => ({
    getPokemons: builder.query<string, void>({
      query: () => ({
        body: gql`
            query samplePokeAPIquery {
                pokemon_v2_item(limit: 10) {
                    name
                    cost
                }
                pokemon_v2_pokemon(limit: 10) {
                    name
                    height
                }
            }
        `,
      }),
      // transformResponse: (response) => response,
    }),
  }),
})
export const { useGetPokemonsQuery } = pokemonApi
