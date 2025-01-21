import * as React from "react";
import { cn } from "./lib/utils";

const Card = React.forwardRef((props, ref) => {
  const { className, ...rest } = props;
  return (
    <div ref={ref} className={cn(className)} {...rest}>
      {/* Card content goes here */}
    </div>
  );
});
Card.displayName = "Card";

const CardHeader = React.forwardRef((props, ref) => {
  const { className, ...rest } = props;
  return (
    <div ref={ref} className={cn(className)} {...rest}>
      {/* Card header content goes here */}
    </div>
  );
});
CardHeader.displayName = "CardHeader";

const CardTitle = React.forwardRef((props, ref) => {
  const { className, ...rest } = props;
  return (
    <h2 ref={ref} className={cn(className)} {...rest}>
      {/* Card title content goes here */}
    </h2>
  );
});
CardTitle.displayName = "CardTitle";

const CardDescription = React.forwardRef((props, ref) => {
  const { className, ...rest } = props;
  return (
    <p ref={ref} className={cn(className)} {...rest}>
      {/* Card description content goes here */}
    </p>
  );
});
CardDescription.displayName = "CardDescription";

const CardContent = React.forwardRef((props, ref) => {
  const { className, ...rest } = props;
  return (
    <div ref={ref} className={cn(className)} {...rest}>
      {/* Card content goes here */}
    </div>
  );
});
CardContent.displayName = "CardContent";

const CardFooter = React.forwardRef((props, ref) => {
  const { className, ...rest } = props;
  return (
    <div ref={ref} className={cn(className)} {...rest}>
      {/* Card footer content goes here */}
    </div>
  );
});
CardFooter.displayName = "CardFooter";

export {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardDescription,
  CardContent,
};
