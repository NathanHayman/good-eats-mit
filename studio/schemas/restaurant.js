export default {
    name: 'restaurant',
    title: 'Restaurant',
    type: 'document',
    fields: [
      {
        name: 'name',
        title: 'Restaurant Name',
        type: 'string',
        validation: (Rule) => Rule.required(),
      },

      {
        name: 'slug',
        title: 'Slug',
        type: 'slug',
        options: {
          source: 'name',
          maxLength: 96,
        },
        validation: (Rule) => Rule.required(),
      },
      {
        name: 'categories',
        title: 'Restaurant Categories',
        type: 'array',
        of: [{ type: 'string' }],
        options: {
            layout: 'tags',
        },
        layout: 'checkbox',
        validation: (Rule) => Rule.required(),
      },
      {
        name: 'products',
        title: 'Menu Items',
        type: 'array',
        of: [{ type: 'reference', to: [{ type: 'product' }] }]
      },
      {
        name: 'restaurantImage',
        title: 'Restaurant Image',
        type: 'image',
        options: {
          hotspot: true,
        },
      },
      {
        name: 'description',
        title: 'Description',
        type: 'text',
        validation: (Rule) => Rule.required(),
      },
      {
        // rating out of 5
        name: 'rating',
        title: 'Rating',
        type: 'number',
        validation: (Rule) => Rule.required(),
        options: {
          list: [
            { title: '1', value: 1 },
            { title: '2', value: 2 },
            { title: '3', value: 3 },
            { title: '4', value: 4 },
            { title: '5', value: 5 },
          ],
        },
      },
      {
        // total number of reviews
        name: 'reviewCount',
        title: 'Review Count',
        type: 'number',
        validation: (Rule) => Rule.required(),
      },
    ],
  }
  