import { Request, Response } from 'express';
import { createRestaurant,getClosestRestaurants } from '../db/getClosestRestaurants';

async function createRestaurantController(req: Request, res: Response): Promise<void> {
  const { name, latitude, longitude } = req.body;

  try {
    const restaurant = await createRestaurant(name, latitude, longitude);
    res.status(201).json({ message: 'Restoran başarıyla oluşturuldu', data: restaurant });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Restoran oluşturulurken bir hata oluştu' });
  }
};
async function getClosestRestaurantsController(req: Request, res: Response): Promise<void> {
    const { latitude, longitude } = req.body;

  try {
    const lat = parseFloat(latitude as string);
    const long = parseFloat(longitude as string);
    console.log("Latitude: ")
    console.log(lat);
    console.log("Longitude: ")
    console.log(long);
    
    if (isNaN(lat) || isNaN(long)) {
      throw new Error('Geçersiz latitude veya longitude değeri');
    }

    const closestRestaurants = await getClosestRestaurants(lat, long);
    res.json(closestRestaurants);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Restoranlar getirilirken bir hata oluştu' });
  }
  }

export { createRestaurantController,getClosestRestaurantsController };
