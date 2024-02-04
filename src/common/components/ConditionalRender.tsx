import React from "react";

interface ConditionalRender {
  condition?: boolean;
  children?: React.ReactNode;
}

export default function ConditionalRender({ condition, children }: ConditionalRender) {
  let nodes = React.Children.toArray(children);

  if (condition) {
    return <>{nodes[0]}</>;
  } else {
    return <>{nodes[1]}</>;
  }
}

function When({ children }: ConditionalRender) {
  return <>{children}</>;
}

function ElseIf({ children, condition }: ConditionalRender) {
  let nodes = React.Children.toArray(children);

  if (condition) {
    return <>{nodes[0]}</>;
  } else {
    return <>{nodes[1]}</>;
  }
}

function Otherwise({ children }: ConditionalRender) {
  return <>{children}</>;
}

ConditionalRender.When = When;
ConditionalRender.ElseIf = ElseIf;
ConditionalRender.Otherwise = Otherwise;
