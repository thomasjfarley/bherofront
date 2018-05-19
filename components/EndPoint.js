import ApolloClient from "apollo-boost"

const client = new ApolloClient({ uri: "https://us1.prisma.sh/thomasjfarley-26b5ac/example/dev" })

export { client }