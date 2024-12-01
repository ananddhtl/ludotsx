import { ReactNode, DetailedHTMLProps, HTMLAttributes } from 'react';

interface CardProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  children: ReactNode;
  additionalClassnames?: string;
}

const Card: React.FC<CardProps> = ({
  children,
  additionalClassnames,
  ...rest
}) => {
  return (
    <div
      className={`bg-white p-4 rounded-md shadow-lg ${additionalClassnames}`}
      {...rest}
    >
      {children}
    </div>
  );
};

export default Card;
