import mongoose from 'mongoose';

// Restoran şeması
const RestaurantSchema = new mongoose.Schema({
  name: { type: String, required: true },
  location: {
    type: {
      type: String,
      enum: ['Point'],
      required: true,
    },
    coordinates: {
      type: [Number],
      required: true,
    },
  },
});

// Location alanı için 2dsphere indexi oluştur
RestaurantSchema.index({ location: '2dsphere' });

// Restoran modeli
const Restaurant = mongoose.model('Restaurant', RestaurantSchema);

// En yakın restoranları getiren fonksiyon
async function getClosestRestaurants(latitude: number, longitude: number): Promise<any[]> {
  try {
    const restaurants = await Restaurant.find({
      // En fazla 10km mesafede olan restoranları getir
      location: {
        $near: {
          $geometry: {
            type: 'Point',
            coordinates: [longitude, latitude],
          },
          $maxDistance: 10000 ,
        },
      },
    })
      .limit(5) // En yakın 5 restoran
      .exec();

    return restaurants;
  } catch (error) {
    console.error(error);
    throw new Error('Bir şeyler yanlış gitti!');
  }
}



async function createRestaurant(name: string, latitude: number, longitude: number): Promise<any> {
    try {
      const restaurant = new Restaurant({
        name: name,
        location: {
          type: 'Point',
          coordinates: [longitude, latitude],
        },
      });
  
      await restaurant.save();
  
      return restaurant;
    } catch (error) {
      console.error(error);
      throw new Error('Bir şeyler yanlış gitti!');
    }
  }
  
  export { Restaurant, createRestaurant,getClosestRestaurants };
