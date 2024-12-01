import { ReactNode } from 'react';

interface ContainerProps {
  children: ReactNode;
  additionalClassnames?: string;
}

const Container: React.FC<ContainerProps> = ({
  children,
  additionalClassnames,
}) => {
  return (
    <div className={`max-w-[1300px] mx-auto ${additionalClassnames}`}>
      {children}
    </div>
  );
};

export default Container;
