import { Button } from "@/components/user/Button";

export const Toolbox: React.FC = () => {
  return (
    <div className="px-2 py-2 border-2"> 
      <div className="flex flex-col items-center justify-center space-y-2"> 
        <h3>Drag to add</h3>
        <div className="flex flex-col space-y-2">
          <Button>Button</Button>
          <Button>Text</Button>
          <Button>Container</Button>
          <Button>Card</Button>
        </div>
      </div>
    </div>
  );
};