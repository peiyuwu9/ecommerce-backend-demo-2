export interface HeadingProps {
  title: string;
  children?: React.ReactNode;
}

const Heading: React.FC<HeadingProps> = ({ title, children }) => {
  return (
    <div className="mb-2 flex items-center justify-between h-9">
      <h1 className="text-2xl">{title}</h1>
      {children}
    </div>
  );
};

export { Heading };
