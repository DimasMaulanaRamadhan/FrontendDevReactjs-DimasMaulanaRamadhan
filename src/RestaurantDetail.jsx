import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function RestaurantDetail() {
  const { id } = useParams();
  const [restaurant, setRestaurant] = useState(null);

  useEffect(() => {
    const fetchRestaurant = async () => {
      try {
        const response = await fetch(
          `https://restaurant-api.dicoding.dev/detail/${id}`
        );
        const data = await response.json();
        if (!data.error) {
          setRestaurant(data.restaurant);
        }
      } catch (error) {
        console.error("Failed to fetch restaurant:", error);
      }
    };

    fetchRestaurant();
  }, [id]);

  if (!restaurant) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-5">
      <h1 className="text-3xl font-bold mb-4">{restaurant.name}</h1>
      <img
        src={`https://restaurant-api.dicoding.dev/images/medium/${restaurant.pictureId}`}
        alt={restaurant.name}
        className="w-full h-64 object-cover mb-5"
      />
      <p className="mb-3">{restaurant.description}</p>
      <p className="font-semibold">
        Address: {restaurant.address}, {restaurant.city}
      </p>
      <p className="font-semibold">Rating: {restaurant.rating}</p>

      <div className="mt-6">
        <h2 className="text-2xl font-bold">Categories</h2>
        <ul className="list-disc list-inside">
          {restaurant.categories.map((category, index) => (
            <li key={index}>{category.name}</li>
          ))}
        </ul>
      </div>

      <div className="mt-6">
        <h2 className="text-2xl font-bold">Menus</h2>
        <h3 className="text-xl font-semibold mt-3">Foods</h3>
        <ul className="list-disc list-inside">
          {restaurant.menus.foods.map((food, index) => (
            <li key={index}>{food.name}</li>
          ))}
        </ul>
        <h3 className="text-xl font-semibold mt-3">Drinks</h3>
        <ul className="list-disc list-inside">
          {restaurant.menus.drinks.map((drink, index) => (
            <li key={index}>{drink.name}</li>
          ))}
        </ul>
      </div>

      <div className="mt-6">
        <h2 className="text-2xl font-bold">Customer Reviews</h2>
        {restaurant.customerReviews.map((review, index) => (
          <div key={index} className="border-b py-3">
            <p className="font-semibold">{review.name}</p>
            <p className="text-sm">{review.date}</p>
            <p>{review.review}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
