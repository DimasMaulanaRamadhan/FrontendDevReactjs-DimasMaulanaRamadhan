import { useEffect, useState } from "react";
import { Card, CardContent } from "./ui/card";
import { Star, StarHalf } from "lucide-react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";

const RestaurantCard = ({ filters }) => {
  const [resto, setResto] = useState([]);
  const [filteredResto, setFilteredResto] = useState([]);
  const [detailCategories, setDetailCategories] = useState({});

  const determinePrice = (rating) => {
    if (rating >= 4.5) return "Rp 200.000";
    if (rating >= 4.0) return "Rp 100.000";
    return "Rp 50.000";
  };

  const determineOpenStatus = (rating, city) => {
    const majorCities = ["Jakarta", "Bandung", "Surabaya", "Medan", "Makassar"];
    return rating >= 4.5 || majorCities.includes(city);
  };

  const fetchRestaurantDetail = async (id) => {
    try {
      const response = await fetch(
        `https://restaurant-api.dicoding.dev/detail/${id}`
      );
      const result = await response.json();
      return result.restaurant.categories;
    } catch (error) {
      console.log(error);
      return [];
    }
  };

  const fetchData = async () => {
    try {
      const response = await fetch("https://restaurant-api.dicoding.dev/list");
      const result = await response.json();

      const restaurantsWithExtra = result.restaurants.map((restaurant) => ({
        ...restaurant,
        price: determinePrice(restaurant.rating),
        isOpen: determineOpenStatus(restaurant.rating, restaurant.city),
      }));
      setResto(restaurantsWithExtra);

      // Fetch categories for each restaurant
      const categoriesPromises = restaurantsWithExtra.map(
        async (restaurant) => {
          const categories = await fetchRestaurantDetail(restaurant.id);
          return { [restaurant.id]: categories };
        }
      );

      const categoriesResults = await Promise.all(categoriesPromises);
      const categoriesMap = categoriesResults.reduce(
        (acc, curr) => ({ ...acc, ...curr }),
        {}
      );
      setDetailCategories(categoriesMap);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    const filtered = resto.filter((item) => {
      const itemCategories = detailCategories[item.id] || [];
      const matchesOpen = !filters.isOpen || item.isOpen === filters.isOpen;
      const matchesPrice = !filters.price || item.price === filters.price;
      const matchesCategory =
        !filters.category ||
        itemCategories.some((category) =>
          category.name.toLowerCase().includes(filters.category.toLowerCase())
        );
      return matchesOpen && matchesPrice && matchesCategory;
    });
    setFilteredResto(filtered);
  }, [filters, resto, detailCategories]);

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <Star
          key={`full-${i}`}
          className="w-5 h-5 fill-yellow-400 text-yellow-400"
        />
      );
    }

    if (hasHalfStar) {
      stars.push(
        <StarHalf
          key="half"
          className="w-5 h-5 fill-yellow-400 text-yellow-400"
        />
      );
    }

    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <Star key={`empty-${i}`} className="w-5 h-5 text-yellow-400" />
      );
    }

    return stars;
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
      {filteredResto.map((item, index) => (
        <Card key={index}>
          <div className="relative p-5">
            <img
              src={`https://restaurant-api.dicoding.dev/images/medium/${item.pictureId}`}
              alt={item.name}
              className="w-full h-48 object-cover rounded-lg"
            />
            <div
              className="absolute top-8 right-8 px-3 py-1 rounded-full text-sm font-medium tracking-wide text-white"
              style={{ backgroundColor: item.isOpen ? "#22c55e" : "#ef4444 " }}>
              {item.isOpen ? "Buka" : "Tutup"}
            </div>
          </div>
          <CardContent>
            <h3 className="font-bold text-lg mb-2 text-left">{item.name}</h3>
            <div className="flex items-center gap-1 mb-2">
              {renderStars(item.rating)}
              <span className="ml-2 text-sm text-gray-600">
                ({item.rating})
              </span>
            </div>
            <p className="text-left text-sm font-medium text-gray-800 mt-2">
              {item.price}
            </p>
            <div className="flex flex-wrap gap-2 mb-2">
              {detailCategories[item.id]?.map((category, idx) => (
                <Badge key={idx} variant="secondary">
                  {category.name}
                </Badge>
              ))}
            </div>
            <a href={`/${item.id}`}>
              <Button className="mt-4 w-full">Lihat Detail</Button>
            </a>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default RestaurantCard;
