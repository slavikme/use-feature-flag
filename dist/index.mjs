import { useEffect as i } from "react";
import { useLocalStorage as p } from "usehooks-ts";
function m(l, e = !1, n = {}) {
  const t = typeof e == "object", o = t ? !1 : e, a = t ? e : n, { prefix: r = "FF_", storeOnInit: c = !0 } = a, u = `${r}${l}`, [s, f] = p(
    u,
    null
  );
  return i(() => {
    c && s === null && f(o);
  }, []), [s ?? o, f];
}
export {
  m as useFeatureFlag
};
//# sourceMappingURL=index.mjs.map
