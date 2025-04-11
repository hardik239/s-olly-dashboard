import { ReactNode } from "react";
import { cn } from "../../lib/utils";

type Props = {
  href: string;
  target?: string;
  className?: string;
  children?: ReactNode | undefined;
};

const Link: React.FC<Props> = ({
  href,
  className,
  target = "_blank",
  children,
}) => {
  return (
    <a
      href={href}
      target={target}
      className={cn(
        "hover:underline underline-offset-2 text-blue-700",
        className
      )}
    >
      {children}
    </a>
  );
};

export default Link;
