import { useNode } from "@craftjs/core";

type ContainerProps = {
    background: string;
    padding?: number;
    children: React.ReactNode;
};

export const Container = ({ background, children }: ContainerProps) => {
  const { connectors: {connect, drag} } = useNode();

    return (
      <div
        ref={ref=> connect(drag(ref))}
        className={`p-4 w-full`} 
        style={{ background }} 
      >
        {children}
      </div>
    );
  };