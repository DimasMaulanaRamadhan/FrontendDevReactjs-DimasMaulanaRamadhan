import { Separator } from "./ui/separator";

/**
 * Header component that displays the restaurant page title and description
 * @returns {JSX.Element} Header component
 */
function Header() {
  return (
    <div>
      <h1 className="mb-10 text-left text-4xl font-bold">Restaurants</h1>
      <p className="text-left mb-10 text-xl">
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quis saepe ad
        provident officiis in cupiditate unde labore veritatis placeat illo?
      </p>
      <Separator />
    </div>
  );
}

export default Header;
