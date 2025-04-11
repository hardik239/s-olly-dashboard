import { Input } from "../components/ui/input";

export function Search() {
  return (
    <div>
      <Input
        type="search"
        placeholder="Search..."
        className="bg-white border"
      />
    </div>
  );
}
