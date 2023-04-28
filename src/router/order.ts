import express from "express";
import {createRestaurantController,getClosestRestaurantsController} from "../controllers/restourant";

export default (router: express.Router) => {
    router.post('/restourant/new',createRestaurantController);
    router.get('/restourant/nearest',getClosestRestaurantsController);
    
};