export default {
    title: 'User',
    name: 'user',
    type: 'document',
    fields: [
        {
            title: 'Username',
            name: 'username',
            type: 'string',
        },
        {
            title: 'Firstname',
            name: 'firstname',
            type: 'string',
        },
        {
            title: 'Lastname',
            name: 'lastname',
            type: 'string',
        },
        {
            title: 'Email',
            name: 'email',
            type: 'string',
        },
        {
            title: 'Image',
            name: 'image',
            type: 'string',
        },
        {
            title: 'Following',
            name: 'following',
            type: 'array',
            of: [
                {
                    type: 'reference',
                    to: [{ type: 'user' }]
                }
            ],
            Validition: (Rule) => Rule.unique(),
        },
        {
            title: 'Followers',
            name: 'followers',
            type: 'array',
            of: [
                {
                    type: 'reference',
                    to: [{ type: 'user' }]
                }
            ],
            Validition: (Rule) => Rule.unique(), //중복 x
        },
        {
            title: 'Bookmarks',
            name: 'bookmarks',
            type: 'array',
            of: [
                {
                    type: 'reference',
                    to: [{ type: 'post' }]
                }
            ],
            validation: (Rule) => Rule.unique(), 
        }
    ],
    preview: {
        select: {
            title: 'firstname',
            subtitle: 'username',
        }
    }
}