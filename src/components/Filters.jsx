import { Checkbox } from "./ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

export default function Filters({ filters, setFilters }) {
  const searchCategory = (value) => {
    setFilters({ ...filters, category: value });
  };

  return (
    <div className="flex items-center gap-6 p-4 border-b mb-5">
      <span className="text-sm text-muted-foreground">Filter By:</span>
      <label className="flex items-center gap-2 text-sm">
        <Checkbox
          id="open-now"
          checked={filters.isOpen}
          onCheckedChange={(checked) =>
            setFilters({ ...filters, isOpen: checked })
          }
        />
        <span>Open Now</span>
      </label>
      <Select
        onValueChange={(value) => {
          if (value !== "placeholder") {
            setFilters({ ...filters, price: value });
          }
        }}>
        <SelectTrigger className="w-[140px]">
          <SelectValue placeholder="Price" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="Rp 50.000">Rp 50.000</SelectItem>
          <SelectItem value="Rp 100.000">Rp 100.000</SelectItem>
          <SelectItem value="Rp 200.000">Rp 200.000</SelectItem>
        </SelectContent>
      </Select>
      {/* Input Search Category */}
      <input
        type="text"
        placeholder="Search Category"
        className="border border-gray-300 rounded-md px-2 py-1"
        onChange={(e) => searchCategory(e.target.value)}
      />
    </div>
  );
}
