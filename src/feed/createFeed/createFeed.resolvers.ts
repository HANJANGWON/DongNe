import { Context } from '../../context'

export default {
    Mutation: {
        createFeed: async (_, { title, content }: any, ctx: Context) => {
            try {
                await ctx.prisma.feed.create({
                    data: {
                        title,
                        content
                    }
                })
                return { ok: true }
            } catch (err) {
                return { ok: false, error: err }
            }
        }
    }
}