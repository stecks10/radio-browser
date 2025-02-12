import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <h1 className="text-ellipsis bg-white">
      Home
      <Button variant="link" size="sm">
        Click me
      </Button>
    </h1>
  );
}
