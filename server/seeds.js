Meteor.startup(function() {

  /**
   * clear testing data
   */
  ProductCategories.remove({});
  Products.remove({});
  Chats.remove({});
  Bookings.remove({});

  /**
   * testing data
   * @type {*[]}
   */
  var productCategories = [
    {
      imageName: 'music-01.jpg',
      name: 'Music',
      description: 'Description'
    },
    {
      imageName: 'food-01.jpg',
      name: 'Food',
      description: 'Description'
    },
    {
      imageName: 'sports-01.jpg',
      name: 'Sports',
      description: 'Description'
    },
    {
      imageName: 'language-01.jpg',
      name: 'Language',
      description: 'Description'
    }
  ];

  var users = [
    {
      emails: [{
        address: 'nick@exygen.io',
        verified: false,
        primary: true
      }],
      profile: {
        name: 'nickw'
      },
      services: {
        'meteor-developer': {
          id: '2jefqB8rsQ2q3TuRW',
          username: 'nickw',
          emails: [{
            address: 'nick@exygen.io',
            verified: false,
            primary: true
          }]
        }
      }
    }
  ];

  var products = [
    {
      description: 'https://respond.ly/',
      name: 'Respondly',
      price: 10,
      duration: 2,
      tagline: 'Simple Team Inbox for Email and Twitter',
      pictures: ['testing.jpg','testing.jpg']
    },
    {
      description: 'http://versoapp.com/',
      name: 'Verso',
      price: 10,
      duration: 2,
      tagline: 'Allows schools to analyze student progress and measure teacher performance.'
    },
    {
      description: 'https://beta.workpop.com/',
      name: 'Workpop',
      price: 10,
      duration: 2,
      tagline: 'Job marketplace that modernizes the process of hiring for hourly workers.'
    },
    {
      description: 'http://www.classcraft.com/',
      name: 'Classcraft',
      price: 10,
      duration: 2,
      tagline: 'Educational role-playing game that teachers and students play together in the classroom.'
    },
    {
      description: 'http://blonk.co/',
      name: 'Blonk',
      price: 10,
      duration: 2,
      tagline: 'Tinder for job hunting.'
    },
    {
      description: 'https://lookback.io/',
      name: 'LookBack',
      price: 10,
      duration: 2,
      tagline: 'Makes recording mobile user experiences and bugs a breeze.'
    },
    {
      description: 'https://www.cladwell.com/',
      name: 'Cladwell',
      price: 10,
      duration: 2,
      tagline: 'A personal roadmap to dress better. Cladwell makes clothing simple.'
    },
    {
      description: 'https://usercycle.com/',
      name: 'USERcycle',
      price: 10,
      duration: 2,
      tagline: 'Analytics That Grow Your Business'
    },
    {
      description: 'http://assistant.io/',
      name: 'Assistant.io',
      price: 10,
      duration: 2,
      tagline: 'Schedule group meetings painlessly'
    },
    {
      description: 'https://getliquid.io/',
      name: 'Liquid',
      price: 10,
      duration: 2,
      tagline: 'Easily Collect, Analyze & Share Data'
    },
    {
      description: 'http://beats.meteor.com/',
      name: 'Meteor Beats',
      price: 10,
      duration: 2,
      tagline: 'A collaborative and fully reactive drum machine.'
    },
    {
      description: 'https://mixmax.com/',
      price: 10,
      name: 'Mixmax',
      duration: 2,
      tagline: 'Mixmax gives your Gmail superpowers. Schedule meetings 10x faster.'
    }
  ];


  /**
   * seed users
   */
  if (Meteor.users.find({}).count() === 0) {
    _(users).each(function (user) {
      Meteor.users.insert(user);
    });
  }


  /**
   * seed categories
   */
  if(ProductCategories.find({}).count() === 0){
    _(productCategories).each(function(productCategory){
      ProductCategories.insert({
        imageName : productCategory.imageName,
        name: productCategory.name,
        description: productCategory.description
      });
      //console.log('Inserting...');
    });
  }

  /**
   * seed products
   */
  var author = Meteor.users.find().fetch()[0];
  var category = ProductCategories.find().fetch()[0];
  if (Products.find({}).count() === 0) {
    _(products).each(function (product) {
      Products.insert({
        userId: author._id,
        description: product.description,
        name: product.name,
        price: product.price,
        duration: product.duration,
        createdAt: new Date(),
        categoryId: category._id
      });
    });
  }



});
