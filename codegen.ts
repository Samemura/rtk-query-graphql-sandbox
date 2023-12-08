import type { CodegenConfig } from '@graphql-codegen/cli'

const config: CodegenConfig = {
  schema: 'https://beta.pokeapi.co/graphql/v1beta',
  // schema: 'MY_SCHEMA_PATH',
  documents: './src/**/*.graphql',
  generates: {
    './src/app/api/generated.ts': {
      plugins: [
        'typescript',
        'typescript-operations',
        {
          'typescript-rtk-query': {
            importBaseApiFrom: './baseApi',
            exportHooks: true
          }
        }
      ]
    }
  }
}
export default config
