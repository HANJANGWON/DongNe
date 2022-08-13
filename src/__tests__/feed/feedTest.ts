import { MockContext, Context, createMockContext } from '../../context'
import * as feedResolver from '../../feed/createFeed/createFeed.resolvers'

const { default: { Mutation: { createFeed } } } = feedResolver

let mockCtx: MockContext
let ctx: Context

beforeEach(() => {
    mockCtx = createMockContext()
    ctx = mockCtx as unknown as Context
})

test('should create new feed ', async () => {
    const feed = {
        id: 1,
        title: "test",
        content: "test"
    }
    mockCtx.prisma.feed.create.mockResolvedValue(feed)

    await expect(createFeed(null, feed, ctx)).resolves.toEqual({
        ok: true
    })
})

// test('should update a users name ', async () => {
//     const user = {
//         id: 1,
//         name: 'Rich Haines',
//         email: 'hello@prisma.io',
//         acceptTermsAndConditions: true,
//     }
//     mockCtx.prisma.user.update.mockResolvedValue(user)

//     await expect(updateUsername(user, ctx)).resolves.toEqual({
//         id: 1,
//         name: 'Rich Haines',
//         email: 'hello@prisma.io',
//         acceptTermsAndConditions: true,
//     })
// })

// test('should fail if user does not accept terms', async () => {
//     const user = {
//         id: 1,
//         name: 'Rich Haines',
//         email: 'hello@prisma.io',
//         acceptTermsAndConditions: false,
//     }

//     mockCtx.prisma.user.create.mockRejectedValue(
//         new Error('User must accept terms!')
//     )

//     await expect(createUser(user, ctx)).resolves.toEqual(
//         new Error('User must accept terms!')
//     )
// })