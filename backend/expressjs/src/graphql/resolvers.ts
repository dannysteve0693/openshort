const resolvers = {
    Query: {
      getUserUrls: async (_parent: any, _args: any, context: any) => {
        return context.prisma.url.findMany()
      },
      getUrlAnalytics: async (_parent: any, args: { shortCode: string }, context: any) => {
        return context.prisma.url.findUnique({
          where: { shortCode: args.shortCode },
          include: { analytics: true }
        })
      }
    },
  
    Mutation: {
      createUrl: async (_parent: any, args: any, context: any) => {
        const newUrl = await context.prisma.url.create({
          data: {
            originalUrl: args.originalUrl,
            shortCode: args.customCode || Math.random().toString(36).substr(2, 8)
          }
        })
        return newUrl
      }
    }
  }
  
export default resolvers