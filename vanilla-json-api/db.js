const moment = require('moment');
const Faker = require('faker');

module.exports = () => {
  const data = {
    date: [
      {
        pageCreated: moment().format('MMMM Do YYYY, h:mm:ss a')
      }
    ],
    posts: [
      {
        id: 1,
        state: 'active',
        title: Faker.lorem.words(),
        description: Faker.lorem.paragraphs(),
        image: Faker.image.imageUrl()
      },
      {
        id: 2,
        state: 'draft',
        title: Faker.lorem.words(),
        description: Faker.lorem.paragraphs(),
        image: null
      },
      {
        id: 3,
        state: 'draft',
        title: Faker.lorem.words(),
        description: Faker.lorem.paragraphs(),
        image: null
      },
      {
        id: 4,
        state: 'draft',
        title: Faker.lorem.words(),
        description: Faker.lorem.paragraphs(),
        image: null
      },
      {
        id: 5,
        state: 'archived',
        title: Faker.lorem.words(),
        description: Faker.lorem.paragraphs(),
        image: Faker.image.imageUrl()
      },
      {
        id: 6,
        state: 'archived',
        title: Faker.lorem.words(),
        description: Faker.lorem.paragraphs(),
        image: Faker.image.imageUrl()
      },
      {
        id: 123,
        state: 'archived',
        title: Faker.lorem.words(),
        description: Faker.lorem.paragraphs(),
        image: Faker.image.imageUrl()
      }
    ]
  };
  return data;
};
