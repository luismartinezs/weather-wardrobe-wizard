import { useEffect, useMemo, useState } from "react";
import { v4 as uuidv4 } from "uuid";

function log(value: unknown) {
  console.log(value);
}

function useId(): string {
  const [id, setId] = useState<string>("");

  useEffect(() => {
    setId(uuidv4());
  }, []);

  return id;
}
function useWatch(value: unknown, callback = log) {
  return useMemo(() => {
    callback(value);
  }, [value, callback]);
}

export { useId, useWatch, log };
