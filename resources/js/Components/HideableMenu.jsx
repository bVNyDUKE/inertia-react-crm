import { useState } from "react";

export default function HideableMenu({ hiddenElement, shownElement }) {
  const [hidden, setHidden] = useState(true);

  return (
    <div onClick={() => setHidden(!hidden)}>
      {hidden && shownElement}
      {!hidden && hiddenElement}
    </div>
  );
}
