type ContainerProps = {
    background: string;
    padding?: number;
    children: React.ReactNode;
  };

export const Container = ({ background, children }: ContainerProps) => {
    return (
      <div 
        className={`p-4 w-full`} 
        style={{ background }} 
      >
        {children}
      </div>
    );
  };