import React from "react";

interface Props {
  condition?: boolean;
  children?: React.ReactNode;
}

export default function ConditionalRender({ condition, children }: Props) {
  let nodes = React.Children.toArray(children);

  if (condition) {
    return <>{nodes[0]}</>;
  } else {
    return <>{nodes[1]}</>;
  }
}

function When({ children }: Props) {
  return <>{children}</>;
}

function ElseIf({ children, condition }: Props) {
  let nodes = React.Children.toArray(children);

  if (condition) {
    return <>{nodes[0]}</>;
  } else {
    return <>{nodes[1]}</>;
  }
}

function Otherwise({ children }: Props) {
  return <>{children}</>;
}

ConditionalRender.When = When;
ConditionalRender.ElseIf = ElseIf;
ConditionalRender.Otherwise = Otherwise;
