Router.route('/', {
  name: 'explore',
  template: 'explore',
  controller: 'ExploreController'
});

Router.route('/category/:_id', {
  name: 'category',
  template: 'categoryPage',
  controller: 'CategoryController'
});

Router.route('/favorites', {
  name: 'favorites',
  template: 'favorites',
  controller: 'FavoritesController'
});

Router.route('/messages', {
  name: 'notifications',
  template: 'chatList',
  controller: 'NotificationsController'
});

Router.route('/bookings', {
  name: 'bookings',
  template: 'bookings',
  controller: 'BookingsController'
});

Router.route('booking/:_id',{
  name: 'bookingDetail',
  template: 'bookingDetail',
  controller: 'BookingDetailController'
});

Router.route('/products/:_id', {
  name: 'productDetail',
  template: 'productsShow',
  controller: 'ProductsShowController'
});

Router.route('/users/:_id', {
  name: 'users.show'
});

Router.route('/profile', {
  name: 'profile'
});

Router.route('/newproduct', {
  name: 'productCreation',
  template: 'productCreation',
  controller: 'ProductCreationController'
});

Router.route('/message/:_id', {
  name: 'chat',
  template: 'chat',
  controller: 'ChatController'
});